const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  driverName: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  location: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  earnings: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  phone: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  login: {
    type: mongoose.Schema.Types.String,
    required: false,
    unique: true
  },
  payment: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  rating: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  photo: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  active: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  carColor: {
    type: mongoose.Schema.Types.String,
    required: false
  },
  carPlate: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  carSeatCount: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  carModel: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  carPhoto: {
    type: mongoose.Schema.Types.String,
    required: true
  }
});

module.exports = mongoose.model("Driver", driverSchema);
