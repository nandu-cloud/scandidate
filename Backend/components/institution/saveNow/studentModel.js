const { boolean } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// schema
const studentSchema = new mongoose.Schema({
  nameOfCourse: {
    type: String,
    required: false,
  },
  yearOfJoining: {
    type: String,
    required: false,
  },
  yearOfPassout: {
    type: String,
    required: false,
  },
  studentType: {
    type: String,
    required: false,
  },
  extraActivity: {
    type: String,
    required: false,
  },
  extraActivityDocumentName: {
    type: String,
    required: false,
  },
  noOfEductionalDocuments: {
    type: Number,
    required: false,
  },
  eductionalDocumentNames: {
    type: Array,
    required: false,
  },
  originalFilename: {
    type: String,
    required: false,
  },
  originalFilenames: {
    type: Array,
    required: false,
  },
  purposeOfFile: {
    type: Array,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  roll: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  dateOfBirth: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  zipCode: {
    type: Number,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  landMark: {
    type: String,
    required: false,
  },
  adharNumber: {
    type: String,
    required: false,
  },

  intitutionName: {
    type: String,
    required: false,
  },
  addedById: {
    type: String,
    required: false,
  },
  instituteId: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },

  // CANDIDATE ATTRIBUTES
  nameofFeedbackProvider: {
    type: String,
    required: false,
  },
  designationOfFeedbackProvider: {
    type: String,
    required: false,
  },

  candidateInstituteId: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  bgvCandidate: {
    type: Boolean,
    required: false,
  },
  hrorganisationId: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  dateOfVerification: {
    type: Date,
    required: false,
  },

  personalIdentity: {
    type: String,
    required: false,
  },
  criminal: {
    type: String,
    required: false,
  },
  verificationAddress: {
    type: String,
    required: false,
  },
  drugsAndSubstanceAbuse: {
    type: String,
    required: false,
  },
});
// compile schema to model
module.exports = mongoose.model("students", studentSchema, "students");
