const AppError = require("../../../helpers/appError");
const empDAL = require("../../organization/OppsUser/AddEmployee/employeeDAL");
const orgDAL = require("../../scandidate/organization-onboard/orgOnboardDAL");
const instDAL = require("../../scandidate/institute-onboard/instituteOnboardDAL");
const stdDAL = require("../../institution/OppsUser/AddStudent/studentDAL");
const canddidateDAL = require("./addCandidateDAL");
const empValidator = require("./addCandidateEmpValidator");
const stdValidator = require("./addCandidateStdValidator");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
var pdf = require("html-pdf");

module.exports.saveCandidate = async (req, res, next) => {
  const { bio, candidate, canidateInstitute, verification } = req.body;
  var data = [];
  for (var d of candidate) {
    var r = { ...bio, ...d, ...verification };
    data.push(r);
  }
  var studentBio = {
    firstName: bio.firstName,
    lastName: bio.lastName,
    email: bio.email,
    phoneNumber: bio.phoneNumber,
    dateOfBirth: bio.dateOfBirth,
    adharNumber: bio.adharNumber,
    address: bio.address,
    city: bio.city,
    state: bio.state,
    landMark: bio.landMark,
    zipCode: bio.zipCode,
    addedById: bio.addedById,
    hrorganisationId: bio.hrorganisationId,
  };
  var studentVerification = {
    dateOfVerification: verification.dateOfVerification,
    verifiedFor: verification.verifiedFor,
    personalIdentity: verification.personalIdentity,
    criminal: verification.criminal,
    verificationAddress: verification.verificationAddress,
    drugsAndSubstanceAbuse: verification.drugsAndSubstanceAbuse,
    documentUploadPersonalIdentity: verification.documentUploadPersonalIdentity,
    originalFilenamePersonalIdentity:
      verification.originalFilenamePersonalIdentity,
    documentUploadcriminal: verification.documentUploadcriminal,
    originalFilenamecriminal: verification.originalFilenamecriminal,
    documentUploadverificationAddress:
      verification.documentUploadverificationAddress,
    originalFilenameverificationAddress:
      verification.originalFilenameverificationAddress,
    documentUploaddrugsAndSubstanceAbuse:
      verification.documentUploaddrugsAndSubstanceAbuse,
    originalFilenamedrugsAndSubstanceAbuse:
      verification.originalFilenamedrugsAndSubstanceAbuse,
  };
  if (canidateInstitute) {
    for (var d1 of canidateInstitute) {
      var r1 = { ...studentBio, ...d1, ...studentVerification };
      data.push(r1);
    }
  }
  try {
    for (let d of data) {
      if (d.hasOwnProperty("organizationName")) {
        d.bgvCandidate = true;
        var orgName = d.organizationName;
        var getOrganisation = await orgDAL.findOrganisation({
          organizationName: orgName,
        });

        if (getOrganisation) {
          d.organisationId = getOrganisation._id.toString();
        } else {
          var org = {
            organizationName: orgName,
            organisationEmail: orgName + "@gmail.com",
            scandiate: false,
          };
          var { _id } = await orgDAL.onboardOrganisation(org);
          d.organisationId = _id.toString();
        }
        let empValid = await empValidator.addEmployeeSchema.validateAsync(d);
        var checkDupl = {
          email: d.email,
          organizationName: d.organizationName,
          dateOfJoining: d.dateOfJoining,
          exitDate: d.exitDate,
        };
        var checkDuplicate = await canddidateDAL.checkDiplicateEmployee(
          checkDupl
        );
        if (!checkDuplicate) {
          var saveCandidate = await empDAL.addEmployee(empValid);
        } else {
          continue;
        }
      } else if (d.intitutionName.length > 0) {
        d.bgvCandidate = true;
        var insName = d.intitutionName;
        var getInstitute = await instDAL.findInstitution({
          instituteName: insName,
        });
        if (getInstitute) {
          d.instituteId = getInstitute._id.toString();
        } else {
          var inst = {
            instituteName: insName,
            instituteEmail: insName + "@gmail.com",
            scandiate: false,
          };
          var { _id } = await instDAL.onboardInstitute(inst);
          d.instituteId = _id.toString();
        }
        let stdvalid = await stdValidator.addStudentSchema.validateAsync(d);
        var checkDup = { intitutionName: d.intitutionName, email: d.email };
        var checkDuplicate = await canddidateDAL.checkDuplicateStudentRecord(
          checkDup
        );
        if (!checkDuplicate) {
          var saveCandidate = await stdDAL.addStudent(stdvalid);
        } else {
          continue;
        }
      }
    }
    if (saveCandidate) {
      return res
        .status(200)
        .json({ status: 200, message: "Candidate on-boarded successfully!" });
    }
  } catch (err) {
    return next(new AppError(err, 422));
  }
};

