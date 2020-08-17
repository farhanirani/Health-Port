let mongoose = require("mongoose");

let commentSchema = mongoose.Schema({
  commentpostID: {
    // will be the post id
    type: String,
    required: true,
  },
  body: { type: String, required: true },
  authorid: { type: String, required: true },
  authorname: { type: String, required: true },
  authorrole: { type: String, required: true },
  upvotes: { type: Array, required: true },
  downvotes: { type: Array, required: true },
});

module.exports = Comment = mongoose.model("comment", commentSchema);
