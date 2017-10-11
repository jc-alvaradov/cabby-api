require("dotenv").config();
require("./auth");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const uuid = require("node-uuid");
const graphqlHTTP = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");
const typeDefs = require("./graphql/types");
const resolvers = require("./graphql/resolvers");
const mongoose = require("mongoose");
const morgan = require("morgan"); // muestra request
const driverPosModel = require("./models/driverPos");
mongoose.Promise = Promise;

let port = 3000;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use(cors({ credentials: true, origin: true }));
//app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    genid: function(req) {
      return uuid.v4();
    },
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365
    },
    resave: true,
    saveUninitialized: true,
    secret: "Z3]GJW!?9uP”/Kpe"
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    pretty: true
  })
);

// Set up Facebook auth routes
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    session: false
  }),
  // Redirect user back to the mobile app using Linking with a custom protocol OAuthLogin
  (req, res) =>
    res.redirect("OAuthLogin://login?user=" + JSON.stringify(req.user))
);

// Set up Google auth routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false
  }),
  (req, res) =>
    res.redirect("OAuthLogin://login?user=" + JSON.stringify(req.user))
);

function authenticateUser(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send("LOGIN-ERROR");
    res.end();
  }
}

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/login/success",
    failureRedirect: "/login/error",
    failureFlash: true
  })
);

app.get("/login", authenticateUser, function(req, res) {
  res.send("LOGIN-SUCCESS");
  res.end();
});

app.get("/logout", function(req, res) {
  req.session.destroy();
  res.end();
});

app.get("/login/success", function(req, res) {
  res.send("LOGIN-SUCCESS");
  res.end();
});

app.get("/login/error", function(req, res) {
  res.send("LOGIN-ERROR");
  res.end();
});

io.on("connection", function(socket) {
  console.log("Socket connected: " + socket.id);
  socket.on("disconnect", function() {
    // recibir todos los driverPos, revisar si su id es igual a alguna
    console.log("Se desconecto: " + socket.id);
    const deleted = driverPosModel.findOneAndRemove(
      { socketId: socket.id },
      (err, res) => {
        if (err) {
          console.log("Error: " + err);
        }
        return true;
      }
    );
    if (deleted) {
      console.log("Socket eliminado correctamente");
    }
  });

  socket.on("UPDATE_DRIVER_POS", function(driver) {
    const response = driverPosModel.update(
      { socketId: driver.socketId },
      { $set: { coordinate: driver.coordinate } },
      (err, res) => {
        if (err) {
          console.log("Error: " + err);
        }
        return true;
      }
    );
  });

  socket.on("SEARCH_DRIVER", client => {
    /**
     * primero buscamos los conductores mas cercanos a la pos de inicio del viaje
     */
    const drivers = driverPosModel.find(
      {
        coordinate: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [
                parseFloat(client.rideStart.coords.longitude),
                parseFloat(client.rideStart.coords.latitude)
              ]
            },
            // distancia maxima: 50 km
            $maxDistance: 50000
          }
        }
      },
      (err, closeDrivers) => {
        if (err) {
          console.log("Hubo un error buscando conductores cercanos: " + err);
        } else {
          // ahora recorremos el array de conductores cercanos buscando uno que quiera viajar
          let driverFound = false;
          closeDrivers.some(driver => {
            // cons array.some, cuando se retorne true se deja de ejecutar el ciclo
            // le hacemos una peticion de aceptar el viaje uno a uno de los conductores
            io.sockets.connected[
              driver.socketId
            ].emit("DRIVER_RIDE_PROPOSAL", client, response => {
              if (response === true) {
                // el conductor acepto el viaje, le mandamos sus datos al cliente
                console.log("Conductor encontrado");
                io.sockets.connected[socket.id].emit(
                  "DRIVER_FOUND",
                  driver.driverId
                );
                driverFound = true;
                return true;
              }
            });
            return driverFound;
          });
          // si llegamos hasta aca sin encontrar un conductor entonces le mandamos un mensaje de error al cliente
          if (!driverFound) {
            io.sockets.connected[socket.id].emit("DRIVER_NOT_FOUND");
          }
        }
      }
    );
  });
});

mongoose.connect(process.env.BD, { useMongoClient: true }, () => {
  console.log("Conectado a la base de datos!");
});

http.listen(port, () => {
  console.log("Conectado exitosamente al servidor");
});
