const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const saveEmployee = new Schema({
  //Presonal Info
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  employeeId: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    required: false,
  },
  department: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  pinCode: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  landMark: {
    type: String,
    required: false,
  },

  dateOfBirth: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  adharNumber: {
    type: String,
    required: false,
  },
  panNumber: {
    type: String,
    required: false,
  },
  organizationName: {
    type: String,
    required: false,
  },
  dateOfJoining: {
    type: Date,
    required: false,
  },
  exitDate: {
    type: Date,
    required: false,
  },
  professionalExperience: {
    type: String,
    // required: [true, "Professional Experience Cannot Be Empty"],
    required: false,
  },
  //Work Ethic
  selfDriven: {
    type: Number,
    required: false,
  },
  creativity: {
    type: Number,
    required: false,
  },
  informalOrganizationSenseOfBelonging: {
    type: Number,
    required: false,
  },
  initiative: {
    type: Number,
    required: false,
  },
  workIndependenty: {
    type: Number,
    required: false,
  },
  teamWork: {
    type: Number,
    required: false,
  },
  dealConstructivelyWithPressure: {
    type: Number,
    required: false,
  },

  // performance
  volume: {
    IsSelect: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
    },
  },
  quality: {
    IsSelect: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
    },
  },
  consistency: {
    IsSelect: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
    },
  },
  building: {
    IsSelect: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
    },
  },
  stakeholder: {
    IsSelect: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
    },
  },

  empThrive: {
    type: String,
    required: false,
  },
  inLeadership: {
    type: String,
    required: false,
  },
  otherInfo: {
    type: String,
    required: false,
  },

  //Conduct
  punctuality: {
    type: Number,
    required: false,
  },
  discipline: {
    type: Number,
    required: false,
  },

  //Merit-Quality
  academicKnowledge: {
    type: Number,
    required: false,
  },
  productKnowledge: {
    type: Number,
    required: false,
  },
  industryKnowledge: {
    type: Number,
    required: false,
  },
  communicationSkills: {
    type: Number,
    required: false,
  },

  keySkills: {
    type: String,
    required: false,
  },

  rehireAgain: {
    type: String,
    required: false,
  },

  awards: {
    IsSelect: {
      type: String,
      required: false,
    },
    remarks: {
      type: String,
      required: false,
    },
    documentName: {
      type: String,
      required: false,
    },
    documentUpload: {
      type: String,
      required: false,
    },
    originalFilename: {
      type: String,
      required: false,
    },
  },

  reasonForSerperation: {
    IsSelect: {
      type: String,
      required: false,
    },
    voluntaryReason: {
      type: String,
      required: false,
    },
    inVoluntaryReason: {
      type: String,
      required: false,
    },
  },

  //Other Details
  addedById: {
    type: String,
    required: false,
  },
  organisationId: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },

  // Issues
  discrepancyDocuments: {
    IsSelect: {
      type: Boolean,
      required: false,
    },
    descrepencyPeriod: {
      type: Date,
      required: false,
    },
    descrepencyCauseActionTaken: {
      type: String,
      required: false,
    },
    descrepencyUploadDocument: {
      type: String,
      required: false,
    },
    originalFilename: {
      type: String,
      required: false,
    },
  },

  compliencyDiscrepancy: {
    IsSelect: {
      type: Boolean,
      required: false,
    },
    compliencyPeriod: {
      type: Date,
      required: false,
    },
    compliencyCauseActionTaken: {
      type: String,
      required: false,
    },
    compliencyUploadDocument: {
      type: String,
      required: false,
    },
    originalFilename: {
      type: String,
      required: false,
    },
  },

  warning: {
    IsSelect: {
      type: Boolean,
      required: false,
    },
    warningPeriod: {
      type: Date,
      required: false,
    },
    warningCauseActionTaken: {
      type: String,
      required: false,
    },
    warningUploadDocument: {
      type: String,
      required: false,
    },
    originalFilename: {
      type: String,
      required: false,
    },
  },

  showCausedIssue: {
    IsSelect: {
      type: Boolean,
      required: false,
    },
    showCausedPeriod: {
      type: Date,
      required: false,
    },
    showCausedCauseActionTaken: {
      type: String,
      required: false,
    },
    showCausedUploadDocument: {
      type: String,
      required: false,
    },
    originalFilename: {
      type: String,
      required: false,
    },
  },
  suspension: {
    IsSelect: {
      type: Boolean,
      required: false,
    },
    suspensionPeriod: {
      type: Date,
      required: false,
    },
    suspensionCauseActionTaken: {
      type: String,
      required: false,
    },
    suspensionUploadDocument: {
      type: String,
      required: false,
    },
    originalFilename: {
      type: String,
      required: false,
    },
  },
  termination: {
    IsSelect: {
      type: Boolean,
      required: false,
    },
    terminationPeriod: {
      type: Date,
      required: false,
    },
    terminationCauseActionTaken: {
      type: String,
      required: false,
    },
    terminationUploadDocument: {
      type: String,
      required: false,
    },
    originalFilename: {
      type: String,
      required: false,
    },
  },
  status: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("saveNowEmployee", saveEmployee);