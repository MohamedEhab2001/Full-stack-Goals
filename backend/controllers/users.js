const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const errors = require("../errors");
// @desc Authanticate user
// @route post /api/v1/users/login
// @access public
const loginUser = async (req, res) => {
  const { password } = req.body;

  // check for email and password
  if (!password) {
    throw new errors.badRequestError(
      "Bad request",
      "your request miss password data"
    );
  }
  const correctPassword = await bcrypt.compare(password, req.password);
  if (req.existed && correctPassword) {
    return res.status(200).json({
      authenticated: true,
      existed: req.existed,
      correctPassword: correctPassword,
      token: generateToken(req.id),
    });
  } else {
    throw new errors.badRequestError("Bad request", "Password is incorrect");
  }
};

// @desc register user
// @route post /api/v1/users/register
// @access public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  if (req.isNew) {
    const newUser = await userModel.create({
      name,
      email,
      password: hash,
    });
    return res.status(201).json({
      message: "register user",
      user: { ...newUser, token: generateToken(newUser._id) },
    });
  }

  throw new errors.internalServerlError(
    "INTERNAL SERVER ERROR",
    "if you see this error please contact us"
  );
};

// @desc get user data
// @route post /api/v1/users/me
// @access private
const getUser = (req, res) => {
  const { name, email } = req.user;
  res.json({ message: "user is authenticated", name, email });
};

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = {
  loginUser,
  registerUser,
  getUser,
};
