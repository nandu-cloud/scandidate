const Joi = require("joi");

const hrpartnerCreateValidator = Joi.object({
  hrorganizationname: Joi.string().required(), //
  hrorganisationEmail: Joi.string().email().required(), //
  hrorganisationType: Joi.string().required(), //
  status: Joi.boolean().required(), //
  hrorganisationZIP: Joi.number().required(), //
  hrcontactPersonName: Joi.string().required(),
  legalEntityName: Joi.string().required(),
  contact: Joi.number().required(),
  headQuaterLocation: Joi.string().required(),
  hrorganisationAddress: Joi.string().required(),
  state: Joi.string().required(),
  hrorganizationLocation: Joi.string().required(),

  landMark: Joi.string().allow("").allow(null),
  hrorganisationEmployeeSize: Joi.string().allow("").allow(null),
  hrorganisationActiveFrom: Joi.string().allow("").allow(null),
  hrorganisationDescription: Joi.string().allow("").allow(null),
  code: Joi.string().allow("").allow(null),
  hrorganisationLogo: Joi.string().allow("").allow(null),
  hrorganizationLocation: Joi.string().allow("").allow(null),
  hrorganizationGstn: Joi.string().allow("").allow(null),
  hrorganizationCin: Joi.string().allow("").allow(null),
  panNumber: Joi.string().allow("").allow(null),
});

const hrpartnerUpdateValidator = Joi.object({
  hrorganizationname: Joi.string().required(), //
  hrorganisationEmail: Joi.string().email().required(), //
  hrorganisationType: Joi.string().required(), //
  status: Joi.boolean().required(), //
  hrorganisationZIP: Joi.number().required(), //
  hrcontactPersonName: Joi.string().required(),
  legalEntityName: Joi.string().required(),
  contact: Joi.number().required(),
  headQuaterLocation: Joi.string().required(),
  hrorganisationAddress: Joi.string().required(),
  state: Joi.string().required(),
  hrorganizationLocation: Joi.string().required(),

  landMark: Joi.string().allow("").allow(null),
  hrorganisationEmployeeSize: Joi.string().allow("").allow(null),
  hrorganisationActiveFrom: Joi.string().allow("").allow(null),
  hrorganisationDescription: Joi.string().allow("").allow(null),
  code: Joi.string().allow("").allow(null),
  hrorganisationLogo: Joi.string().allow("").allow(null),
  hrorganizationLocation: Joi.string().allow("").allow(null),
  hrorganizationGstn: Joi.string().allow("").allow(null),
  hrorganizationCin: Joi.string().allow("").allow(null),
  panNumber: Joi.string().allow("").allow(null),
});

module.exports = {
  hrpartnerCreateValidator: hrpartnerCreateValidator,
  hrpartnerUpdateValidator: hrpartnerUpdateValidator,
};