module.exports.showCandidate = async (req, res, next) => {
  try {
    let emp = await empDAL.showEmployee({
      hrorganisationId: req.params.hrorganisationId,
    });
    let stud = await stdDAL.showStudent({
      hrorganisationId: req.params.hrorganisationId,
    });
    let result = emp.concat(stud);
    let newEmployeeArray = [];
    let uniqueEmployee = {};
    for (let i in result) {
      empEmail = result[i]["email"];
      uniqueEmployee[empEmail] = result[i];
    }
    for (i in uniqueEmployee) {
      newEmployeeArray.push(uniqueEmployee[i]);
    }

    let resultData = newEmployeeArray.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return res
      .status(200)
      .json({ status: 200, message: null, data: resultData });
  } catch (err) {
    return next(new AppError(err, 422));
  }
};

module.exports.showCandidateById = async (req, res, next) => {
  const candidateId = mongoose.Types.ObjectId(req.params.candidateId);
  try {
    var data = await canddidateDAL.fetchCandidateEmployeeData({
      _id: candidateId,
    });
    if (!data) {
      data = await canddidateDAL.fetchCandidateStudent({ _id: candidateId });
    }
    if (!data) {
      return next(new AppError("Employee not found", 422));
    }
    var { email, phoneNumber, adharNumber } = data;
    var studentData = await canddidateDAL.fetchStudent({
      email: email,
    });
    var empData = await canddidateDAL.fetchEmployee({
      email: email,
    });
    var totalData = studentData.concat(empData);

    for (var i = 0; i < totalData.length; i++) {
      var org = totalData[i];
      if (org.organizationName != null) {
        var key = i;
        break;
      } else {
        key = 0;
      }
    }
    var empBio = totalData[key];
    var bio = {
      firstName: empBio.firstName,
      lastName: empBio.lastName,
      email: empBio.email,
      adharNumber: empBio.adharNumber,
      phoneNumber: empBio.phoneNumber,
      panNumber: empBio.panNumber,
      dateOfBirth: empBio.dateOfBirth,
      address: empBio.address,
      city: empBio.city,
      state: empBio.state,
      landMark: empBio.landMark,
      zipCode: empBio.zipCode,
      addedById: empBio.addedById,
      hrorganisationId: empBio.hrorganisationId,
    };
    var verification = {
      dateOfVerification: empBio.dateOfVerification,
      verifiedFor: empBio.verifiedFor,
      personalIdentity: empBio.personalIdentity,
      criminal: empBio.criminal,
      verificationAddress: empBio.verificationAddress,
      drugsAndSubstanceAbuse: empBio.drugsAndSubstanceAbuse,
      salarySlipCTCdocument: empBio.salarySlipCTCdocument,
    };
    var candidate = [];
    var candiadteSudnt = [];
    for (var i = 0; i < totalData.length; i++) {
      var org = {
        _id: totalData[i]._id,
        organizationName: totalData[i].organizationName,
        organisationId: totalData[i].organisationId,
        // nameofFeedbackProvider: totalData[i].nameofFeedbackProvider,
        // designationOfFeedbackProvider:
        //   totalData[i].designationOfFeedbackProvider,
        feedbackProviderName: totalData[i].feedbackProviderName,
        feedbackProviderDesignation: totalData[i].feedbackProviderDesignation,
        feedbackProviderRelationship: totalData[i].feedbackProviderRelationship,
        feedbackProviderEmail: totalData[i].feedbackProviderEmail,
        feedbackProviderPhoneNumber: totalData[i].feedbackProviderPhoneNumber,
        organiationLocation: totalData[i].organiationLocation,
        exitDate: totalData[i].exitDate,
        professionalExperience: totalData[i].professionalExperience,
        employeeId: totalData[i].employeeId,
        selfDriven: totalData[i].selfDriven,
        creativity: totalData[i].creativity,
        initiative: totalData[i].initiative,
        dealConstructivelyWithPressure:
          totalData[i].dealConstructivelyWithPressure,
        quality: totalData[i].quality,
        discipline: totalData[i].discipline,
        productKnowledge: totalData[i].productKnowledge,
        industryKnowledge: totalData[i].industryKnowledge,
        awards: totalData[i].awards,
        building: totalData[i].building,
        dateOfJoining: totalData[i].dateOfJoining,
        role: totalData[i].role,
        department: totalData[i].department,
        informalOrganizationSenseOfBelonging:
          totalData[i].informalOrganizationSenseOfBelonging,
        workIndependenty: totalData[i].workIndependenty,
        volume: totalData[i].volume,
        teamWork: totalData[i].teamWork,
        consistency: totalData[i].consistency,
        punctuality: totalData[i].punctuality,
        academicKnowledge: totalData[i].academicKnowledge,
        communicationSkills: totalData[i].communicationSkills,
        stakeholder: totalData[i].stakeholder,
        discrepancyDocuments: totalData[i].discrepancyDocuments,
        compliencyDiscrepancy: totalData[i].compliencyDiscrepancy,
        warning: totalData[i].warning,
        showCausedIssue: totalData[i].showCausedIssue,
        suspension: totalData[i].suspension,
        termination: totalData[i].termination,
        keySkills: totalData[i].keySkills,
        empThrive: totalData[i].empThrive,
        inLeadership: totalData[i].inLeadership,
        otherInfo: totalData[i].otherInfo,
        rehireAgain: totalData[i].rehireAgain,
        reasonForSerperation: totalData[i].reasonForSerperation,
        originalFilename: totalData[i].originalFilename,
        status: totalData[i].status,
      };
      var inst = {
        // Student
        _id: totalData[i]._id,
        // nameofFeedbackProvider: totalData[i].nameofFeedbackProvider,
        feedbackProviderName: totalData[i].feedbackProviderName,
        feedbackProviderDesignation: totalData[i].feedbackProviderDesignation,
        feedbackProviderRelationship: totalData[i].feedbackProviderRelationship,
        feedbackProviderEmail: totalData[i].feedbackProviderEmail,
        feedbackProviderPhoneNumber: totalData[i].feedbackProviderPhoneNumber,
        instituteId: totalData[i].instituteId,
        // designationOfFeedbackProvider:
        //   totalData[i].designationOfFeedbackProvider,
        nameOfCourse: totalData[i].nameOfCourse,
        yearOfJoining: totalData[i].yearOfJoining,
        yearOfPassout: totalData[i].yearOfPassout,
        studentType: totalData[i].studentType,
        extraActivity: totalData[i].extraActivity,
        extraActivityDocumentName: totalData[i].extraActivityDocumentName,
        noOfEductionalDocuments: totalData[i].noOfEductionalDocuments,
        eductionalDocumentNames: totalData[i].eductionalDocumentNames,
        originalFilename: totalData[i].originalFilename,
        originalFilenames: totalData[i].originalFilenames,
        purposeOfFile: totalData[i].purposeOfFile,
        roll: totalData[i].roll,
        intitutionName: totalData[i].intitutionName,
        institutionlocation: totalData[i].institutionlocation,
        instituteId: totalData[i].instituteId,
        status: totalData[i].status,
      };
      if (org.organizationName) {
        candidate.push(org);
      }
      if (inst.intitutionName) {
        candiadteSudnt.push(inst);
      }
    }
    var candidateData = {
      firstName: empBio.firstName,
      lastName: empBio.lastName,
      email: empBio.email,
      adharNumber: empBio.adharNumber,
      phoneNumber: empBio.phoneNumber,
      panNumber: empBio.panNumber,
      dateOfBirth: empBio.dateOfBirth,
      address: empBio.address,
      city: empBio.city,
      state: empBio.state,
      landMark: empBio.landMark,
      zipCode: empBio.zipCode,
      addedById: empBio.addedById,
      hrorganisationId: empBio.hrorganisationId,

      dateOfVerification: empBio.dateOfVerification,
      verifiedFor: empBio.verifiedFor,
      personalIdentity: empBio.personalIdentity,
      criminal: empBio.criminal,
      verificationAddress: empBio.verificationAddress,
      drugsAndSubstanceAbuse: empBio.drugsAndSubstanceAbuse,
      salarySlipCTCdocument: empBio.salarySlipCTCdocument,
      documentUploadPersonalIdentity: empBio.documentUploadPersonalIdentity,
      originalFilenamePersonalIdentity: empBio.originalFilenamePersonalIdentity,
      documentUploadcriminal: empBio.documentUploadcriminal,
      originalFilenamecriminal: empBio.originalFilenamecriminal,
      documentUploadverificationAddress:
        empBio.documentUploadverificationAddress,
      originalFilenameverificationAddress:
        empBio.originalFilenameverificationAddress,
      documentUploaddrugsAndSubstanceAbuse:
        empBio.documentUploaddrugsAndSubstanceAbuse,
      originalFilenamedrugsAndSubstanceAbuse:
        empBio.originalFilenamedrugsAndSubstanceAbuse,
      documentUploadsalarySlipCTCdocument:
        empBio.documentUploadsalarySlipCTCdocument,
      originalFilenamesalarySlipCTCdocument:
        empBio.originalFilenamesalarySlipCTCdocument,
      candidate: candidate,
      canidateInstitute: candiadteSudnt,
    };
    return res
      .status(200)
      .json({ status: 200, message: null, data: candidateData });
  } catch (err) {
    return next(new AppError(err, 422));
  }
};

