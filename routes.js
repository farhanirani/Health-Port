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
 *                              User Routes
 *                                                                                      */
//========================================================================================

const  Doctor = require('./controllers/doctorController')

router.get("/doctors/", auth, Doctor.homeDoctor);
router.post("/doctors/register", Doctor.registerDoctor);
router.post("/doctors/login", Doctor.loginDoctor);
router.delete("/doctors/delete", auth, Doctor.deleteDoctor);

module.exports = router;
