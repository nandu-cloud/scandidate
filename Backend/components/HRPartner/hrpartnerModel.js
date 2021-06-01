const mongoose = require("mongoose");

const hrpartnerSchema = new mongoose.Schema(
  {
    hrorganizationname: {
      type: String,
      required: [true, "Organization Name cannot be empty"],
    },
    hrcontactPersonName: {
      type: String,
      required: false,
    },
    hrorganisationAddress: {
      type: String,
      required: false,
    },
    hrorganisationType: {
      type: String,
      required: true,
    },
    hrorganisationEmail: {
      type: String,
      required: [true, "Email Cannot Be Empty"],
      unique: true,
    },
    hrorganisationEmployeeSize: {
      type: String,
      required: false,
    },
    hrorganisationActiveFrom: {
      type: String,
    },
    hrorganisationZIP: {
      type: Number,
      required: true,
    },
    hrorganisationDescription: {
      type: String,
      required: false,
    },
    hrorganisationLogo: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      required: true,
    },
    contact: {
      type: Number,
    },
    code: {
      type: String,
    },
    legalEntityName: {
      type: String,
    },
    hrorganizationLocation: {
      type: String,
    },
    state: {
      type: String,
    },
    landMark: {
      type: String,
      required: false,
    },
    headQuaterLocation: {
      type: String,
    },
    hrorganizationGstn: {
      type: String,
    },
    hrorganizationCin: {
      type: String,
    },
    panNumber: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HRPartner", hrpartnerSchema);
