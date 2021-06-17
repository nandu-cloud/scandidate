const Joi = require("joi");

const addEmployeeSchema = Joi.object({
  //Required Fields
  firstName: Joi.string()
    .required()
    .messages({ "any.required": "First name is required" }),
  lastName: Joi.string()
    .required()
    .messages({ "any.required": "Last name is required" }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Email is required" }),
  phoneNumber: Joi.string()
    .required()
    .messages({ "any.required": "Phone number is required" }),
  dateOfJoining: Joi.date()
    .required()
    .messages({ "any.required": "Date of joining is required" }),
  exitDate: Joi.date()
    .required()
    .messages({ "any.required": "Date of exit is required" }),
  addedById: Joi.string()
    .required()
    .messages({ "any.required": "Added by name is required" }),
  organisationId: Joi.string().allow("").allow(null),
  organizationName: Joi.string()
    .required()
    .messages({ "any.required": "Organization name is required" }),
  status: Joi.boolean().allow("").allow(null),

  //Issues
  discrepancyDocuments: Joi.object().allow("").allow(null),
  compliencyDiscrepancy: Joi.object().allow("").allow(null),
  warning: Joi.object().allow("").allow(null),
  showCausedIssue: Joi.object().allow("").allow(null),
  suspension: Joi.object().allow("").allow(null),
  termination: Joi.object().allow("").allow(null),

  professionalExperience: Joi.string().allow("").allow(null),
  state: Joi.string().allow("").allow(null),
  landMark: Joi.string().allow("").allow(null),
  city: Joi.string().allow("").allow(null),
  pinCode: Joi.string().allow("").allow(null),
  awards: Joi.object().allow("").allow(null),
  employeeId: Joi.string().allow("").allow(null),
  role: Joi.string().allow("").allow(null),
  department: Joi.string().allow("").allow(null),
  address: Joi.string().allow("").allow(null),
  dateOfBirth: Joi.string().allow(""),
  adharNumber: Joi.string().allow(""),
  panNumber: Joi.string().allow("").allow(null),

  //Work Ethic
  selfDriven: Joi.number().allow("").allow(null),
  creativity: Joi.number().allow("").allow(null),
  informalOrganizationSenseOfBelonging: Joi.number().allow("").allow(null),
  initiative: Joi.number().allow("").allow(null),
  workIndependenty: Joi.number().allow("").allow(null),
  teamWork: Joi.number().allow("").allow(null),
  dealConstructivelyWithPressure: Joi.number().allow("").allow(null),
  reasonForSerperation: Joi.object().allow("").allow(null),
  keySkills: Joi.string().allow("").allow(null),
  rehireAgain: Joi.string().allow("").allow(null),

  //performance
  volume: Joi.object().allow("").allow(null),
  quality: Joi.object().allow("").allow(null),
  consistency: Joi.object().allow("").allow(null),
  building: Joi.object().allow("").allow(null),
  stakeholder: Joi.object().allow("").allow(null),
  empThrive: Joi.string().allow("").allow(null),
  inLeadership: Joi.string().allow("").allow(null),
  otherInfo: Joi.string().allow("").allow(null),

  //Conduct
  punctuality: Joi.number().allow("").allow(null),
  discipline: Joi.number().allow("").allow(null),

  //Merit-Quality
  academicKnowledge: Joi.number().allow("").allow(null),
  productKnowledge: Joi.number().allow("").allow(null),
  industryKnowledge: Joi.number().allow("").allow(null),
  communicationSkills: Joi.number().allow("").allow(null),

  //Other Variables

  // CANDIDATE
  nameofFeedbackProvider: Joi.string().allow("").allow(null),
  designationOfFeedbackProvider: Joi.string().allow("").allow(null),
  candidateOrganisationId: Joi.string().min(24).max(24).allow(null).allow(""),
  bgvCandidate: Joi.boolean().allow(null).allow(""),
  hrorganisationId: Joi.string().min(24).max(24).allow(null).allow(""),
  dateOfVerification: Joi.date().allow(null).allow(""),
  personalIdentity: Joi.boolean().allow("").allow(null),
  criminal: Joi.boolean().allow("").allow(null),
  verificationAddress: Joi.boolean().allow("").allow(null),
  drugsAndSubstanceAbuse: Joi.boolean().allow("").allow(null),
  salarySlipCTCdocument: Joi.boolean().allow("").allow(null),
});
const updateEmployeeSchema = Joi.object({
  //Required Fields
  firstName: Joi.string()
    .required()
    .messages({ "any.required": "First name is required" }),
  lastName: Joi.string()
    .required()
    .messages({ "any.required": "Last name is required" }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Email is required" }),
  phoneNumber: Joi.string()
    .required()
    .messages({ "any.required": "Phone number is required" }),
  dateOfJoining: Joi.date()
    .required()
    .messages({ "any.required": "Date of joining is required" }),
  exitDate: Joi.date()
    .required()
    .messages({ "any.required": "Date of exit is required" }),
  addedById: Joi.string()
    .required()
    .messages({ "any.required": "Added by name is required" }),
  organisationId: Joi.string()
    .required()
    .messages({ "any.required": "Organization name is required" }),
  organizationName: Joi.string()
    .required()
    .messages({ "any.required": "Organization name is required" }),
  status: Joi.boolean().allow("").allow(null),

  professionalExperience: Joi.string().allow("").allow(null),
  state: Joi.string().allow("").allow(null),
  landMark: Joi.string().allow("").allow(null),
  city: Joi.string().allow("").allow(null),
  pinCode: Joi.string().allow("").allow(null),
  awards: Joi.object().allow("").allow(null),
  employeeId: Joi.string().allow("").allow(null),
  role: Joi.string().allow("").allow(null),
  department: Joi.string().allow("").allow(null),
  address: Joi.string().allow("").allow(null),
  dateOfBirth: Joi.string().allow(""),
  adharNumber: Joi.string().allow(""),
  panNumber: Joi.string().allow("").allow(null),

  //Work Ethic
  selfDriven: Joi.number().allow("").allow(null),
  creativity: Joi.number().allow("").allow(null),
  informalOrganizationSenseOfBelonging: Joi.number().allow("").allow(null),
  initiative: Joi.number().allow("").allow(null),
  workIndependenty: Joi.number().allow("").allow(null),
  teamWork: Joi.number().allow("").allow(null),
  dealConstructivelyWithPressure: Joi.number().allow("").allow(null),
  reasonForSerperation: Joi.object().allow("").allow(null),
  keySkills: Joi.string().allow("").allow(null),
  rehireAgain: Joi.string().allow("").allow(null),

  //performance
  volume: Joi.object().allow("").allow(null),
  quality: Joi.object().allow("").allow(null),
  consistency: Joi.object().allow("").allow(null),
  building: Joi.object().allow("").allow(null),
  stakeholder: Joi.object().allow("").allow(null),
  empThrive: Joi.string().allow("").allow(null),
  inLeadership: Joi.string().allow("").allow(null),
  otherInfo: Joi.string().allow("").allow(null),

  //Conduct
  punctuality: Joi.number().allow("").allow(null),
  discipline: Joi.number().allow("").allow(null),

  //Merit-Quality
  academicKnowledge: Joi.number().allow("").allow(null),
  productKnowledge: Joi.number().allow("").allow(null),
  industryKnowledge: Joi.number().allow("").allow(null),
  communicationSkills: Joi.number().allow("").allow(null),

  //Issues
  discrepancyDocuments: Joi.object().allow("").allow(null),
  compliencyDiscrepancy: Joi.object().allow("").allow(null),
  warning: Joi.object().allow("").allow(null),
  showCausedIssue: Joi.object().allow("").allow(null),
  suspension: Joi.object().allow("").allow(null),
  termination: Joi.object().allow("").allow(null),

  // CANDIDATE
  nameofFeedbackProvider: Joi.string().allow("").allow(null),
  designationOfFeedbackProvider: Joi.string().allow("").allow(null),
  candidateOrganisationId: Joi.string().min(24).max(24).allow(null).allow(""),
  bgvCandidate: Joi.boolean().allow(null).allow(""),
  hrorganisationId: Joi.string().min(24).max(24).allow(null).allow(""),
  dateOfVerification: Joi.date().allow(null).allow(""),
  personalIdentity: Joi.boolean().allow("").allow(null),
  criminal: Joi.boolean().allow("").allow(null),
  verificationAddress: Joi.boolean().allow("").allow(null),
  drugsAndSubstanceAbuse: Joi.boolean().allow("").allow(null),
  salarySlipCTCdocument: Joi.boolean().allow("").allow(null),
});

module.exports = {
  addEmployeeSchema: addEmployeeSchema,
  updateEmployeeSchema: updateEmployeeSchema,
};
