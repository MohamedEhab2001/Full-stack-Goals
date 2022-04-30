const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { unathanticatedError } = require("../errors");
const authenticateUser = async (req, res, next) => {
  // get token from header
  const { authorization } = req.headers;
  // check if client sent the auth and in proper format
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new unathanticatedError("401 Un authorized", "Please re-login");
  }
  try {
    //get token
    const token = authorization.split(" ")[1];
    // verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      ignoreExpiration: false,
    });
    req.user = await userModel.findOne({ _id: decoded.id });
    next();
  } catch (error) {
    const errorUnAuth = new unathanticatedError(
      error.message,
      "Please re-login"
    );
    next(errorUnAuth);
  }
};

module.exports = authenticateUser;
