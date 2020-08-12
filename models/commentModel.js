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

module.exports = Comment = mongoose.model("comment", commentSchema);
