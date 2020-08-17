const User = require("../models/userModel");

//========================================================================================
/*                                                                                      *
 *                              Get doctors to be checked
 *                                                                                      */
//========================================================================================
module.exports.getdoctorsforvalidation = async (req, res) => {
  try {
    const admin = await User.findOne({ userName: "admin" });
    //   console.log(admin._id);
    // console.log(req.user);
    if (req.user != admin._id) {
      res.status(500).json("not authorized");
    } else {
      const ans = await User.find({
        $and: [{ role: "doctor" }, { reviewed: false }],
      });
      res.json(ans);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//========================================================================================
/*                                                                                      *
 *             Params has the id of the doc to be reistered/declined
 *                                                                                      */
//========================================================================================

module.exports.getdoctorsvalidation = async (req, res) => {
  try {
    let { accepted } = req.body;
    const ans = await User.findByIdAndUpdate(req.params.id, {
      accepted: accepted,
      reviewed: true,
    });
    res.json(ans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//========================================================================================
/*                                                                                      *
 *                         Get doctors who aer validated
 *                                                                                      */
//========================================================================================

module.exports.getdoctors = async (req, res) => {
  try {
    const ans = await User.find({
      $and: [{ role: "doctor" }, { reviewed: true }, { accepted: true }],
    });
    res.json(ans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const USERDOC = require("../models/userDocConnection");

module.exports.getdocchats = async (req, res) => {
  try {
    const ans = await USERDOC.find({ doc: req.user });
    res.json(ans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
