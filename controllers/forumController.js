const Forum = require("../models/forumModel");
const Post = require("../models/postModel");
const { all } = require("../routes");

//========================================================================================
/*                                                                                      *
 *                              Forum Homepage
 *                                                                                      */
//========================================================================================

module.exports.homepage = async (req, res) => {
  try {
    const allForums = await Forum.find({}).sort({ _id: -1 });
    res.json(allForums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//========================================================================================
/*                                                                                      *
 *                              View all Posts in forum
 *                                                                                      */
//========================================================================================

module.exports.getSubforum = async (req, res) => {
  // res.json(req.params.id); this is the id of the forum
  try {
    const allPostsinSubForum = await Post.find({
      whichForum: req.params.id,
    }).sort({ _id: -1 });
    const forumName = await Forum.findById(req.params.id);
    res.json({ forumName: forumName, data: allPostsinSubForum });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//========================================================================================
/*                                                                                      *
 *                              Create New Forum(temp)
 *                                                                                      */
//========================================================================================
module.exports.createForum = async (req, res) => {
  try {
    let { title, desc, url } = req.body;
    const forum = new Forum({
      title: title,
      description: desc,
      url: url,
      numberOfPosts: 0,
    });

    const saveForum = await forum.save();
    res.json(saveForum);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
