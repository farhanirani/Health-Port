let mongoose = require("mongoose");

let postSchema = mongoose.Schema({
  senderId: { type: String, required: true },
  recieverId: { type: String, required: true },
  body: { type: String, required: true },
});

module.exports = Message = mongoose.model("message", postSchema);
