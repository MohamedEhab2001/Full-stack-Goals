const errors = require("../errors");
// @desc get all goals
// @route GET /api/v1/goals
// @access private
const getGoals = (req, res) => {
  res.json({ message: "get Goals" });
};

// @desc create new goals
// @route POST /api/v1/goals
// @access private
const createGoal = (req, res) => {
  const { goal } = req.body;
  if (!goal) {
    throw new errors.badRequestError("Bad request", "Please provide the goal");
  }
  res.json({ message: "Craete Goals", goal: goal });
};

// @desc update specific goal
// @route PUT /api/v1/goals/:id
// @access private
const updateGoal = (req, res) => {
  res.json({ message: "update Goals", id: `the id is ${req.params.id}` });
};

// @desc delete specific goal
// @route DELETE /api/v1/goals/:id
// @access private
const deleteGoal = (req, res) => {
  res.json({ message: "delete Goals", id: `the id is ${req.params.id}` });
};

module.exports = {
  getGoals,
  updateGoal,
  createGoal,
  deleteGoal,
};
