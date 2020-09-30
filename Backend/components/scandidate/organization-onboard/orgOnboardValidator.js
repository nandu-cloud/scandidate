const Joi = require("joi");

const organisationCreationSchema = Joi.object({
  organizationName: Joi.string().min(1),
  contactPersonName: Joi.string().min(1),
  organisationAddress: Joi.string().required(),
  organisationType: Joi.string().required(),
  organisationEmail: Joi.string().email().required(),
  organisationEmployeeSize: Joi.string(),
  organisationZIP: Joi.number(),
  organisationActiveFrom: Joi.date().required(),
  organisationDescription: Joi.string(),
  status: Joi.boolean().required(),
  contact: Joi.number(),
  code: Joi.string(),
  organisationLogo: Joi.string(),

  legalEntityName:Joi.string(),
  organizationLocation:Joi.string(),
  state:Joi.string(),
  headQuaterLocation:Joi.string(),
  organizationGstn:Joi.string(),
  organizationCin:Joi.string(),

});

const organisationUpdationSchema = Joi.object({
  organizationName: Joi.string().min(1),
  contactPersonName: Joi.string().min(1),
  organisationAddress: Joi.string().required(),
  organisationType: Joi.string().required(),
  organisationEmail: Joi.string().email().required(),
  organisationEmployeeSize: Joi.string(),
  organisationZIP: Joi.number(),
  organisationActiveFrom: Joi.date().required(),
  organisationDescription: Joi.string(),
  status: Joi.boolean().required(),
  contact: Joi.number(),
  code: Joi.string(),
  organisationLogo: Joi.string(),
  legalEntityName:Joi.string(),
  organizationLocation:Joi.string(),
  state:Joi.string(),
  headQuaterLocation:Joi.string(),
  organizationGstn:Joi.string(),
  organizationCin:Joi.string(),
});

module.exports = {
  organisationCreationSchema: organisationCreationSchema,
  organisationUpdationSchema: organisationUpdationSchema,
};
