const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true }, 
  phone: { type: String, unique: true, sparse: true },
  password: {
    type: String,
    required: function () {
      return !this.googleID; // Password is required unless GoogleID exists
    },
  },
  googleID: { type: String, unique: true, sparse: true }, 
  address: {
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zip: { type: String, default: "" },
    country: { type: String, default: "" },
  },
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
