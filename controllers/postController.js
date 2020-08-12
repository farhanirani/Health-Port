const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//========================================================================================
/*                                                                                      *
 *                               Get 1 Post
 *                                                                                      */
//========================================================================================

module.exports.getPost = async (req, res) => {
  try {
    ans = await Post.findById(req.params.id);
    res.json(ans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//========================================================================================
/*                                                                                      *
 *                               Get all User Post
 *                                                                                      */
//========================================================================================

module.exports.getMyPosts = async (req, res) => {
  try {
    ans = await Post.find({ author: req.params.id });
    res.json(ans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//========================================================================================
/*                                                                                      *
 *                               Create New Post
 *                                                                                      */
//========================================================================================
module.exports.createPost = async (req, res) => {
  try {
    // console.log(req.user);
    const temp = await User.findById(req.user);
    let authorName = temp.userName;
    let author = req.user;
    let { wforum, title, body } = req.body;
    const newPost = new Post({
      whichForum: wforum,
      author: author,
      authorName: authorName,
      title: title,
      body: body,
      upvotes: 0,
      downvotes: 0,
    });
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//========================================================================================
/*                                                                                      *
 *                               Edit Post
 *                                                                                      */
//========================================================================================

//========================================================================================
/*                                                                                      *
 *                               Delete Post
 *                                                                                      */
//========================================================================================

module.exports.deletePost = async (req, res) => {
  try {
    Post.findById(req.params.id, async (err, post) => {
      if (err || !post || post.author != req.user) {
        res.status(500).json("Error deleting post");
      } else {
        postId = req.params.id;
        const deleteComments = await Comment.deleteMany({
          commentpostID: postId,
        });
        const delPost = await Post.findOneAndDelete({ _id: postId });
        res.json(delPost);
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//========================================================================================
/*                                                                                      *
 *                               Get comments for the post
 *                                                                                      */
//========================================================================================

module.exports.getComments = async (req, res) => {
  try {
    const ans = await Comment.find({ commentpostID: req.params.id });
    res.json(ans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
