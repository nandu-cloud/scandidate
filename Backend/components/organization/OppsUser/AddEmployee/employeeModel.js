const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// schema
const employeeSchema = new mongoose.Schema({

    //Presonal Info
    firstName: {
        type: String,
        required: [true, "first name cannot be empty"],
    },
    lastName: {
        type: String,
        required: [true, "last name cannot be empty"],
    },
    employeeId: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
    },
    role: {
        type: String,
        required: false,
    },
    department: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    dateOfBirth: {
        type: Date,
        required: false,
    },
    phoneNumber: {
        type: Number,
        required: [true, "Phone Number cannot be empty"],
    },
    adharNumber: {
        type: Number,
        required: false,
    },
    panNumber: {
        type: String,
        required: false,
    },
    organizationName: {
        type: String,
        required: true
    },
    dateOfJoining: {
        type: Date,
        required: [true, "Date Of Joining cannot be empty"],

    },
    exitDate: {
        type: Date,
        required: [true, "Date Of Exit cannot be empty"],
    },
    professionalExperience: {
        type: Number,
        required: [true, "Professional Experience Cannot Be Empty"]
    },
    //Work Ethic
    selfDriven: {
        type: Number,
        required: false,
    },
    creativity: {
        type: Number,
        required: false,
    },
    informalOrganizationSenseOfBelonging: {
        type: Number,
        required: false,
    },
    initiative: {
        type: Number,
        required: false,
    },
    workIndependenty: {
        type: Number,
        required: false,
    },
    teamWork: {
        type: Number,
        required: false,
    },
    dealConstructivelyWithPressure: {
        type: Number,
        required: false,
    },

    //performance
    volume: {
        type: Number,
        required: false,
    },
    quality: {
        type: Number,
        required: false,
    },
    consistency: {
        type: Number,
        required: false,
    },
    awards: {
        type: String,
        required: false
    },

    //Conduct
    punctuality: {
        type: Number,
        required: false,
    },
    discipline: {
        type: Number,
        required: false,
    },

    //Merit-Quality
    academicKnowledge: {
        type: Number,
        required: false,
    },
    productKnowledge: {
        type: Number,
        required: false,
    },
    industryKnowledge: {
        type: Number,
        required: false,
    },
    communicationSkills: {
        type: Number,
        required: false,
    },

    //Other Details
    addedById: {
        type: String,
        required: false,
    },
    organisationId: {
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

    // Issues

});
// compile schema to model
module.exports = mongoose.model("employees", employeeSchema, "employees");
