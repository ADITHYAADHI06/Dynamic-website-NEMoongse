const mongoose = require("mongoose");
const validator = require("validator");

const usermsgschema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    minLength: 3,
  },
  email: {
    required: true,
    type: String,
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid email");
      }
    },
  },
  phone: {
    required: true,
    type: Number,
    min: 10,
  },
  message: {
    required: true,
    type: String,
    min: 3,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// we new to create collection

const User = mongoose.model("User", usermsgschema);

module.exports = User;
