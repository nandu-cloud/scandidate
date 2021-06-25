const Joi = require("joi");

const addStudentSchema = Joi.object({
  firstName: Joi.string().required().min(4),
  lastName: Joi.string().required(),
  roll: Joi.string().required(),
  yearOfJoining: Joi.string().required(),
  yearOfPassout: Joi.string().required(),
  studentType: Joi.string()
    .required()
    .messages({ "any.required": "Student type is required" }),
  nameOfCourse: Joi.string().required(),

  addedById: Joi.string().required().min(24).max(24).empty(""),
  instituteId: Joi.string().required().min(24).max(24).empty(""),
  intitutionName: Joi.string(),
  adharNumber: Joi.string().allow("").allow(null),
  state: Joi.string().allow("").allow(null),
  landMark: Joi.string().allow("").allow(null),
  city: Joi.string().allow("").allow(null),
  zipCode: Joi.number().allow("").allow(null),
  dateOfBirth: Joi.string().allow("").allow(null),
  email: Joi.string().email().allow("").allow(null),
  phoneNumber: Joi.string().allow("").allow(null),

  address: Joi.string().allow("").allow(null),
  extraActivity: Joi.string().allow("").allow(null),
  extraActivityDocumentName: Joi.string().allow("").allow(null),
  noOfEductionalDocuments: Joi.number().allow("").allow(null),
  eductionalDocumentNames: Joi.array().allow("").allow(null),
  originalFilename: Joi.string().allow("").allow(null),
  originalFilenames: Joi.array().allow("").allow(null),
  purposeOfFile: Joi.array().allow("").allow(null),
  status: Joi.boolean().allow("").allow(null),

  // CANDIDATE
  nameofFeedbackProvider: Joi.string().allow("").allow(null),
  designationOfFeedbackProvider: Joi.string().allow("").allow(null),
  institutionlocation: Joi.string().allow("").allow(null),
  bgvCandidate: Joi.boolean().allow(null).allow(""),
  hrorganisationId: Joi.string().min(24).max(24).allow(null).allow(""),
  dateOfVerification: Joi.date().allow(null).allow(""),
  verifiedFor: Joi.string().allow("").allow(null),
  personalIdentity: Joi.string().allow("").allow(null),
  criminal: Joi.string().allow("").allow(null),
  verificationAddress: Joi.string().allow("").allow(null),
  drugsAndSubstanceAbuse: Joi.string().allow("").allow(null),
});

const updateStudentSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  roll: Joi.string().required(),
  yearOfJoining: Joi.string().required(),
  yearOfPassout: Joi.string().required(),
  studentType: Joi.string()
    .required()
    .messages({ "any.required": "Student type is required" }),
  nameOfCourse: Joi.string().required(),

  addedById: Joi.string().required().min(24).max(24),
  instituteId: Joi.string().required().min(24).max(24).empty(""),
  intitutionName: Joi.string().required(),

  state: Joi.string().allow("").allow(null),
  landMark: Joi.string().allow("").allow(null),
  city: Joi.string().allow("").allow(null),
  zipCode: Joi.number().allow("").allow(null),
  adharNumber: Joi.string().allow("").allow(null),
  dateOfBirth: Joi.string().allow("").allow(null),
  email: Joi.string().email().allow("").allow(null),
  phoneNumber: Joi.string().allow("").allow(null),
  address: Joi.string().allow("").allow(null),
  extraActivity: Joi.string().allow("").allow(null),
  extraActivityDocumentName: Joi.string().allow("").allow(null),
  noOfEductionalDocuments: Joi.number().allow("").allow(null),
  eductionalDocumentNames: Joi.array().allow("").allow(null),
  originalFilename: Joi.string().allow("").allow(null),
  originalFilenames: Joi.array().allow("").allow(null),
  purposeOfFile: Joi.array().allow("").allow(null),
  status: Joi.boolean().allow("").allow(null),

  // CANDIDATE
  nameofFeedbackProvider: Joi.string().allow("").allow(null),
  designationOfFeedbackProvider: Joi.string().allow("").allow(null),
  institutionlocation: Joi.string().allow("").allow(null),
  bgvCandidate: Joi.boolean().allow(null).allow(""),
  hrorganisationId: Joi.string().min(24).max(24).allow(null).allow(""),
  dateOfVerification: Joi.date().allow(null).allow(""),
  verifiedFor: Joi.string().allow("").allow(null),
  personalIdentity: Joi.string().allow("").allow(null),
  criminal: Joi.string().allow("").allow(null),
  verificationAddress: Joi.string().allow("").allow(null),
  drugsAndSubstanceAbuse: Joi.string().allow("").allow(null),
});

module.exports = {
  addStudentSchema: addStudentSchema,
  updateStudentSchema: updateStudentSchema,
};
