const { boolean } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// schema
const studentSchema = new mongoose.Schema({
  nameOfCourse: {
    type: String,
  },
  yearOfJoining: {
    type: String,
  },
  yearOfPassout: {
    type: String,
  },
  studentType: {
    type: String,
  },
  extraActivity: {
    type: String,
  },
  extraActivityDocumentName: {
    type: String,
  },
  noOfEductionalDocuments: {
    type: Number,
  },
  eductionalDocumentNames: {
    type: Array,
  },
  purposeOfFile: {
    type: Array
  },
  firstName: {
    type: String,
    required: [true, "first name cannot be empty"],
  },
  lastName: {
    type: String,
    required: [true, "last name cannot be empty"],
  },
  roll: {
    type: String,
    required: [true, "roll cannot be empty"],
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
});
// compile schema to model
module.exports = mongoose.model("students", studentSchema, "students");
