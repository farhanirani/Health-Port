const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const Forum = require("../models/forumModel");

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
    let { wforum, fname, title, body } = req.body;
    const newPost = new Post({
      whichForum: wforum,
      forumName: fname,
      author: author,
      authorName: authorName,
      authorrole: temp.role,
      title: title,
      body: body,
      upvotes: [],
      downvotes: [],
    });
    const savedPost = await newPost.save();
    const t2 = await Forum.findById(wforum);
    // console.log(t2);
    const updateCount = await Forum.findOneAndUpdate(
      { _id: wforum },
      { numberOfPosts: t2.numberOfPosts + 1 }
    );
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
 *                               Upvote Post
 *                                                                                      */
//========================================================================================

module.exports.upvotePost = async (req, res) => {
  try {
    tt1 = [];
    tt2 = [];
    let author = req.user;
    Post.findById(req.params.id).then(async (t2) => {
      // console.log(t2);
      tt1 = t2.upvotes;
      if (tt1.includes(author)) {
        const index = tt1.indexOf(author);
        tt1.splice(index, 1);
      } else {
        tt1.push(author);
      }
      tt2 = t2.downvotes;
      const index = tt2.indexOf(author);
      if (index > -1) {
        tt2.splice(index, 1);
      }

      console.log(tt1, tt2);

      const asdasd = await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          upvotes: tt1,
          downvotes: tt2,
        }
      );
      res.json(asdasd);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//========================================================================================
/*                                                                                      *
 *                               Downvote Post
 *                                                                                      */
//========================================================================================

module.exports.downVote = async (req, res) => {
  try {
    tt1 = [];
    tt2 = [];
    let author = req.user;
    Post.findById(req.params.id).then(async (t2) => {
      // console.log(t2);
      tt1 = t2.downvotes;
      if (tt1.includes(author)) {
        const index = tt1.indexOf(author);
        tt1.splice(index, 1);
      } else {
        tt1.push(author);
      }
      tt2 = t2.upvotes;
      const index = tt2.indexOf(author);
      if (index > -1) {
        tt2.splice(index, 1);
      }

      console.log(tt1, tt2);

      const asdasd = await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          upvotes: tt2,
          downvotes: tt1,
        }
      );
      res.json(asdasd);
      // console.log(asdasd);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//========================================================================================
/*                                                                                      *
 *                               Delete Post
 *                                                                                      */
//========================================================================================

module.exports.deletePost = async (req, res) => {
  console.log(req.user);
  try {
    Post.findById(req.params.id, async (err, post) => {
      // console.log(post);
      if (err || !post || post.author !== req.user) {
        res.status(401).json("Error deleting post");
      } else {
        postId = req.params.id;
        const deleteComments = await Comment.deleteMany({
          commentpostID: postId,
        });

        const t2 = await Forum.findById(post.whichForum);
        // console.log(t2);
        const updateCount = await Forum.findOneAndUpdate(
          { _id: post.whichForum },
          { numberOfPosts: t2.numberOfPosts - 1 }
        );

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
    const ans = await Comment.find({ commentpostID: req.params.id }).sort({
      _id: -1,
    });
    res.json(ans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
