let mongoose = require("mongoose");

//post schema
let postSchema = mongoose.Schema({
  whichForum: {
    type: String, //forum id
    required: true,
  },
  author: {
    type: String, // users id
    required: true,
  },
  title: { type: String, required: true },
  body: { type: String, required: true },
  upvotes: { type: Number, required: true },
  downvotes: { type: Number, required: true },
});

module.exports = Post = mongoose.model("post", postSchema);
