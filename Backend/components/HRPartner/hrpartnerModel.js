const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hrpartnerSchema = new mongoose.Schema(
  {
    organizationName: {
      type: String,
      required: [true, "Organization Name cannot be empty"],
    },
    contactPersonName: {
      type: String,
      required: false,
    },
    organisationAddress: {
      type: String,
      required: false,
    },
    organisationType: {
      type: String,
      required: true,
    },
    organisationEmail: {
      type: String,
      required: [true, "Email Cannot Be Empty"],
      unique: true,
    },
    organisationEmployeeSize: {
      type: String,
      required: false,
    },
    organisationActiveFrom: {
      type: String,
    },
    organisationZIP: {
      type: Number,
      required: true,
    },
    organisationDescription: {
      type: String,
      required: false,
    },
    organisationLogo: {
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
    organizationLocation: {
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
    organizationGstn: {
      type: String,
    },
    organizationCin: {
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
