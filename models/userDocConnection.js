let mongoose = require("mongoose");

let postSchema = mongoose.Schema({
  user: { type: String, required: true },
  doc: { type: String, required: true },
  userName: { type: String, required: true },
});

module.exports = UserDoc = mongoose.model("UserDoc", postSchema);
