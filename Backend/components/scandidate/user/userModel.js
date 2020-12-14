const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// schema
const userSchema = new mongoose.Schema({
  organizationId: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  institutionId: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  firstName: {
    type: String,
    required: [true, "first name cannot be empty"],
  },
  lastName: {
    type: String,
    required: [true, "last name cannot be empty"],
  },
  role: {
    type: String,
    required: [true, "role cannot be empty"],
    enum: ["SCANDIDATE", "ORGANIZATION", "INSTITUTION"],
  },
  subRole: {
    type: String,
    required: [true, "sub role cannot be empty"],
    enum: ["ADMIN", "OPERATIONAL_USER"],
  },
  scandidateId: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: [true, "email cannot be empty"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password cannot be empty"],
    select: false,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: false,
  },
  dateOfBirth: {
    type: Date,
  },
  employeeId: {
    type: String,
    required: false,
  },
  currentAddress: {
    type: String,
    required: false,
  },
  permanentAddress: {
    type: String,
    required: false,
  },
  aboutMe: {
    type: String,
    required: false,
  },
  avatarLink: {
    type: String,
    required: false,
  },
  noOfAssociatedUsers: {
    type: Number,
    required: false,
  },
  onboardedById: {
    type: String,
    required: false,
    select: false,
  },
  status: {
    type: Boolean,
    required: [true, "status cannot be empty"],
  },
  otp: {
    type: Number,
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
module.exports = mongoose.model("users", userSchema, "users");
