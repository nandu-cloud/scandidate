const Joi = require("joi");

const organisationCreationSchema = Joi.object({
  organizationName: Joi.string().required(), //
  organisationEmail: Joi.string().email(), //
  organisationType: Joi.string(), //
  status: Joi.boolean().required(), //
  organisationZIP: Joi.number(), //
  contactPersonName: Joi.string(),
  legalEntityName: Joi.string(),
  contact: Joi.number(),
  headQuaterLocation: Joi.string(),
  organisationAddress: Joi.string(),
  state: Joi.string(),
  organizationLocation: Joi.string(),

  landMark: Joi.string().allow("").allow(null),
  organisationEmployeeSize: Joi.string().allow("").allow(null),
  organisationActiveFrom: Joi.string().allow("").allow(null),
  organisationDescription: Joi.string().allow("").allow(null),
  code: Joi.string().allow("").allow(null),
  organisationLogo: Joi.string().allow("").allow(null),
  organizationLocation: Joi.string().allow("").allow(null),
  organizationGstn: Joi.string().allow("").allow(null),
  organizationCin: Joi.string().allow("").allow(null),
  panNumber: Joi.string().allow("").allow(null),
  scandiate: Joi.boolean().allow(null),
});

const organisationUpdationSchema = Joi.object({
  organizationName: Joi.string().required(), //
  organisationEmail: Joi.string().email(), //
  organisationType: Joi.string(), //
  status: Joi.boolean().required(), //
  organisationZIP: Joi.number(), //
  contactPersonName: Joi.string(),
  legalEntityName: Joi.string(),
  contact: Joi.number(),
  headQuaterLocation: Joi.string(),
  organisationAddress: Joi.string(),
  state: Joi.string(),
  organizationLocation: Joi.string(),

  landMark: Joi.string().allow("").allow(null),
  contactPersonName: Joi.string().allow("").allow(null),
  organisationAddress: Joi.string().allow("").allow(null),
  organisationEmployeeSize: Joi.string().allow("").allow(null),
  organisationActiveFrom: Joi.string().allow("").allow(null),
  organisationDescription: Joi.string().allow("").allow(null),
  contact: Joi.number().allow("").allow(null),
  code: Joi.string().allow("").allow(null),
  organisationLogo: Joi.string().allow("").allow(null),
  legalEntityName: Joi.string().allow("").allow(null),
  organizationLocation: Joi.string().allow("").allow(null),
  state: Joi.string().allow("").allow(null),
  headQuaterLocation: Joi.string().allow("").allow(null),
  organizationGstn: Joi.string().allow("").allow(null),
  organizationCin: Joi.string().allow("").allow(null),
  panNumber: Joi.string().allow("").allow(null),
  scandiate: Joi.boolean().allow(null),
});

module.exports = {
  organisationCreationSchema: organisationCreationSchema,
  organisationUpdationSchema: organisationUpdationSchema,
};
