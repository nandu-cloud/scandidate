const Joi = require("joi");

const organisationCreationSchema = Joi.object({

  organizationName: Joi.string().required(),//
  organisationEmail: Joi.string().email().required(),//
  organisationType: Joi.string().required(),//
  status: Joi.boolean().required(),//
  organisationZIP: Joi.number().required(),//

  contactPersonName: Joi.string().allow('').allow(null),
  organisationAddress: Joi.string().allow('').allow(null),  
  organisationEmployeeSize: Joi.string().allow('').allow(null),
  organisationActiveFrom: Joi.date().allow('').allow(null),
  organisationDescription: Joi.string().allow('').allow(null),
  contact: Joi.number().allow('').allow(null),
  code: Joi.string().allow('').allow(null),
  organisationLogo: Joi.string().allow('').allow(null),
  legalEntityName:Joi.string().allow('').allow(null),
  organizationLocation:Joi.string().allow('').allow(null),
  state:Joi.string().allow('').allow(null),
  headQuaterLocation:Joi.string().allow('').allow(null),
  organizationGstn:Joi.string().allow('').allow(null),
  organizationCin:Joi.string().allow('').allow(null),

});

const organisationUpdationSchema = Joi.object({
  organizationName: Joi.string().required(),//
  organisationEmail: Joi.string().email().required(),//
  organisationType: Joi.string().required(),//
  status: Joi.boolean().required(),//
  organisationZIP: Joi.number().required(),//

  contactPersonName: Joi.string().allow('').allow(null),
  organisationAddress: Joi.string().allow('').allow(null),  
  organisationEmployeeSize: Joi.string().allow('').allow(null),
  organisationActiveFrom: Joi.date().allow('').allow(null),
  organisationDescription: Joi.string().allow('').allow(null),
  contact: Joi.number().allow('').allow(null),
  code: Joi.string().allow('').allow(null),
  organisationLogo: Joi.string().allow('').allow(null),
  legalEntityName:Joi.string().allow('').allow(null),
  organizationLocation:Joi.string().allow('').allow(null),
  state:Joi.string().allow('').allow(null),
  headQuaterLocation:Joi.string().allow('').allow(null),
  organizationGstn:Joi.string().allow('').allow(null),
  organizationCin:Joi.string().allow('').allow(null),
});

module.exports = {
  organisationCreationSchema: organisationCreationSchema,
  organisationUpdationSchema: organisationUpdationSchema,
};
