let mongoose = require("mongoose");

let commentSchema = mongoose.Schema({
  commentpostID: {
    // will be the post id
    type: String,
    required: true,
  },
  body: { type: String, required: true },
  author: { type: String, required: true },
  upvotes: { type: Number, required: true },
  downvotes: { type: Number, required: true },
});

let Comment = (module.exports = mongoose.model("Comment", commentSchema));
