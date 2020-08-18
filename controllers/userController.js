const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");

//========================================================================================
/*                                                                                      *
 *                              Chatbot
 *                                                                                      */
//========================================================================================

module.exports.chatbot = async (req, res) => {
  console.log(req.body);
  runSample(req.body.MSG).then((data) => {
    res.send({ Reply: data });
  });
};

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */

async function runSample(msg, projectId = "doctorbot-nqqvdw") {
  // A unique identifier for the given session
  const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: __dirname + "/credentials.json",
  });
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg,
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  console.log(result.fulfillmentText);
  return result.fulfillmentText;
}

//========================================================================================
/*                                                                                      *
 *                              User Register
 *                                                                                      */
//========================================================================================
module.exports.registerUser = async (req, res) => {
  try {
    let { userName, password, confirmPassword } = req.body;

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
      role: "user",
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//========================================================================================
/*                                                                                      *
 *                              Doc Register
 *                                                                                      */
//========================================================================================

module.exports.registerdoc = async (req, res) => {
  try {
    // console.log(req.body);
    let { userName, password, confirmPassword, fname, lname, email } = req.body;

    if (
      !userName ||
      !password ||
      !confirmPassword ||
      !fname ||
      !lname ||
      !email
    )
      return res.status(400).json({ msg: "Not all fields have been entered." });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({
      $or: [{ userName: userName }, { email: email }],
    });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this username/email already exists." });

    //all parameters passed

    var x = Math.floor(Math.random() * 1000 + 1);
    req.files.certificate.mv(
      "doctorCertificates/" + x + req.files.certificate.name
    );
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName: userName,
      password: passwordHash,
      role: "doctor",
      firstName: fname,
      lastName: lname,
      email: email,
      url: x + req.files.certificate.name,
    });
    // console.log(newUser);
    const savedUser = await newUser.save();
    // console.log(savedUser);
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

    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET
    );
    res.json({
      token,
      user: {
        userName: user.userName,
        id: user._id,
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
    const deletedUser = await User.findOneAndDelete({ userName: req.user });
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
  const user = await User.findOne({ _id: req.user });
  res.json({
    userName: user.userName,
    id: user._id,
    role: user.role,
  });
};
