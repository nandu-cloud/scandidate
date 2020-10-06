const Joi = require("joi");

const addStudentSchema = Joi.object({
  
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  roll: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.number(),
  nameOfCourse:Joi.string(),
  yearOfJoining: Joi.date(),
  yearOfPassout:Joi.date(),
  studentType: Joi.string(),
  address: Joi.string(),
  extraActivity: Joi.boolean(),
  documentLink: Joi.string(),
  noOfEductionalDocuments: Joi.number(),
  eductionalDocumentLinks: Joi.string(),
});

module.exports = {
  addStudentSchema: addStudentSchema,
};
