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
    console.log(temp);
    let authorname = temp.userName;
    let authorid = req.user;
    let commentpostID = req.params.id;
    let { body } = req.body;
    const newPost = new Comment({
      commentpostID: commentpostID,
      body: body,
      authorid: authorid,
      authorname: authorname,
      authorrole: temp.role,
      upvotes: [],
      downvotes: [],
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

//========================================================================================
/*                                                                                      *
 *                               Upvote Comment
 *                                                                                      */
//========================================================================================

module.exports.upvotePost = async (req, res) => {
  try {
    tt1 = [];
    tt2 = [];
    let author = req.user;
    Comment.findById(req.params.id).then(async (t2) => {
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

      const asdasd = await Comment.findOneAndUpdate(
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
 *                               Downvote Comment
 *                                                                                      */
//========================================================================================

module.exports.downVote = async (req, res) => {
  try {
    tt1 = [];
    tt2 = [];
    let author = req.user;
    Comment.findById(req.params.id).then(async (t2) => {
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

      const asdasd = await Comment.findOneAndUpdate(
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
