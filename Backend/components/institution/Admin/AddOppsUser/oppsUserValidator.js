const Joi = require("joi");

const userCreationSchema = Joi.object({

  organizationId: Joi.string().allow('').allow(null),
  institutionId: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string().uppercase().required(),
  subRole: Joi.string().uppercase().required(),
  email: Joi.string().email().required(),
  password: Joi.string(),

  phoneNumber: Joi.number().integer().greater(6000000000).max(9999999999).required().error(new Error('Phone number is invalid or missing')),
  dateOfBirth: Joi.date().allow('').allow(null),
  employeeId: Joi.string().allow('').allow(null),
  currentAddress: Joi.string().allow('').allow(null),
  permanentAddress: Joi.string().allow('').allow(null),
  aboutMe: Joi.string().allow('').allow(null),
  avatarLink: Joi.string().allow('').allow(null),
  noOfAssociatedUsers: Joi.number().allow('').allow(null),
  onboardedById: Joi.string().required(),
  status: Joi.boolean().required().allow('').allow(null),
});

const updationSchema = Joi.object({
  organizationId: Joi.string().allow('').allow(null),
  institutionId: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string().uppercase().required(),
  subRole: Joi.string().uppercase().required(),
  email: Joi.string().email().required(),

  phoneNumber: Joi.number().integer().greater(6000000000).max(9999999999).required().error(new Error('Phone number is invalid or missing')),
  dateOfBirth: Joi.date().allow('').allow(null),
  employeeId: Joi.string().allow('').allow(null),
  currentAddress: Joi.string().allow('').allow(null),
  permanentAddress: Joi.string().allow('').allow(null),
  aboutMe: Joi.string().allow('').allow(null),
  avatarLink: Joi.string().allow('').allow(null),
  noOfAssociatedUsers: Joi.number().allow('').allow(null),
  onboardedById: Joi.string().required(),
  status: Joi.boolean().required().allow('').allow(null),
});

module.exports = {
  userCreationSchema: userCreationSchema,
  updationSchema: updationSchema,
};
