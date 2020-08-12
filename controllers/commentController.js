const User = require("../models/userModel");
const Comment = require("../models/commentModel");

//========================================================================================
/*                                                                                      *
 *                            Create New Comment
 *                                                                                      */
//========================================================================================
module.exports.createComment = async (req, res) => {
  try {
    // console.log(req.user);
    temp = await User.findById(req.user);
    let authorname = temp.userName;
    let authorid = req.user;
    let commentpostID = req.params.id;
    let { body } = req.body;
    const newPost = new Comment({
      commentpostID: commentpostID,
      body: body,
      authorid: authorid,
      authorname: authorname,
      upvotes: 0,
      downvotes: 0,
    });
    const savedPost = await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//========================================================================================
/*                                                                                      *
 *                               Delete Comment
 *                                                                                      */
//========================================================================================

module.exports.deleteComment = async (req, res) => {
  try {
    Comment.findById(req.params.id, async (err, post) => {
      if (err || !post || post.authorid != req.user) {
        res.status(500).json("Error deleting comment");
      } else {
        let commentID = req.params.id;
        const delComment = await Comment.findOneAndDelete({ _id: commentID });
        res.json(delComment);
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
