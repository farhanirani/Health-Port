const router = require("express").Router();
const auth = require("./middleware/auth");

//========================================================================================
/*                                                                                      *
 *                              User Routes
 *                                                                                      */
//========================================================================================

const User = require("./controllers/userController");

router.post("/chatbot/send", User.chatbot);

router.get("/users/", auth, User.homeUser);
router.post("/users/register", User.registerUser);
router.post("/users/registerdoc", User.registerdoc);
router.post("/users/login", User.loginUser);
router.delete("/users/delete", auth, User.deleteUser);
router.post("/users/tokenIsValid", User.tokenIsValid);

//========================================================================================
/*                                                                                      *
 *                              Message Routes
 *                                                                                      */
//========================================================================================
const Message = require("./controllers/messageController");

router.get("/messages/:iddoc", auth, Message.getChat);
router.post("/messages/add/:id", auth, Message.addMessageToChat);

//========================================================================================
/*                                                                                      *
 *                              Doctor Routes
 *                                                                                      */
//========================================================================================

const Doc = require("./controllers/docController");

router.get("/docs/getdoctorsforvalidation", auth, Doc.getdoctorsforvalidation);
router.post(
  "/docs/getdoctorsforvalidation/:id",
  auth,
  Doc.getdoctorsvalidation
);
router.get("/docs/getdoctors", Doc.getdoctors);
router.get("/docs/getusers4doc", auth, Doc.getdocchats);

//========================================================================================
/*                                                                                      *
 *                              Forum Routes
 *                                                                                      */
//========================================================================================

const Forum = require("./controllers/forumController");

router.post("/forum/create", Forum.createForum); // temporary
router.get("/forum/", Forum.homepage);
router.get("/forum/:id", Forum.getSubforum);

//========================================================================================
/*                                                                                      *
 *                              Post Routes
 *                                                                                      */
//========================================================================================

const Post = require("./controllers/postController");

router.get("/post/:id", Post.getPost);
router.post("/post/create", auth, Post.createPost);
router.delete("/post/delete/:id", auth, Post.deletePost);
router.get("/post/getcomments/:id", Post.getComments);
// router.post("/post/edit/:id", auth, Post.postEditPost);
router.get("/post/myposts/:id", auth, Post.getMyPosts);

// upvotes
router.post("/post/postUpvote/:id", auth, Post.upvotePost);
// downvotes
router.post("/post/postDownvote/:id", auth, Post.downVote);

//========================================================================================
/*                                                                                      *
 *                              Comment Routes
 *                                                                                      */
//========================================================================================

const Comment = require("./controllers/commentController");

// post id
router.post("/comment/create/:id", auth, Comment.createComment);
// comment id
router.delete("/comment/delete/:id", auth, Comment.deleteComment);

// upvotes
router.post("/comment/postUpvote/:id", auth, Comment.upvotePost);
// downvotes
router.post("/comment/postDownvote/:id", auth, Comment.downVote);

module.exports = router;
