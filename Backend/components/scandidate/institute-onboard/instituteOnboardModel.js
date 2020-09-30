const mongoose = require("mongoose");

// Onboard Organization Schema

let onboardInstituteSchema = mongoose.Schema({
  instituteName: {
    type: String,
    required: [true, "Institute Name cannot be empty"],
  },
  contactPersonName: {
    type: String,
    required: false,
  },
  instituteAddress: {
    type: String,
    required: true,
  },
  instituteType: {
    type: String,
    required: true,
  },
  instituteEmail: {
    type: String,
    required: [true, "Email Cannot Be Empty"],
    unique: true,
  },
  instituteStudentSize: {
    type: String,
    required: false,
  },
  instituteActiveFrom: {
    type: Date,
    required: [true, "Date cannot be empty"],
  },
  instituteZIP: {
    type: Number,
    required: true,
  },
  instituteDescription: {
    type: String,
    required: false,
  },
  instituteLogo: {
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
  instituteLocation:{
    type: String
  },
  state:{
    type: String
  }
});


module.exports = mongoose.model(
  "institutes",
  onboardInstituteSchema,
  "institutes"
);
