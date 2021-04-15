const Joi = require('joi');

const contactUsCreationSchema = Joi.object({
    firstName: Joi.string().required().messages({ 'any.required': 'First name is required' }),
    lastName: Joi.string().required().messages({ 'any.required': 'Last name is required' }),
    email: Joi.string().required().messages({ 'any.required': 'Email is required' }),
    phoneNumber: Joi.number().required().messages({ 'any.required': 'Phone number is required' }),
    organization: Joi.string().required().messages({ 'any.required': 'Organization name is required' }),
    enquiry: Joi.string().required().messages({ 'any.required': 'Enquiry is required' }),
    designation: Joi.string().allow("").allow(null),
});

module.exports = {
    contactUsCreationSchema: contactUsCreationSchema
}