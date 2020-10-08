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
  extraActivityDocumentName:Joi.string(),
  noOfEductionalDocuments: Joi.number(),
  eductionalDocumentNames: Joi.array(),
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
  extraActivity: Joi.string(),
  extraActivityDocumentName:Joi.string(),
  noOfEductionalDocuments: Joi.number(),
  eductionalDocumentNames: Joi.array(),
  addedById:Joi.string().min(24).max(24).empty(""),
});

module.exports = {
  addStudentSchema: addStudentSchema,
  updateStudentSchema:updateStudentSchema,
};
