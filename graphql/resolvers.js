const mongoose = require("mongoose");
mongoose.Promise = Promise;
const clientModel = require("../models/client");
const driverModel = require("../models/driver");
const driverPosModel = require("../models/driverPos");
const rideModel = require("../models/ride");
const ratingModel = require("../models/rating");

const resolvers = {
  Query: {
    userExists: (obj, args) => {
      return clientModel.findOne({ login: args.login }, (error, client) => {
        if (error) {
          console.log("Error: " + error);
        }
        return client != null ? true : false;
      });
    },
    getDriver: (obj, args) => {
      return driverModel.find(
        { driverName: new RegExp(args.driverName, "i") },
        "_id driverName phone email earnings payment location rating photo carPlate carModel carColor carPhoto active",
        (err, driver) => {
          if (err) {
            console.log("Error: " + err);
          }
          return driver;
        }
      );
    },
    getDriverById: (obj, args) => {
      return driverModel.findOne(
        { _id: args.id },
        "_id driverName phone email earnings payment rating photo carPlate carModel carColor carPhoto active",
        (err, driver) => {
          if (err) {
            console.log("Error: " + err);
          }
          return driver;
        }
      );
    },
    getDriverPos: (obj, args) => {
      return driverPosModel.findOne(
        { driverId: args.id },
        "driverId socketId coordinate",
        (err, driver) => {
          if (err) {
            console.log("Error: " + err);
          }
          return driver;
        }
      );
    },
    getDrivers: (obj, args) => {
      if (args.state === "all") {
        return driverModel.find(
          {},
          "_id driverName phone email earnings payment location rating photo carPlate carModel carColor active",
          (err, drivers) => {
            if (err) {
              console.log("Error: " + err);
            }
            return driver;
          }
        );
      } else {
        return driverModel.find(
          { active: args.state },
          "_id driverName phone email earnings payment location rating photo carPlate carModel carColor active",
          (err, drivers) => {
            if (err) {
              console.log("Error: " + err);
            }
            return drivers;
          }
        );
      }
    },
    getClosestDrivers: (obj, args) => {
      return driverPosModel.find(
        {
          coordinate: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [
                  parseFloat(args.clientPos.longitude),
                  parseFloat(args.clientPos.latitude)
                ]
              },
              $maxDistance: 10000
            }
          }
        },
        (err, location) => {
          if (err) {
            console.log("Hubo un error: " + err);
          } else {
            return location;
          }
        }
      );
    },
    getClientRides: (obj, args) => {
      return rideModel.find(
        { login: args.login },
        "_id amount driverName clientName startLocation destination rideState cancelReason rating",
        (err, rides) => {
          if (err) {
            console.log("Error: " + err);
          }
          return rides;
        }
      );
    },
    getRide: (obj, args) => {
      return rideModel.find(
        {
          $or: [
            { driverName: new RegExp(args.name, "i") },
            { clientName: new RegExp(args.name, "i") }
          ]
        },
        "_id amount driverName clientName startLocation destination rideState cancelReason rating",
        (err, ride) => {
          if (err) {
            console.log("Error: " + err);
          }
          return ride;
        }
      );
    },
    getRides: (obj, args) => {
      if (args.state === "all") {
        return rideModel.find(
          {},
          "_id amount driverName clientName startLocation destination rideState cancelReason rating",
          (err, rides) => {
            if (err) {
              console.log("Error: " + err);
            }
            return rides;
          }
        );
      } else {
        return rideModel.find(
          { rideState: args.state },
          "_id amount driverName clientName startLocation destination rideState cancelReason rating",
          (err, rides) => {
            if (err) {
              console.log("Error: " + err);
            }
            return rides;
          }
        );
      }
    },
    getClient: (obj, args) => {
      return clientModel.find(
        { login: args.login },
        "_id login clientName active phone photo email rating payment",
        (err, client) => {
          if (err) {
            console.log("Error: " + err);
          }
          return client;
        }
      );
    },
    getClients: (obj, args) => {
      if (args.state === "all") {
        return clientModel.find(
          {},
          "_id clientName active phone email rating payment",
          (err, clients) => {
            if (err) {
              console.log("Error: " + err);
            }
            return clients;
          }
        );
      } else {
        return clientModel.find(
          { active: args.state },
          "_id clientName active phone email rating payment",
          (err, clients) => {
            if (err) {
              console.log("Error: " + err);
            }
            return clients;
          }
        );
      }
    },
    getRating: (obj, args) => {
      return ratingModel.find(
        {
          $or: [
            { from: new RegExp(args.name, "i") },
            { to: new RegExp(args.name, "i") }
          ]
        },
        "_id rating from to message date",
        (err, rating) => {
          if (err) {
            console.log("Error: " + err);
          }
          return rating;
        }
      );
    },
    getRatings: (obj, args) => {
      if (args.filter == "all") {
        return ratingModel.find(
          {},
          "_id rating from to message date",
          (err, ratings) => {
            if (err) {
              console.log("Error: " + err);
            }
            return ratings;
          }
        );
      } else if (args.filter == "most recent") {
        // ordenar por fecha de mas reciente
        return ratingModel
          .find({}, "_id rating from to message date")
          .sort({ date: -1 })
          .exec((err, ratings) => {
            if (err) {
              console.log("Error: " + err);
            }
            return ratings;
          });
      } else if (args.filter == "highest") {
        // filtrar por mayor rating
        return ratingModel
          .find({}, "_id rating from to message date")
          .sort({ rating: -1 })
          .exec((err, ratings) => {
            if (err) {
              console.log("Error: " + err);
            }
            return ratings;
          });
      } else if (args.filter == "lowest") {
        // filtrar por rating menor
        return ratingModel
          .find({}, "_id rating from to message date")
          .sort({ rating: 1 })
          .exec((err, ratings) => {
            if (err) {
              console.log("Error: " + err);
            }
            return ratings;
          });
      }
    }
  },
  Mutation: {
    addClient: async (obj, args) => {
      const newClientModel = new clientModel(args.client);
      const newClient = await newClientModel.save();
      return newClient;
    },
    editClient: async (obj, args) => {
      const client = await clientModel.update(
        { _id: args.client.id },
        { $set: args.client },
        (err, res) => {
          if (err) {
            console.log("Error: " + err);
          }
          return true;
        }
      );
      return client ? true : false;
    },
    deleteClient: (obj, args) => {
      return clientModel.findOneAndRemove({ _id: args.id }, (err, res) => {
        if (err) {
          console.log("Error: " + err);
        }
        return true;
      });
    },
    addDriver: async (obj, args) => {
      const newDriverModel = new driverModel(args.driver);
      const newDriver = await newDriverModel.save();
      return newDriver ? true : false;
    },
    addActiveDriver: async (obj, args) => {
      const newDriverModel = new driverPosModel(args.driverPos);
      const newDriverPos = await newDriverModel.save();
      return newDriverPos ? true : false;
    },
    editDriver: async (obj, args) => {
      const driver = await driverModel.update(
        { _id: args.driver.id },
        { $set: args.driver },
        (err, res) => {
          if (err) {
            console.log("Error: " + err);
          }
          return true;
        }
      );
      return driver ? true : false;
    },
    editRating: async (obj, args) => {
      const rating = await ratingModel.update(
        { _id: args.rating._id },
        { $set: args.rating },
        (err, res) => {
          if (err) {
            console.log("Error: " + err);
          }
          return true;
        }
      );
      return rating ? true : false;
    },
    deleteDriver: (obj, args) => {
      return driverModel.findOneAndRemove({ _id: args.id }, (err, res) => {
        if (err) {
          console.log("Error: " + err);
        }
        return true;
      });
    },
    deleteActiveDriver: (obj, args) => {
      return driverPosModel.findOneAndRemove(
        { socketId: args.socketId },
        (err, res) => {
          if (err) {
            console.log("Error: " + err);
          }
          return true;
        }
      );
    },
    addRide: async (obj, args) => {
      const newRideModel = new rideModel(args.ride);
      const newRide = await newRideModel.save();
      return newRide ? true : false;
    },
    editRide: async (obj, args) => {
      const ride = await rideModel.update(
        { _id: args.ride.id },
        { $set: args.ride },
        (err, res) => {
          if (err) {
            console.log("Error: " + err);
          }
          return true;
        }
      );
      return newRide ? true : false;
    },
    deleteRide: (obj, args) => {
      return rideModel.findOneAndRemove({ _id: args.id }, (err, res) => {
        if (err) {
          console.log("Error: " + err);
        }
        return true;
      });
    },
    addRating: async (obj, args) => {
      const newRatingModel = new ratingModel(args.rating);
      const newRating = await newRatingModel.save();
      return newRating ? true : false;
    },
    deleteRating: (obj, args) => {
      return ratingModel.findOneAndRemove({ _id: args.id }, (err, res) => {
        if (err) {
          console.log("Error: " + err);
        }
        return true;
      });
    }
  }
};

module.exports = resolvers;
