const mongoose = require("mongoose");

const employeerSchema = new mongoose.Schema({
  employeerName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  accountNumber: {
    type: String,
    require: true,
  },
  balance: {
    type: Number,
    default: 100000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employeer", employeerSchema);