module.exports.updateCandidateData = async (req, res, next) => {
  const { bio, candidate, canidateInstitute, verification } = req.body;
  var data = [];
  for (var d of candidate) {
    var r = { ...bio, ...d, ...verification };
    data.push(r);
  }
  var studentBio = {
    firstName: bio.firstName,
    lastName: bio.lastName,
    email: bio.email,
    phoneNumber: bio.phoneNumber,
    dateOfBirth: bio.dateOfBirth,
    adharNumber: bio.adharNumber,
    address: bio.address,
    city: bio.city,
    state: bio.state,
    landMark: bio.landMark,
    zipCode: bio.zipCode,
    addedById: bio.addedById,
    hrorganisationId: bio.hrorganisationId,
  };
  var studentVerification = {
    dateOfVerification: verification.dateOfVerification,
    verifiedFor: verification.verifiedFor,
    personalIdentity: verification.personalIdentity,
    criminal: verification.criminal,
    verificationAddress: verification.verificationAddress,
    drugsAndSubstanceAbuse: verification.drugsAndSubstanceAbuse,
    documentUploadPersonalIdentity: verification.documentUploadPersonalIdentity,
    originalFilenamePersonalIdentity:
      verification.originalFilenamePersonalIdentity,
    documentUploadcriminal: verification.documentUploadcriminal,
    originalFilenamecriminal: verification.originalFilenamecriminal,
    documentUploadverificationAddress:
      verification.documentUploadverificationAddress,
    originalFilenameverificationAddress:
      verification.originalFilenameverificationAddress,
    documentUploaddrugsAndSubstanceAbuse:
      verification.documentUploaddrugsAndSubstanceAbuse,
    originalFilenamedrugsAndSubstanceAbuse:
      verification.originalFilenamedrugsAndSubstanceAbuse,
  };
  if (canidateInstitute) {
    for (var d1 of canidateInstitute) {
      var r1 = { ...studentBio, ...d1, ...studentVerification };
      data.push(r1);
    }
  }
  try {
    for (var d of data) {
      if (d.hasOwnProperty("organizationName")) {
        if (d._id != null) {
          var getCand = await canddidateDAL.findByCandIdEmployee({
            _id: d._id,
          });
          if (getCand) {
            var candidateUpdate = await canddidateDAL.updateDataByIdEmp(d);
          }
        } else {
          // var newEmployee = { ...d, bgvCandidate: true };
          d.bgvCandidate = true;
          var orgName = d.organizationName;
          var getOrganisation = await orgDAL.findOrganisation({
            organizationName: orgName,
          });
          if (getOrganisation) {
            d.organisationId = getOrganisation._id.toString();
          } else {
            var org = {
              organizationName: orgName,
              organisationEmail: orgName + "@gmail.com",
              scandiate: false,
            };
            var { _id } = await orgDAL.onboardOrganisation(org);
            d.organisationId = _id.toString();
          }
          delete d["_id"];
          let empValid = await empValidator.updateEmployeeSchema.validateAsync(
            d
          );
          candidateUpdate = await empDAL.addEmployee(empValid);
        }
      } else {
        if (d._id != null) {
          var getStd = await canddidateDAL.findByCandIdStudent({ _id: d._id });
          if (getStd) {
            candidateUpdate = await canddidateDAL.updateDataByIdStd(d);
          }
        } else {
          // var newStudent = { ...d, bgvCandidate: true };
          d.bgvCandidate = true;
          var insName = d.intitutionName;
          var getInstitute = await instDAL.findInstitution({
            instituteName: insName,
          });
          if (getInstitute) {
            d.instituteId = getInstitute._id.toString();
          } else {
            var inst = {
              instituteName: insName,
              instituteEmail: insName + "@gmail.com",
              scandiate: false,
            };
            var { _id } = await instDAL.onboardInstitute(inst);
            d.instituteId = _id.toString();
          }
          delete d["_id"];
          let stdvalid = await stdValidator.updateStudentSchema.validateAsync(
            d
          );
          candidateUpdate = await stdDAL.addStudent(stdvalid);
        }
      }
    }
    if (candidateUpdate) {
      return res
        .status(200)
        .json({ status: 200, message: "Candidate updated successfully" });
    }
  } catch (err) {
    return next(new AppError(err, 422));
  }
};

