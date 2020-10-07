const Joi = require("joi");

const addStudentSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  roll: Joi.string().required(),
  email: Joi.string().email(),
  phoneNumber: Joi.number(),
  nameOfCourse:Joi.string(),
  yearOfJoining: Joi.number(),
  yearOfPassout:Joi.number(),
  studentType: Joi.string(),
  address: Joi.string(),
  extraActivity: Joi.string(),
  extraActivityDocumentLink: Joi.string(),
  extraActivityDocumentName:Joi.string(),
  noOfEductionalDocuments: Joi.number(),
  eductionalDocumentLinks: Joi.string(),
  addedById:Joi.string().min(24).max(24).empty(""),
});


const updateStudentSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  roll: Joi.string().required(),
  email: Joi.string().email(),
  phoneNumber: Joi.number(),
  nameOfCourse:Joi.string(),
  yearOfJoining: Joi.number(),
  yearOfPassout:Joi.number(),
  studentType: Joi.string(),
  address: Joi.string(),
  extraActivity: Joi.boolean(),
  extraActivityDocumentLink: Joi.string(),
  extraActivityNameOfDocument:Joi.string(),
  noOfEductionalDocuments: Joi.number(),
  eductionalDocumentLinks: Joi.string(),
  addedById:Joi.string().min(24).max(24).empty(""),
});

module.exports = {
  addStudentSchema: addStudentSchema,
  updateStudentSchema:updateStudentSchema,
};
