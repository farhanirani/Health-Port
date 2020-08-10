const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  // optional for doctors
  email: { type: String, required: false, unique: true },
  phoneNumber: { type: String, required: false, unique: true },
});

module.exports = User = mongoose.model("user", userSchema);