module.exports.showOrganization = async (req, res, next) => {
  const data = req.body.organizationName;
  try {
    let result = await canddidateDAL.showOrganization(data);
    return res
      .status(200)
      .json({ status: 200, message: "SUCCESS", data: result });
  } catch (err) {
    return next(new AppError(err, 422));
  }
};

module.exports.showInstitution = async (req, res, next) => {
  const data = req.body.intitutionName;
  try {
    let result = await canddidateDAL.showInstitution(data);
    return res
      .status(200)
      .json({ status: 200, message: "SUCCESS", data: result });
  } catch (err) {
    return next(new AppError(err, 422));
  }
};

function format(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();
  return "" + (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;
}

module.exports.downloadReportPDF = async (req, res, next) => {
  var selfDriv = "";
  var workIndepend = "";
  var credvity = "";
  var tWork = "";
  var dealConstructivelyPressure = "";
  var discipln = "";
  var commSkill = "";
  var indusKnow = "";
  var prodKnow = "";
  var subMtr = "";
  var stragThink = "";
  var problemSolv = "";
  var buidPerformance = "";
  var stakeMgmnt = "";
  var discrpncy_date = "";
  var Complnce_date = "";
  var warningdate = "";
  var showCausedate = "";
  var performancedate = "";
  var terminationdate = "";
  const { bio, candidate, canidateInstitute } = req.body;
  const key = req.params.index;
  var data = [];
  for (var d of candidate) {
    var r = { ...bio, ...d };
    data.push(r);
  }
  var studentBio = {
    firstName: bio.firstName,
    lastName: bio.lastName,
    email: bio.email,
    phoneNumber: bio.phoneNumber,
    dateOfBirth: bio.dateOfBirth,
    adharNumber: bio.adharNumber,
    address: bio.address,
    city: bio.city,
    state: bio.state,
    landMark: bio.landMark,
    zipCode: bio.zipCode,
    addedById: bio.addedById,
    hrorganisationId: bio.hrorganisationId,
  };

  if (canidateInstitute) {
    for (var d1 of canidateInstitute) {
      var r1 = { ...studentBio, ...d1 };
      data.push(r1);
    }
  }
  try {
    var getData = data[key];
    var template = [];
    template.push(getData);

    var today = new Date();
    var dateString = format(today);
    for (let i = 0; i < template.length; i++) {
      if (template[i].selfDriven) {
        if (template[i].selfDriven == 1) {
          selfDriv = "Not satisfactory";
        }
        if (template[i].selfDriven == 2) {
          selfDriv = "Needs Improvement";
        }
        if (template[i].selfDriven == 3) {
          selfDriv = "Meets Expectations";
        }
        if (template[i].selfDriven == 4) {
          selfDriv = "Exceeds Expectations";
        }
      }

      if (template[i].workIndependenty) {
        if (template[i].workIndependenty == 1) {
          workIndepend = "Not satisfactory";
        }
        if (template[i].workIndependenty == 2) {
          workIndepend = "Needs Improvement";
        }
        if (template[i].workIndependenty == 3) {
          workIndepend = "Meets Expectations";
        }
        if (template[i].workIndependenty == 4) {
          workIndepend = "Exceeds Expectations";
        }
      }

      //Creativity

      if (template[i].creativity) {
        if (template[i].creativity == 1) {
          credvity = "Not satisfactory";
        }
        if (template[i].creativity == 2) {
          credvity = "Needs Improvement";
        }
        if (template[i].creativity == 3) {
          credvity = "Meets Expectations";
        }
        if (template[i].creativity == 4) {
          credvity = "Exceeds Expectations";
        }
      }

      //Team Work

      if (template[i].teamWork) {
        if (template[i].teamWork == 1) {
          tWork = "Not satisfactory";
        }
        if (template[i].teamWork == 2) {
          tWork = "Needs Improvement";
        }
        if (template[i].teamWork == 3) {
          tWork = "Meets Expectations";
        }
        if (template[i].teamWork == 4) {
          tWork = "Exceeds Expectations";
        }
      }

      //Deals Constructively With Pressure

      if (template[i].dealConstructivelyWithPressure) {
        if (template[i].dealConstructivelyWithPressure == 1) {
          dealConstructivelyPressure = "Not satisfactory";
        }
        if (template[i].dealConstructivelyWithPressure == 2) {
          dealConstructivelyPressure = "Needs Improvement";
        }
        if (template[i].dealConstructivelyWithPressure == 3) {
          dealConstructivelyPressure = "Meets Expectations";
        }
        if (template[i].dealConstructivelyWithPressure == 4) {
          dealConstructivelyPressure = "Exceeds Expectations";
        }
      }

      //discipline

      if (template[i].discipline) {
        if (template[i].discipline == 1) {
          discipln = "Not satisfactory";
        }
        if (template[i].discipline == 2) {
          discipln = "Needs Improvement";
        }
        if (template[i].discipline == 3) {
          discipln = "Meets Expectations";
        }
        if (template[i].discipline == 4) {
          discipln = "Exceeds Expectations";
        }
      }

      //comm skill

      if (template[i].communicationSkills) {
        if (template[i].communicationSkills == 1) {
          commSkill = "Basic";
        }
        if (template[i].communicationSkills == 2) {
          commSkill = "Intermediate";
        }
        if (template[i].communicationSkills == 3) {
          commSkill = "Proficient";
        }
        if (template[i].communicationSkills == 4) {
          commSkill = "Expert";
        }
      }

      //industry know

      if (template[i].industryKnowledge) {
        if (template[i].industryKnowledge == 1) {
          indusKnow = "Basic";
        }
        if (template[i].industryKnowledge == 2) {
          indusKnow = "Intermediate";
        }
        if (template[i].industryKnowledge == 3) {
          indusKnow = "Proficient";
        }
        if (template[i].industryKnowledge == 4) {
          indusKnow = "Expert";
        }
      }
      //pro unders

      if (template[i].productKnowledge) {
        if (template[i].productKnowledge == 1) {
          prodKnow = "Basic";
        }
        if (template[i].productKnowledge == 2) {
          prodKnow = "Intermediate";
        }
        if (template[i].productKnowledge == 3) {
          prodKnow = "Proficient";
        }
        if (template[i].productKnowledge == 4) {
          prodKnow = "Expert";
        }
      }

      //sub matter to expertise
      if (template[i].academicKnowledge) {
        if (template[i].academicKnowledge == 1) {
          subMtr = "Basic";
        }
        if (template[i].academicKnowledge == 2) {
          subMtr = "Intermediate";
        }
        if (template[i].academicKnowledge == 3) {
          subMtr = "Proficient";
        }
        if (template[i].academicKnowledge == 4) {
          subMtr = "Expert";
        }
      }

      // Leadership

      if (template[i].quality) {
        if (template[i].quality.IsSelect == 1) {
          stragThink = "Not satisfactory";
        }
        if (template[i].quality.IsSelect == 2) {
          stragThink = "Needs Improvement";
        }
        if (template[i].quality.IsSelect == 3) {
          stragThink = "Meets Expectations";
        }
        if (template[i].quality.IsSelect == 4) {
          stragThink = "Exceeds Expectations";
        }
      }

      // //problemsolving

      if (template[i].consistency) {
        if (template[i].consistency.IsSelect == 1) {
          problemSolv = "Not satisfactory";
        }
        if (template[i].consistency.IsSelect == 2) {
          problemSolv = "Needs Improvement";
        }
        if (template[i].consistency.IsSelect == 3) {
          problemSolv = "Meets Expectations";
        }
        if (template[i].consistency.IsSelect == 4) {
          problemSolv = "Exceeds Expectations";
        }
      }

      //buildingHighPer
      if (template[i].building) {
        if (template[i].building.IsSelect == 1) {
          buidPerformance = "Not satisfactory";
        }
        if (template[i].building.IsSelect == 2) {
          buidPerformance = "Needs Improvement";
        }
        if (template[i].building.IsSelect == 3) {
          buidPerformance = "Meets Expectations";
        }
        if (template[i].building.IsSelect == 4) {
          buidPerformance = "Exceeds Expectations";
        }
      }

      //buildingHighPer

      if (template[i].stakeholder) {
        if (template[i].stakeholder.IsSelect == 1) {
          stakeMgmnt = "Not satisfactory";
        }
        if (template[i].stakeholder.IsSelect == 2) {
          stakeMgmnt = "Needs Improvement";
        }
        if (template[i].stakeholder.IsSelect == 3) {
          stakeMgmnt = "Meets Expectations";
        }
        if (template[i].stakeholder.IsSelect == 4) {
          stakeMgmnt = "Exceeds Expectations";
        }
      }

      if (template[i].discrepancyDocuments) {
        if (template[i].discrepancyDocuments.IsSelect) {
          if (template[i].discrepancyDocuments.descrepencyPeriod) {
            var temp = template[i].discrepancyDocuments.descrepencyPeriod;
            const dis_date = new Date(temp);
            // discrpncy_date = format(template[i].discrepancyDocuments.descrepencyPeriod);
            // discrpncy_date = format(dis_date);
            discrpncy_date = dis_date.toLocaleDateString();
          }
          discrpncy_cause =
            template[i].discrepancyDocuments.descrepencyCauseActionTaken;
          discrpncy_upload =
            template[i].discrepancyDocuments.descrepencyUploadDocument;
        }
      }

      if (template[i].compliencyDiscrepancy) {
        if (template[i].compliencyDiscrepancy.IsSelect) {
          if (template[i].compliencyDiscrepancy.compliencyPeriod) {
            var temp = template[i].compliencyDiscrepancy.compliencyPeriod;
            const comp_date = new Date(temp);
            // Complnce_date = template[i].compliencyDiscrepancy.compliencyPeriod;
            // Complnce_date = format(comp_date);
            Complnce_date = comp_date.toLocaleDateString();
          }
          Complnce_cause =
            template[i].compliencyDiscrepancy.compliencyCauseActionTaken;
          Complnce_upload =
            template[i].compliencyDiscrepancy.compliencyUploadDocument;
        }
      }

      if (template[i].warning) {
        if (template[i].warning.IsSelect) {
          if (template[i].warning.warningPeriod) {
            var temp = template[i].warning.warningPeriod;
            const warn_date = new Date(temp);
            // warningdate = template[i].warning.warningPeriod;
            // warningdate = format(warn_date);
            warningdate = warn_date.toLocaleDateString();
          }
          warningcause = template[i].warning.warningCauseActionTaken;
          warningupload = template[i].warning.warningUploadDocument;
        }
      }

      if (template[i].showCausedIssue) {
        if (template[i].showCausedIssue.IsSelect) {
          if (template[i].showCausedIssue.showCausedPeriod) {
            var temp = template[i].showCausedIssue.showCausedPeriod;
            const show_caused_date = new Date(temp);
            // showCausedate = template[i].showCausedIssue.showCausedPeriod;
            // showCausedate = format(show_caused_date);
            showCausedate = show_caused_date.toLocaleDateString();
          }
          showCausecause =
            template[i].showCausedIssue.showCausedCauseActionTaken;
          showCauseupload =
            template[i].showCausedIssue.showCausedUploadDocument;
        }
      }

      if (template[i].suspension) {
        if (template[i].suspension.IsSelect) {
          if (template[i].suspension.suspensionPeriod) {
            var temp = template[i].suspension.suspensionPeriod;
            const susp_date = new Date(temp);
            // performancedate = template[i].suspension.suspensionPeriod;
            // performancedate = format(susp_date);
            performancedate = susp_date.toLocaleDateString();
          }
          performancecause = template[i].suspension.suspensionCauseActionTaken;
          performanceupload = template[i].suspension.suspensionUploadDocument;
        }
      }

      if (template[i].termination) {
        if (template[i].termination.IsSelect) {
          if (template[i].termination.terminationPeriod) {
            var temp = template[i].termination.terminationPeriod;
            const term_date = new Date(temp);
            // terminationdate = template[i].termination.terminationPeriod;
            // terminationdate = format(term_date);
            terminationdate = term_date.toLocaleDateString();
          }
          terminationcause =
            template[i].termination.terminationCauseActionTaken;
          terminationupload = template[i].termination.terminationUploadDocument;
        }
      }

      template[i].selfDriven = selfDriv;
      template[i].workIndependenty = workIndepend;
      template[i].creativity = credvity;
      template[i].teamWork = tWork;
      template[i].dealConstructivelyWithPressure = dealConstructivelyPressure;
      template[i].discipline = discipln;
      template[i].communicationSkills = commSkill;
      template[i].industryKnowledge = indusKnow;
      template[i].productKnowledge = prodKnow;
      template[i].subMatter = subMtr;

      // Leadership

      template[i].stategicThinking = stragThink;
      template[i].problemSolving = problemSolv;
      template[i].buildingHighPerformanceTeam = buidPerformance;
      template[i].stakeHolderManagment = stakeMgmnt;

      if (template[i].discrepancyDocuments) {
        if (template[i].discrepancyDocuments.IsSelect) {
          template[i].discrepancy_date = discrpncy_date;
          template[i].discrepancy_cause = discrpncy_cause;
          template[i].discrepancy_upload = discrpncy_upload;
        }
      }
      if (template[i].compliencyDiscrepancy) {
        if (template[i].compliencyDiscrepancy.IsSelect) {
          template[i].Compliance_date = Complnce_date;
          template[i].Compliance_cause = Complnce_cause;
          template[i].Compliance_upload = Complnce_upload;
        }
      }
      if (template[i].warning) {
        if (template[i].warning.IsSelect) {
          template[i].warning_date = warningdate;
          template[i].warning_cause = warningcause;
          template[i].warning_upload = warningupload;
        }
      }
      if (template[i].showCausedIssue) {
        if (template[i].showCausedIssue.IsSelect) {
          template[i].showCause_date = showCausedate;
          template[i].showCause_cause = showCausecause;
          template[i].showCause_upload = showCauseupload;
        }
      }
      if (template[i].suspension) {
        if (template[i].suspension.IsSelect) {
          template[i].performance_date = performancedate;
          template[i].performance_cause = performancecause;
          template[i].performance_upload = performanceupload;
        }
      }
      if (template[i].termination) {
        if (template[i].termination.IsSelect) {
          template[i].termination_date = terminationdate;
          template[i].termination_cause = terminationcause;
          template[i].termination_upload = terminationupload;
        }
      }
    }

    let count = 0;
    var leadership = false;
    for (var i = 0; i < template.length; i++) {
      if (
        template[i].quality.IsSelect != null ||
        template[i].consistency.IsSelect != null ||
        template[i].building.IsSelect != null ||
        template[i].stakeholder.IsSelect != null
      ) {
        count += 1;
      }
    }

    if (count > 0) {
      leadership = true;
    }

    var isAward = false;
    let awardCount = 0;
    for (var i = 0; i < template.length; i++) {
      if (template[i].awards.IsSelect != null) {
        awardCount += 1;
      }
    }

    if (awardCount > 0) {
      isAward = true;
    }

    var isDocument = false;
    let countDoc = 0;
    for (var i = 0; i < template.length; i++) {
      if (
        template[i].discrepancyDocuments.descrepencyCauseActionTaken != null ||
        template[i].compliencyDiscrepancy.compliencyCauseActionTaken != null ||
        template[i].warning.warningCauseActionTaken != null ||
        template[i].showCausedIssue.showCausedCauseActionTaken != null ||
        template[i].suspension.suspensionCauseActionTaken != null ||
        template[i].termination.terminationCauseActionTaken != null
      ) {
        countDoc += 1;
      }
      var joining = template[i].dateOfJoining;
      const join = new Date(joining);
      const j = join.toLocaleDateString();
      var joiningDate = j;
      var exit = template[i].exitDate;
      var exit1 = new Date(exit);
      var e = exit1.toLocaleDateString();
      var exitDate = e;
      // var joiningDate = format(j);
      // var exit = template[i].exitDate;
      // const exit1 = new Date(exit);
      // const e = exit1.toLocaleDateString();
      // var exitDate = format(e);
    }
    if (countDoc > 0) {
      isDocument = true;
    }

    var result = {
      FirstName: bio.firstName,
      LastName: bio.lastName,
      phone: bio.phoneNumber,
      email: bio.email,
      logo: `${process.env.FRONT_END_URL}/assets/images/logo1.png`,
      myDate: dateString,
      data: template,
      joiningdate: joiningDate,
      exitDate: exitDate,
      ldrshp: leadership,
      isAwarded: isAward,
      isDocumentPresent: isDocument,
    };
    console.log(result);
    try {
      ejs.renderFile(
        path.join(
          __dirname,
          "../../scandidate/BGVSearch/BGVTemplate/scandidate-report-org.ejs"
        ),
        result,
        function (err, str) {
          if (err) {
            return next(new AppError(err, 400));
          }

          var fileName = bio.firstName + new Date().getTime() + ".pdf";

          var checkFilePath = path.join(
            __dirname,
            "../../../uploads/scandidate-report/" + fileName
          );

          var options = { height: "10.5in", width: "15in" };
          pdf.create(str, options).toFile(checkFilePath, function (err, data) {
            if (err) {
              return next(new AppError(err, 400));
            }

            return res.status(200).download(checkFilePath, fileName, (err) => {
              if (err) {
                if (err.code == "ENOENT")
                  return next(new AppError("user document not found", 404));
              }
            });
          });
        }
      );
    } catch (err) {
      return next(new AppError(err, 400));
    }
  } catch (err) {
    return next(new AppError(err, 422));
  }
};

module.exports.checkForDuplicateCandidate = async (req, res, next) => {
  const data = req.body;
  try {
    let result = await canddidateDAL.checkDiplicateEmployee(data);
    if (result === undefined) {
      return res
        .status(200)
        .json({ status: 200, message: "Employee doesn't exists" });
    }
    return next(new AppError(result, 400));
  } catch (err) {
    return next(new AppError(err, 422));
  }
};

module.exports.checkForDuplicateStudent = async (req, res, next) => {
  const data = req.body;
  try {
    let result = await canddidateDAL.checkDuplicateStudentRecord(data);
    if (result === undefined) {
      return res
        .status(200)
        .json({ status: 200, message: "Student doesn't exists" });
    }
    return next(new AppError(result, 400));
  } catch (err) {
    return next(new AppError(err, 422));
  }
};
