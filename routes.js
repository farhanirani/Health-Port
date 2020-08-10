const router = require("express").Router();
const auth = require("./middleware/auth");

//========================================================================================
/*                                                                                      *
 *                              User Routes
 *                                                                                      */
//========================================================================================

const User = require("./controllers/userController");

router.post("/users/register", User.registerUser);
router.post("/users/tokenIsValid", User.tokenIsValid);
router.post("/users/login", User.loginUser);
router.get("/users/", auth, User.homeUser);
router.delete("/users/delete", auth, User.deleteUser);

module.exports = router;
