const Joi = require("joi");

const userCreationSchema = Joi.object({
  organizationId: Joi.string().min(24).max(24).empty(""),
  institutionId: Joi.string().min(24).max(24).empty(""),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string().required(),
  subRole: Joi.string().required(),
  email: Joi.string().email().required(),
  status: Joi.boolean().required(),
  password: Joi.string(),

  scandidateId: Joi.string().allow("").allow(null),
  phoneNumber: Joi.number().allow("").allow(null),
  countrycode: Joi.number().allow("").allow(null),
  dateOfBirth: Joi.date().allow("").allow(null),
  employeeId: Joi.string().allow("").allow(null),
  currentAddress: Joi.string().allow("").allow(null),
  permanentAddress: Joi.string().allow("").allow(null),
  aboutMe: Joi.string().allow("").allow(null),
  avatarLink: Joi.string().allow("").allow(null),
  noOfAssociatedUsers: Joi.number().allow("").allow(null),
  onboardedById: Joi.string().min(24).max(24),
});

const updationSchema = Joi.object({
  organizationId: Joi.string().min(24).max(24).empty(""),
  institutionId: Joi.string().min(24).max(24).empty(""),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string().required(),
  subRole: Joi.string().required(),
  email: Joi.string().email().required(),
  status: Joi.boolean().required(),

  scandidateId: Joi.string().allow("").allow(null),
  phoneNumber: Joi.number().allow("").allow(null),
  countrycode: Joi.number().allow("").allow(null),
  dateOfBirth: Joi.date().allow("").allow(null),
  employeeId: Joi.string().allow("").allow(null),
  currentAddress: Joi.string().allow("").allow(null),
  permanentAddress: Joi.string().allow("").allow(null),
  aboutMe: Joi.string().allow("").allow(null),
  avatarLink: Joi.string().allow("").allow(null),
  noOfAssociatedUsers: Joi.number().allow("").allow(null),
  onboardedById: Joi.string().min(24).max(24),
});

module.exports = {
  userCreationSchema: userCreationSchema,
  updationSchema: updationSchema,
};
