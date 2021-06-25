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
    required: false,
  },
  instituteType: {
    type: String,
    required: false,
  },
  instituteEmail: {
    type: String,
    required: false,
    unique: true,
  },
  instituteStudentSize: {
    type: String,
    required: false,
  },
  instituteActiveFrom: {
    type: String,
    required: false,
  },
  instituteZIP: {
    type: Number,
    required: false,
  },
  landMark: {
    type: String,
    required: false,
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
  instituteLocation: {
    type: String,
  },
  state: {
    type: String,
    required: false,
  },
  scandiate: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model(
  "institutes",
  onboardInstituteSchema,
  "institutes"
);
