const express = require("express");
const router = express.Router();
const { getUser, loginUser, registerUser } = require("../controllers/users");
const {
  availabiltyOfUserR,
  availabiltyOfUserL,
} = require("../middlewares/availabilityOfUser");
const authenticateUser = require("../middlewares/auth");
router.route("/login").post(availabiltyOfUserL, loginUser);
router.route("/register").post(availabiltyOfUserR, registerUser);
router.route("/me").get(authenticateUser, getUser);
module.exports = router;
