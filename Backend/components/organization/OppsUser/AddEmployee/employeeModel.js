const { boolean, string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// schema
const employeeSchema = new mongoose.Schema({
  //Presonal Info
  firstName: {
    type: String,
    required: [true, "first name cannot be empty"],
  },
  lastName: {
    type: String,
    required: [true, "last name cannot be empty"],
  },
  employeeId: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
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
  zipCode: {
    type: Number,
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
    required: [true, "Phone Number cannot be empty"],
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
    required: true,
  },
  dateOfJoining: {
    type: Date,
    required: [true, "Date Of Joining cannot be empty"],
  },
  exitDate: {
    type: Date,
    required: [true, "Date Of Exit cannot be empty"],
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

  // volume: {
  //   type: Number,
  //   required: false
  // },
  // quality: {
  //   type: Number,
  //   required: false
  // },
  // consistency: {
  //   type: Number,
  //   required: false
  // },
  // building: {
  //   type: Number,
  //   required: false
  // },
  // stakeholder: {
  //   type: Number,
  //   required: false
  // },

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
  },

  reasonForSerperation: {
    IsSelect: {
      type: String,
      required: false,
    },
    reason: {
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
    period: {
      type: Date,
      required: false,
    },
    causeActionTaken: {
      type: String,
      required: false,
    },
    uploadDocument: {
      type: String,
      required: false,
    },
  },

  compliencyDiscrepancy: {
    IsSelect: {
      type: Boolean,
      required: false,
    },
    period: {
      type: Date,
      required: false,
    },
    causeActionTaken: {
      type: String,
      required: false,
    },
    uploadDocument: {
      type: String,
      required: false,
    },
  },

  warning: {
    IsSelect: {
      type: Boolean,
      required: false,
    },
    period: {
      type: Date,
      required: false,
    },
    causeActionTaken: {
      type: String,
      required: false,
    },
    uploadDocument: {
      type: String,
      required: false,
    },
  },

  showCausedIssue: {
    IsSelect: {
      type: Boolean,
      required: false,
    },
    period: {
      type: Date,
      required: false,
    },
    causeActionTaken: {
      type: String,
      required: false,
    },
    uploadDocument: {
      type: String,
      required: false,
    },
  },
  suspension: {
    IsSelect: {
      type: Boolean,
      required: false,
    },
    period: {
      type: Date,
      required: false,
    },
    causeActionTaken: {
      type: String,
      required: false,
    },
    uploadDocument: {
      type: String,
      required: false,
    },
  },
  termination: {
    IsSelect: {
      type: Boolean,
      required: false,
    },
    period: {
      type: Date,
      required: false,
    },
    causeActionTaken: {
      type: String,
      required: false,
    },
    uploadDocument: {
      type: String,
      required: false,
    },
  },
});
// compile schema to model
module.exports = mongoose.model("employees", employeeSchema, "employees");
