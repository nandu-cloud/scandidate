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
    required: true,
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
    type: Date,
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
  legalEntityName:{
    type:String,
  },
  organizationLocation:{
    type:String,
  },
  state:{
    type:String,
  },
  headQuaterLocation:{
    type:String
  },
  organizationGstn:{
    type:String
  },
  organizationCin:{
    type:String
  }
});

module.exports = mongoose.model(
  "organisations",
  onboardOrganizationSchema,
  "organisations"
);
