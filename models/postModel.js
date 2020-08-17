let mongoose = require("mongoose");

//post schema
let postSchema = mongoose.Schema({
  whichForum: {
    type: String, //forum id
    required: true,
  },
  forumName: { type: String, required: true },
  author: {
    type: String, // users id
    required: true,
  },
  authorName: { type: String, required: true },
  authorrole: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  upvotes: { type: Array, required: true },
  downvotes: { type: Array, required: true },
});

module.exports = Post = mongoose.model("post", postSchema);
