const mongoose = require("mongoose");
mongoose.Promise = Promise;
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const adminModel = require("./models/admin");
const { facebook, google } = require("./config");

const transformFacebookProfile = profile => {
  if (profile.emails !== undefined) {
    return {
      id: profile.id,
      name: profile.name,
      email: profile.emails[0].value,
      avatar: profile.picture.data.url
    };
  } else {
    return {
      id: profile.id,
      name: profile.name,
      email: "",
      avatar: profile.picture.data.url
    };
  }
};

const transformGoogleProfile = profile => {
  if (profile.emails !== undefined) {
    return {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.image.url
    };
  } else {
    return {
      id: profile.id,
      name: profile.displayName,
      email: "",
      avatar: profile.image.url
    };
  }
};

// Register Facebook Passport strategy
passport.use(
  new FacebookStrategy(
    facebook,
    // Gets called when user authorizes access to their profile
    async (accessToken, refreshToken, profile, done) =>
      // Return done callback and pass transformed user object
      done(null, transformFacebookProfile(profile._json))
  )
);

// Register Google Passport strategy
passport.use(
  new GoogleStrategy(google, async (accessToken, refreshToken, profile, done) =>
    done(null, transformGoogleProfile(profile._json))
  )
);

passport.use(
  "local",
  new LocalStrategy(function(username, password, done) {
    adminModel
      .findOne(
        { username: username },
        "-_id username password",
        (err, user) => {
          if (err) {
            console.log("Error: " + err);
          }
          return user;
        }
      )
      .then(user => {
        if (user) {
          bcrypt.compare(password, user.password, function(err, res) {
            if (res == true) {
              //passwords matched
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect password." });
            }
          });
        } else {
          return done(null, false, { message: "Incorrect username." });
        }
      })
      .catch(err => {
        return done(err);
      });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  adminModel
    .findOne({ username: username }, "-_id username password", (err, user) => {
      if (err) {
        console.log("Error: " + err);
      }
      return done(null, user);
    })
    .catch(err => {
      return err;
    });
});
