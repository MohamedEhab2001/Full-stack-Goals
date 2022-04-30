const mongoose = require("mongoose");

const goalsModel = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goals", goalsModel);
