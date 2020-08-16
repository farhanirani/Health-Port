let mongoose = require("mongoose");

let forumSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  numberOfPosts: { type: Number, require: true },
  url: { type: String, required: true },
});

module.exports = Forum = mongoose.model("forum", forumSchema);
