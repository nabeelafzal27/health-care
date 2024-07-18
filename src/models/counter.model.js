const mongoose = require("mongoose");

const counterSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    sequence_value: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Counter
 */
const Counter = mongoose.model("Counter", counterSchema);

module.exports = Counter;
