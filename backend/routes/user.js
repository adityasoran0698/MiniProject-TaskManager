const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const { checkForAuth } = require("../middlewares/auth.js");
router.post("/signup", async (req, res) => {
  const body = req.body;
  const user = await User.create({
    fullname: body.fullname,
    email: body.email,
    password: body.password,
  });
  return res.json({ message: "Signup Successfull" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    const user = await User.findOne({ email });
    res.cookie("token", token);
    return res.status(200).json({
      message: "Login Successfull",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ message: error.message });
  }
});

router.get("/me", checkForAuth("token"), async (req, res) => {
  const user = req.user;
  return res.json({ fullname: user.fullname });
});
module.exports = router;
