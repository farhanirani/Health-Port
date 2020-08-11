const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//========================================================================================
/*                                                                                      *
 *                              User Register
 *                                                                                      */
//========================================================================================
module.exports.registerUser = async (req, res) => {
  try {
    let { userName, password, confirmPassword } = req.body;

    // validate

    if (!userName || !password || !confirmPassword)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ userName: userName });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this username already exists." });

    //all parameters passed

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName: userName,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//========================================================================================
/*                                                                                      *
 *                              Check token
 *                                                                                      */
//========================================================================================

module.exports.tokenIsValid = async (req, res) => {
  // console.log(req.header("x-auth-token"));
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//========================================================================================
/*                                                                                      *
 *                              User Login
 *                                                                                      */
//========================================================================================

module.exports.loginUser = async (req, res) => {
  try {
    // console.log(req.body);
    const { userName, password } = req.body;

    // validate
    if (!userName || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ userName: userName });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this username has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        userName: user.userName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//========================================================================================
/*                                                                                      *
 *                              User Delete
 *                                                                                      */
//========================================================================================

module.exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//========================================================================================
/*                                                                                      *
 *                              User home
 *                                                                                      */
//========================================================================================

module.exports.homeUser = async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    userName: user.userName,
    id: user._id,
  });
};
