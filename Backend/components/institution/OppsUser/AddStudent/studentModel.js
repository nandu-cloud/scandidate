const { boolean } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// schema
const studentSchema = new mongoose.Schema({
    nameOfCourse: {
        type: String,
    },
    yearOfJoining: {
        type: Number,
    },
    yearOfPassout: {
        type: Number,
    },
    studentType: {
        type: String,
    },
    extraActivity: {
        type: Boolean,
    },
    extraActivityDocumentLink: {
        type: String,
    },
    extraActivityNameOfDocument:{
        type: String,
    },
    noOfEductionalDocuments: {
        type: Number,
    },
    eductionalDocumentLinks: {
        type: String,
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
        type: Number,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    addedById: {
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
