const Joi = require("joi");

const instituteCreationSchema = Joi.object({
  instituteName: Joi.string().required(),
  instituteAddress: Joi.string().required(),
  instituteType: Joi.string().required(),
  instituteEmail: Joi.string().email().required(),
  instituteZIP: Joi.number().required(),
  status: Joi.boolean().required(),

  contactPersonName: Joi.string().min(1),
  instituteStudentSize: Joi.string().allow('').allow(null),
  instituteActiveFrom: Joi.date().allow('').allow(null),
  instituteDescription: Joi.string().allow('').allow(null),
  contact: Joi.number().allow('').allow(null),
  code: Joi.string().allow('').allow(null),
  instituteLogo: Joi.string().allow('').allow(null),
  instituteLocation:Joi.string().allow('').allow(null),
  state:Joi.string().allow('').allow(null),
});


const instituteUpdationSchema = Joi.object({
  instituteName: Joi.string().required(),
  contactPersonName: Joi.string(),
  instituteAddress: Joi.string().required(),
  instituteType: Joi.string().required(),
  instituteEmail: Joi.string().email().required(),
  instituteStudentSize: Joi.string().allow('').allow(null),
  instituteActiveFrom: Joi.date().allow('').allow(null),
  instituteZIP: Joi.number().required(),
  instituteDescription: Joi.string().allow('').allow(null),
  status: Joi.boolean().required(),
  contact: Joi.number().allow('').allow(null),
  code: Joi.string().allow('').allow(null),
  instituteLogo: Joi.string().allow('').allow(null),
  instituteLocation:Joi.string().allow('').allow(null),
  state:Joi.string().allow('').allow(null),
});

module.exports = {
  instituteCreationSchema: instituteCreationSchema,
  instituteUpdationSchema: instituteUpdationSchema,
};
