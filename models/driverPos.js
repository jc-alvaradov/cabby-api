const mongoose = require("mongoose");

const driverPosSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  socketId: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  coordinate: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

driverPosSchema.index({ coordinate: "2dsphere" });

module.exports = mongoose.model("DriverPos", driverPosSchema);
