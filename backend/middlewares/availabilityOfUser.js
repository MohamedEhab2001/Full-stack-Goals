const userModel = require("../models/userModel");
const { badRequestError } = require("../errors");
// Register middleWare
const availabiltyOfUserR = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    throw new badRequestError("Bad request", "please provide an email");
  }
  const isExisted = await userModel.findOne({ email });
  if (isExisted) {
    throw new badRequestError("Bad request", "please use another email");
  }
  req.isNew = true;
  next();
};

// Login middleWare
const availabiltyOfUserL = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    throw new badRequestError("Bad request", "please provide an email");
  }
  const isExisted = await userModel.findOne({ email });
  if (!isExisted) {
    throw new badRequestError("Bad request", "no user with this email");
  }
  req.password = isExisted.password;
  req.id = isExisted._id;
  req.existed = true;
  next();
};

module.exports = { availabiltyOfUserR, availabiltyOfUserL };
