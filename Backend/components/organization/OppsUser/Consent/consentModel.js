const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const consentModel = new Schema(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      lowercase: true,
      trim: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    adharNumber: {
      type: String,
      required: false,
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    consent: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ConsentEmployee", consentModel);
