const Joi = require("joi");

const instituteCreationSchema = Joi.object({
  instituteName: Joi.string().min(1),
  contactPersonName: Joi.string().min(1),
  instituteAddress: Joi.string().required(),
  instituteType: Joi.string().required(),
  instituteEmail: Joi.string().email().required(),
  instituteStudentSize: Joi.string(),
  instituteActiveFrom: Joi.date().required(),
  instituteZIP: Joi.number(),
  instituteDescription: Joi.string(),
  status: Joi.boolean().required(),
  contact: Joi.number(),
  code: Joi.string(),
  instituteLogo: Joi.string(),
  instituteLocation:Joi.string(),
  state:Joi.string(),
});


const instituteUpdationSchema = Joi.object({
  instituteName: Joi.string().min(1),
  contactPersonName: Joi.string().min(1),
  instituteAddress: Joi.string().required(),
  instituteType: Joi.string().required(),
  instituteEmail: Joi.string().email().required(),
  instituteStudentSize: Joi.string(),
  instituteActiveFrom: Joi.date().required(),
  instituteZIP: Joi.number(),
  instituteDescription: Joi.string(),
  status: Joi.boolean().required(),
  contact: Joi.number(),
  code: Joi.string(),
  instituteLogo: Joi.string(),
  instituteLocation:Joi.string(),
  state:Joi.string(),
});

module.exports = {
  instituteCreationSchema: instituteCreationSchema,
  instituteUpdationSchema: instituteUpdationSchema,
};
