const Joi = require("joi");

const instituteCreationSchema = Joi.object({
  instituteName: Joi.string(),
  instituteAddress: Joi.string(),
  instituteType: Joi.string(),
  instituteEmail: Joi.string().email(),
  instituteZIP: Joi.number(),
  status: Joi.boolean(),
  contact: Joi.number(),
  state: Joi.string(),

  landMark: Joi.string().allow("").allow(null),
  contactPersonName: Joi.string().min(1),
  instituteStudentSize: Joi.string().allow("").allow(null),
  instituteActiveFrom: Joi.string().allow("").allow(null),
  instituteDescription: Joi.string().allow("").allow(null),
  code: Joi.string().allow("").allow(null),
  instituteLogo: Joi.string().allow("").allow(null),
  instituteLocation: Joi.string().allow("").allow(null),
  scandiate: Joi.boolean().allow(null),
});

const instituteUpdationSchema = Joi.object({
  instituteName: Joi.string(),
  contactPersonName: Joi.string(),
  instituteAddress: Joi.string(),
  instituteType: Joi.string(),
  instituteEmail: Joi.string().email(),
  instituteStudentSize: Joi.string().allow("").allow(null),
  instituteActiveFrom: Joi.string().allow("").allow(null),
  instituteZIP: Joi.number(),
  instituteDescription: Joi.string().allow("").allow(null),
  status: Joi.boolean(),
  contact: Joi.number(),
  state: Joi.string(),

  landMark: Joi.string().allow("").allow(null),
  code: Joi.string().allow("").allow(null),
  instituteLogo: Joi.string().allow("").allow(null),
  instituteLocation: Joi.string().allow("").allow(null),
  scandiate: Joi.boolean().allow(null),
});

module.exports = {
  instituteCreationSchema: instituteCreationSchema,
  instituteUpdationSchema: instituteUpdationSchema,
};
