const mongoose = require("mongoose");

// Onboard Organization Schema

let onboardOrganizationSchema = mongoose.Schema({
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
    required: false,
  },
  organisationEmail: {
    type: String,
    required: false,
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
    required: false,
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
    required: false,
  },
  contact: {
    type: Number,
  },
  code: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
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
  scandiate: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model(
  "organisations",
  onboardOrganizationSchema,
  "organisations"
);
