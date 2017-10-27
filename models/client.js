const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  clientName: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  location: {
    type: mongoose.Schema.Types.String,
    required: false
  },
  phone: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  photo: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: false
  },
  login: {
    type: mongoose.Schema.Types.String,
    required: false
  },
  payment: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  rating: {
    type: mongoose.Schema.Types.Number,
    required: false
  },
  active: {
    type: mongoose.Schema.Types.String,
    required: true
  }
});

module.exports = mongoose.model("Client", clientSchema);
