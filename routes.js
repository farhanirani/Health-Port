const router = require("express").Router();
const auth = require("./middleware/auth");

//========================================================================================
/*                                                                                      *
 *                              User Routes
 *                                                                                      */
//========================================================================================

const User = require("./controllers/userController");

router.get("/users/", auth, User.homeUser);
router.post("/users/register", User.registerUser);
router.post("/users/login", User.loginUser);
router.delete("/users/delete", auth, User.deleteUser);
router.post("/users/tokenIsValid", User.tokenIsValid);

//========================================================================================
/*                                                                                      *
 *                              Forum Routes
 *                                                                                      */
//========================================================================================

const Forum = require("./controllers/forumController");

// router.post("/forum/create", Forum.createForum); // temporary
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
router.post("/post/postUpvote/:id", auth, Post.upvotePost);
router.post("/post/postDownvote/:id", auth, Post.downVote);
// router.post("/post/edit/:id", auth, Post.postEditPost);

router.get("/post/myposts/:id", auth, Post.getMyPosts);

// upvotes
// downvotes

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
// downvotes

module.exports = router;
