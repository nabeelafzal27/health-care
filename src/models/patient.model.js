const mongoose = require("mongoose");
const { getNextSequenceValue } = require("../utils/sequenceGenerator");
const { toJSON, paginate } = require("./plugins");

const patientSchema = mongoose.Schema(
  {
    mrNumber: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    fatherHusbandName: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    age: {
      type: Number,
    },
    doctor: {
      type: String,
    },
    reason: {
      type: String,
      trim: true,
    },
    registrationDate: {
      type: Date,
    },
    address: {
      type: String,
      trim: true,
    },
    referredBy: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
patientSchema.plugin(toJSON);
patientSchema.plugin(paginate);

// Middleware to auto-increment _id before saving a new document
patientSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.mrNumber = await getNextSequenceValue("mrNumber");
    this._id = this.mrNumber;
  }
  next();
});

/**
 * Check if email is taken
 * @param {string} email - The patient's email
 * @param {ObjectId} [excludeUserId] - The id of the patient to be excluded
 * @returns {Promise<boolean>}
 */
patientSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * @typedef Patient
 */
const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;

// patientSchema.plugin(autoIncrement.plugin, {
//   model: "patientSchema",
//   field: "mrNumber",
//   startAt: 1,
//   incrementBy: 1,
// });
