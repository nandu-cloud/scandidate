const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contactUs = new Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    phoneNumber: {
        type: Number,
        required: [true, "Phone number is required"]
    },
    designation: {
        type: String,
        required: false
    },
    organization: {
        type: String,
        required: [true, "Organization name is required"]
    },
    enquiry: {
        type: String,
        required: [true, "Inquiry is required"]
    }
}, { timestamps: true })

module.exports = mongoose.model("ContactUs", contactUs);