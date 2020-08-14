const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  // doctor
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  url: { type: String, required: false },
});

module.exports = User = mongoose.model("user", userSchema);
