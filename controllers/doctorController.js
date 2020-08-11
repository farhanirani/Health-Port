const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctorModel");

//========================================================================================
/*                                                                                      *
 *                              Doctor home
 *                                                                                      */
//========================================================================================

module.exports.homeDoctor = async (req, res) => {
  const user = await Doctor.findById(req.user);
  res.json({
    userName: user.userName,
    id: user._id,
  });
};
//======================================================================================

//                             Doctor Register

//======================================================================================

module.exports.registerDoctor = async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      url,
    } = req.body;

    // validate

    if (
      !userName ||
      !password ||
      !confirmPassword ||
      !email ||
      !phoneNumber ||
      !url
    )
      return res.status(400).json({ msg: "Not all fields have been entered." });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingDoctor = await Doctor.find({
      $or: [
        { userName: userName },
        { email: email },
        { phoneNumber: phoneNumber },
      ],
    });

    if (existingDoctor.length != 0) {
      if (existingDoctor[0].userName == userName)
        return res
          .status(400)
          .json({ msg: "An account with this username already exists." });
      else if (existingDoctor[0].email == email)
        return res
          .status(400)
          .json({ msg: "An account with this email already exists." });
      else if (existingDoctor[0].phoneNumber == phoneNumber)
        return res
          .status(400)
          .json({ msg: "An account with this number already exists." });
    }

    //all parameters passed

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newDoctor = new Doctor({
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: passwordHash,
      email: email,
      phoneNumber: phoneNumber,
      url: url,
    });

    const savedDoctor = await newDoctor.save();
    res.json(savedDoctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//========================================================================================
/*                                                                                      *
 *                              Doctor Login
 *                                                                                      */
//========================================================================================

module.exports.loginDoctor = async (req, res) => {
  try {
    // console.log(req.body);
    const { userName, password } = req.body;

    // validate
    if (!userName || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const doctor = await Doctor.findOne({ userName: userName });
    if (!doctor)
      return res
        .status(400)
        .json({ msg: "No account with this username has been registered." });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
    res.json({
      token,
      doctor: {
        id: doctor._id,
        userName: doctor.userName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//====================================================================================

//                            Delete Doctor

//=====================================================================================

module.exports.deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.user);
    res.json(deletedDoctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
