const express = require("express");
const router = express.Router();
const {
  createGoal,
  deleteGoal,
  getGoals,
  updateGoal,
} = require("../controllers/goals");
const authenticateUser = require("../middlewares/auth");

router
  .route("/")
  .get(authenticateUser, getGoals)
  .post(authenticateUser, createGoal);
router
  .route("/:id")
  .put(authenticateUser, updateGoal)
  .delete(authenticateUser, deleteGoal);
module.exports = router;
