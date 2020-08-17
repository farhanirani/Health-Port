const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const Forum = require("../models/forumModel");
const Message = require("../models/messagesModel");
const USERDOC = require("../models/userDocConnection");

//========================================================================================
/*                                                                                      *
 *                               Get chat
 *                                                                                      */
//========================================================================================

module.exports.getChat = async (req, res) => {
  // console.log(req.user);
  // console.log(req.params.iddoc);
  try {
    ans = await Message.find({
      $or: [
        {
          $and: [{ senderId: req.user }, { recieverId: req.params.iddoc }],
        },
        {
          $and: [{ senderId: req.params.iddoc }, { recieverId: req.user }],
        },
      ],
    });
    res.json(ans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//========================================================================================
/*                                                                                      *
 *                               AddMessage
 *                                                                                      */
//========================================================================================

module.exports.addMessageToChat = async (req, res) => {
  try {
    let { body } = req.body;
    message = new Message({
      senderId: req.user,
      recieverId: req.params.id,
      body: body,
    });

    const ans = await message.save();
    const temp = await USERDOC.find({
      $and: [{ user: req.user }, { doc: req.params.id }],
    });

    if (!temp.length) {
      const usernamefordoc = await User.findById(req.user);
      // console.log(usernamefordoc);
      aaa = new USERDOC({
        user: req.user,
        doc: req.params.id,
        userName: usernamefordoc.userName,
      });
      const asd = await aaa.save();
      console.log(asd);
    }
    res.json(ans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
