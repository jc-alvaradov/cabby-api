const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("Admin", adminSchema);
