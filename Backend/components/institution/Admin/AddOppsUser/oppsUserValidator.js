const Joi = require("joi");

const userCreationSchema = Joi.object({
  organizationId: Joi.string().min(24).max(24).empty(""),
  institutionId: Joi.string().min(24).max(24).empty(""),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string().uppercase().required(),
  subRole: Joi.string().uppercase().required(),
  email: Joi.string().email().required(),
  password: Joi.string(),
  phoneNumber: Joi.number(),
  dateOfBirth: Joi.date(),
  employeeId: Joi.string(),
  currentAddress: Joi.string(),
  permanentAddress: Joi.string(),
  aboutMe: Joi.string(),
  avatarLink: Joi.string(),
  noOfAssociatedUsers: Joi.number(),
  onboardedById: Joi.string().min(24).max(24),
  status: Joi.boolean().required(),
});

const updationSchema = Joi.object({
  organizationId: Joi.string().min(24).max(24).empty(""),
  institutionId: Joi.string().min(24).max(24).empty(""),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string().required(),
  subRole: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.number(),
  dateOfBirth: Joi.date(),
  employeeId: Joi.string(),
  currentAddress: Joi.string(),
  permanentAddress: Joi.string(),
  aboutMe: Joi.string().empty(""),
  avatarLink: Joi.string(),
  noOfAssociatedUsers: Joi.number(),
  onboardedById: Joi.string().min(24).max(24),
  status: Joi.boolean().required(),
});

module.exports = {
  userCreationSchema: userCreationSchema,
  updationSchema: updationSchema,
};
