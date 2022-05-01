const errors = require("../errors");
const goalModel = require("../models/goalsModel");

// @desc get all goals
// @route GET /api/v1/goals
// @access private
const getGoals = async (req, res) => {
  const goals = await goalModel.find({ user: req.user._id });
  res.status(200).json({ status: "success", goals });
};

// @desc create new goals
// @route POST /api/v1/goals
// @access private
const createGoal = async (req, res) => {
  const { text } = req.body;
  if (!text) {
    throw new errors.badRequestError("Bad request", "Please provide the goal");
  }
  const goal = await goalModel.create({ text, user: req.user._id });
  res.status(201).json({ message: "Created successfully", goal: goal });
};

// @desc update specific goal
// @route PUT /api/v1/goals/:id
// @access private
const updateGoal = async (req, res) => {
  const { id: goalID } = req.params;
  const toUpdateGoal = await goalModel.findOneAndUpdate(
    { _id: goalID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  // Check for user
  if (!req.user) {
    throw new errors.unathanticatedError("User not found");
  }

  if (!toUpdateGoal) {
    throw new errors.notFoundError(
      "No user with this id",
      "Please make sure that the id is in right format"
    );
  }

  res
    .status(200)
    .json({ message: "Updated successfully", newGoal: toUpdateGoal });
};

// @desc delete specific goal
// @route DELETE /api/v1/goals/:id
// @access private
const deleteGoal = async (req, res) => {
  const { id: goalID } = req.params;
  // Check for user
  if (!req.user) {
    throw new errors.unathanticatedError("User not found");
  }
  const toDeleteGoal = await goalModel.findOneAndDelete({ _id: goalID });
  if (!toDeleteGoal) {
    throw new errors.notFoundError(
      "No user with this id",
      "Please make sure that the id is in right format"
    );
  }
  res.status(200).json({ message: "Deleted successfully" });
};

module.exports = {
  getGoals,
  updateGoal,
  createGoal,
  deleteGoal,
};
