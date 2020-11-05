const Joi = require("joi");

const addEmployeeSchema = Joi.object({
  //Required Fields
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.number().required(),
  dateOfJoining: Joi.date().required(),
  exitDate: Joi.date().required(),
  professionalExperience: Joi.number().required(),
  addedById: Joi.string().required(),
  organisationId: Joi.string().required(),
  organizationName: Joi.string().required(),
  discrepancyDocuments: Joi.object().required(),

  awards: Joi.string().allow("").allow(null),
  employeeId: Joi.string().allow("").allow(null),
  role: Joi.string().allow("").allow(null),
  department: Joi.string().allow("").allow(null),
  address: Joi.string().allow("").allow(null),
  dateOfBirth: Joi.date().allow("").allow(null),
  adharNumber: Joi.number().allow("").allow(null),
  panNumber: Joi.string().allow("").allow(null),

  //Work Ethic
  selfDriven: Joi.number().allow("").allow(null),
  creativity: Joi.number().allow("").allow(null),
  informalOrganizationSenseOfBelonging: Joi.number().allow("").allow(null),
  initiative: Joi.number().allow("").allow(null),
  workIndependenty: Joi.number().allow("").allow(null),
  teamWork: Joi.number().allow("").allow(null),
  dealConstructivelyWithPressure: Joi.number().allow("").allow(null),

  //performance
  volume: Joi.number().allow("").allow(null),
  quality: Joi.number().allow("").allow(null),
  consistency: Joi.number().allow("").allow(null),

  //Conduct
  punctuality: Joi.number().allow("").allow(null),
  discipline: Joi.number().allow("").allow(null),

  //Merit-Quality
  academicKnowledge: Joi.number().allow("").allow(null),
  productKnowledge: Joi.number().allow("").allow(null),
  industryKnowledge: Joi.number().allow("").allow(null),
  communicationSkills: Joi.number().allow("").allow(null),

  //Other Variables
});
const updateEmployeeSchema = Joi.object({
  //Required Fields
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.number().required(),
  dateOfJoining: Joi.date().required(),
  exitDate: Joi.date().required(),
  professionalExperience: Joi.number().required(),
  addedById: Joi.string().required(),
  organisationId: Joi.string().required(),
  organizationName: Joi.string().required(),

  awards: Joi.string().allow("").allow(null),
  employeeId: Joi.string().allow("").allow(null),
  role: Joi.string().allow("").allow(null),
  department: Joi.string().allow("").allow(null),
  address: Joi.string().allow("").allow(null),
  dateOfBirth: Joi.date().allow("").allow(null),
  adharNumber: Joi.number().allow("").allow(null),
  panNumber: Joi.string().allow("").allow(null),

  //Work Ethic
  selfDriven: Joi.number().allow("").allow(null),
  creativity: Joi.number().allow("").allow(null),
  informalOrganizationSenseOfBelonging: Joi.number().allow("").allow(null),
  initiative: Joi.number().allow("").allow(null),
  workIndependenty: Joi.number().allow("").allow(null),
  teamWork: Joi.number().allow("").allow(null),
  dealConstructivelyWithPressure: Joi.number().allow("").allow(null),

  //performance
  volume: Joi.number().allow("").allow(null),
  quality: Joi.number().allow("").allow(null),
  consistency: Joi.number().allow("").allow(null),

  //Conduct
  punctuality: Joi.number().allow("").allow(null),
  discipline: Joi.number().allow("").allow(null),

  //Merit-Quality
  academicKnowledge: Joi.number().allow("").allow(null),
  productKnowledge: Joi.number().allow("").allow(null),
  industryKnowledge: Joi.number().allow("").allow(null),
  communicationSkills: Joi.number().allow("").allow(null),
});

module.exports = {
  addEmployeeSchema: addEmployeeSchema,
  updateEmployeeSchema: updateEmployeeSchema,
};
