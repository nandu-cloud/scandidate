const Joi = require("joi");

const addEmployeeSchema = Joi.object({
  //Required Fields
  firstName: Joi.string().allow("").allow(null),
  lastName: Joi.string().allow("").allow(null),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().allow("").allow(null),
  dateOfJoining: Joi.date().allow("").allow(null),
  exitDate: Joi.date().allow("").allow(null),
  addedById: Joi.string().allow("").allow(null),
  assignedId: Joi.string().allow("").allow(null),
  organisationId: Joi.string().allow("").allow(null),
  organizationName: Joi.string().allow("").allow(null),
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
  dateOfBirth: Joi.string().allow("").allow(null),
  adharNumber: Joi.string().allow("").allow(null),
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
  candidateOrganisationId: Joi.string().allow("").allow(null),
  bgvCandidate: Joi.boolean().allow(null).allow(""),
  hrorganisationId: Joi.string().min(24).max(24).allow(null).allow(""),
  dateOfVerification: Joi.date().allow(null).allow(""),
  personalIdentity: Joi.string().allow("").allow(null),
  criminal: Joi.string().allow("").allow(null),
  verificationAddress: Joi.string().allow("").allow(null),
  drugsAndSubstanceAbuse: Joi.string().allow("").allow(null),
  salarySlipCTCdocument: Joi.string().allow("").allow(null),
});

const addStudentSchema = Joi.object({
  firstName: Joi.string().allow("").allow(null),
  lastName: Joi.string().allow("").allow(null),
  roll: Joi.string().allow("").allow(null),
  yearOfJoining: Joi.string().allow("").allow(null),
  yearOfPassout: Joi.string().allow("").allow(null),
  studentType: Joi.string().allow("").allow(null),
  nameOfCourse: Joi.string().allow("").allow(null),

  addedById: Joi.string().allow("").allow(null),
  instituteId: Joi.string().allow("").allow(null),
  intitutionName: Joi.string().allow("").allow(null),
  adharNumber: Joi.string().allow("").allow(null),
  state: Joi.string().allow("").allow(null),
  landMark: Joi.string().allow("").allow(null),
  city: Joi.string().allow("").allow(null),
  zipCode: Joi.number().allow("").allow(null),
  dateOfBirth: Joi.string().allow("").allow(null),
  email: Joi.string().email().allow("").allow(null),
  phoneNumber: Joi.string().allow("").allow(null),

  address: Joi.string().allow("").allow(null),
  extraActivity: Joi.string().allow("").allow(null),
  extraActivityDocumentName: Joi.string().allow("").allow(null),
  noOfEductionalDocuments: Joi.number().allow("").allow(null),
  eductionalDocumentNames: Joi.array().allow("").allow(null),
  originalFilename: Joi.string().allow("").allow(null),
  originalFilenames: Joi.array().allow("").allow(null),
  purposeOfFile: Joi.array().allow("").allow(null),

  // CANDIDATE
  nameofFeedbackProvider: Joi.string().allow("").allow(null),
  designationOfFeedbackProvider: Joi.string().allow("").allow(null),
  candidateInstituteId: Joi.string().min(24).max(24).empty(""),
  bgvCandidate: Joi.boolean().allow(null).allow(""),
  hrorganisationId: Joi.string().min(24).max(24).allow(null).allow(""),
  dateOfVerification: Joi.date().allow(null).allow(""),
  personalIdentity: Joi.string().allow("").allow(null),
  criminal: Joi.string().allow("").allow(null),
  verificationAddress: Joi.string().allow("").allow(null),
  drugsAndSubstanceAbuse: Joi.string().allow("").allow(null),
});

module.exports = {
  addEmployeeSchema: addEmployeeSchema,
  addStudentSchema: addStudentSchema,
};
