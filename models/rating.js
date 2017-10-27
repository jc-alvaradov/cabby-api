const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  fromId: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  toId: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  from: {
    type: mongoose.Schema.Types.String,
    required: false
  },
  to: {
    type: mongoose.Schema.Types.String,
    required: false
  },
  message: {
    type: mongoose.Schema.Types.String,
    trim: true,
    required: true
  },
  rating: {
    type: mongoose.Schema.Types.String,
    trim: true,
    required: true
  },
  date: {
    type: mongoose.Schema.Types.Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Rating", ratingSchema);
