const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.String
  },
  clientId: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  driverName: {
    type: mongoose.Schema.Types.String,
    trim: true
  },
  clientName: {
    type: mongoose.Schema.Types.String,
    trim: true,
    required: true
  },
  startLocation: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  destination: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  rideState: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  cancelReason: {
    type: mongoose.Schema.Types.String,
    required: false
  },
  amount: {
    type: mongoose.Schema.Types.String,
    required: true
  }
});

module.exports = mongoose.model("Ride", rideSchema);
