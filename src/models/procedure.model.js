const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const procedureSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
procedureSchema.plugin(toJSON);
procedureSchema.plugin(paginate);

/**
 * @typedef Procedure
 */
const Procedure = mongoose.model('Procedure', procedureSchema);

module.exports = Procedure;
