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
 *                              Doctor Routes
 *                                                                                      */
//========================================================================================

const Doctor = require("./controllers/doctorController");

router.get("/doctors/", auth, Doctor.homeDoctor);
router.post("/doctors/register", Doctor.registerDoctor);
router.post("/doctors/login", Doctor.loginDoctor);
router.delete("/doctors/delete", auth, Doctor.deleteDoctor);

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

// router.get("/post/:id", Post.getPost);
router.post("/post/create", auth, Post.createPost); // temporary
// router.get("/post/delete/:id", auth, Post.deletePost);
// router.get("/post/edit/:id", auth, Post.getEditPost);
// router.post("/post/edit/:id", auth, Post.postEditPost);

// router.get("/post/myposts/:uname", auth);

module.exports = router;
