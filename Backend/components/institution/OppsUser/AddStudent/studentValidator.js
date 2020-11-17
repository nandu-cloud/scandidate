const Joi = require("joi");

const addStudentSchema = Joi.object({
  firstName: Joi.string().required().min(4),
  lastName: Joi.string().required(),
  roll: Joi.string().required(),
  yearOfJoining: Joi.number().required(),
  yearOfPassout: Joi.number().required(),
  studentType: Joi.string().required(),
  addedById: Joi.string().required().min(24).max(24).empty(""),
  instituteId: Joi.string().required().min(24).max(24).empty(""),
  adharNumber: Joi.number(),
  intitutionName: Joi.string(),

  state: Joi.string().allow("").allow(null),
  landMark: Joi.string().allow("").allow(null),
  city: Joi.string().allow("").allow(null),
  zipCode: Joi.number().allow("").allow(null),
  dateOfBirth: Joi.date().allow("").allow(null),
  email: Joi.string().email().allow("").allow(null),
  phoneNumber: Joi.number().allow("").allow(null),
  nameOfCourse: Joi.string().allow("").allow(null),
  address: Joi.string().allow("").allow(null),
  extraActivity: Joi.string().allow("").allow(null),
  extraActivityDocumentName: Joi.string().allow("").allow(null),
  noOfEductionalDocuments: Joi.number().allow("").allow(null),
  eductionalDocumentNames: Joi.array().allow("").allow(null),
  purposeOfFile: Joi.array().allow('').allow(null)
});

const updateStudentSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  roll: Joi.string().required(),
  yearOfJoining: Joi.number().required(),
  yearOfPassout: Joi.number().required(),
  studentType: Joi.string().required(),
  addedById: Joi.string().required().min(24).max(24),
  instituteId: Joi.string().required().min(24).max(24).empty(""),
  intitutionName: Joi.string().required(),

  state: Joi.string().allow("").allow(null),
  landMark: Joi.string().allow("").allow(null),
  city: Joi.string().allow("").allow(null),
  zipCode: Joi.number().allow("").allow(null),
  adharNumber: Joi.number().allow("").allow(null),
  dateOfBirth: Joi.date().allow("").allow(null),
  email: Joi.string().email().allow("").allow(null),
  phoneNumber: Joi.number().allow("").allow(null),
  nameOfCourse: Joi.string().allow("").allow(null),
  address: Joi.string().allow("").allow(null),
  extraActivity: Joi.string().allow("").allow(null),
  extraActivityDocumentName: Joi.string().allow("").allow(null),
  noOfEductionalDocuments: Joi.number().allow("").allow(null),
  eductionalDocumentNames: Joi.array().allow("").allow(null),
  purposeOfFile: Joi.array().allow('').allow(null)
});

module.exports = {
  addStudentSchema: addStudentSchema,
  updateStudentSchema: updateStudentSchema,
};
