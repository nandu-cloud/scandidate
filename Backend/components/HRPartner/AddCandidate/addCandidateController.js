const AppError = require("../../../helpers/appError");
const empDAL = require("../../organization/OppsUser/AddEmployee/employeeDAL");
const orgDAL = require("../../scandidate/organization-onboard/orgOnboardDAL");
const instDAL = require("../../scandidate/institute-onboard/instituteOnboardDAL");
const stdDAL = require("../../institution/OppsUser/AddStudent/studentDAL");
const canddidateDAL = require("./addCandidateDAL");
const empValidator = require("./addCandidateEmpValidator");
const stdValidator = require("./addCandidateStdValidator");
const mongoose = require("mongoose");

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
    adharNumber: bio.canidateInstitute,
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
    personalIdentity: verification.personalIdentity,
    criminal: verification.criminal,
    verificationAddress: verification.verificationAddress,
    drugsAndSubstanceAbuse: verification.drugsAndSubstanceAbuse,
  };
  if (canidateInstitute) {
    for (var d1 of canidateInstitute) {
      var r1 = { ...studentBio, ...d1, ...studentVerification };
      data.push(r1);
    }
  }
  try {
    var duplicate = [];
    var uniqueData = [];
    for (let d of data) {
      if (d.hasOwnProperty("organizationName")) {
        d.bgvCandidate = true;
        var orgName = d.organizationName;
        var { _id } = await orgDAL.findOrganisation({
          organizationName: orgName,
        });
        d.organisationId = _id.toString();
        let empValid = await empValidator.addEmployeeSchema.validateAsync(d);
        var dataEmployee = {
          organizationName: d.organizationName,
          email: d.email,
          dateOfJoining: d.dateOfJoining,
          exitDate: d.exitDate,
        };
        var checkDuplicate = await canddidateDAL.checkDuplicateEmpRecord(
          dataEmployee
        );
        if (checkDuplicate) {
          duplicate.push(checkDuplicate.organizationName);
          continue;
        } else {
          var saveCandidate = await empDAL.addEmployee(empValid);
        }
      } else {
        d.bgvCandidate = true;
        var insName = d.intitutionName;
        var { _id } = await instDAL.findInstitution({
          instituteName: insName,
        });
        d.instituteId = _id.toString();
        let stdvalid = await stdValidator.addStudentSchema.validateAsync(d);
        var dataStduent = {
          intitutionName: d.intitutionName,
          email: d.email,
        };
        var checkDuplicate = await canddidateDAL.checkDuplicateStudentRecord(
          dataStduent
        );
        if (checkDuplicate) {
          duplicate.push(checkDuplicate.intitutionName);
        } else {
          saveCandidate = await stdDAL.addStudent(stdvalid);
        }
      }
    }
    uniqueData = [...new Set(duplicate)];
    if (duplicate.length > 0) {
      var duplicateNames = "";
      for (var i = 0; i < uniqueData.length; i++) {
        if (i < uniqueData.length - 1) {
          duplicateNames = duplicateNames + uniqueData[i] + ",";
        } else {
          duplicateNames = duplicateNames + uniqueData[i];
        }
      }
    }
    if (saveCandidate === undefined && duplicate.length > 0) {
      return res.status(200).json({
        status: 200,
        message: `Record already exists for ${duplicateNames}`,
      });
    } else if (saveCandidate && duplicate.length > 0) {
      return res.status(200).json({
        status: 200,
        message: `Partital saved, record exists for ${duplicateNames}`,
      });
    } else {
      if (saveCandidate) {
        return res
          .status(200)
          .json({ status: 200, message: "Candidate on-boarded successfully!" });
      }
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
    console.log(key);
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
        nameofFeedbackProvider: totalData[i].nameofFeedbackProvider,
        designationOfFeedbackProvider:
          totalData[i].designationOfFeedbackProvider,
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
        nameofFeedbackProvider: totalData[i].nameofFeedbackProvider,
        instituteId: totalData[i].instituteId,
        designationOfFeedbackProvider:
          totalData[i].designationOfFeedbackProvider,
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
      personalIdentity: empBio.personalIdentity,
      criminal: empBio.criminal,
      verificationAddress: empBio.verificationAddress,
      drugsAndSubstanceAbuse: empBio.drugsAndSubstanceAbuse,
      salarySlipCTCdocument: empBio.salarySlipCTCdocument,
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
    adharNumber: bio.canidateInstitute,
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
    personalIdentity: verification.personalIdentity,
    criminal: verification.criminal,
    verificationAddress: verification.verificationAddress,
    drugsAndSubstanceAbuse: verification.drugsAndSubstanceAbuse,
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
        var getCand = await canddidateDAL.findByCandIdEmployee({ _id: d._id });
        if (getCand) {
          var candidateUpdate = await canddidateDAL.updateDataByIdEmp(d);
        } else {
          candidateUpdate = await empDAL.addEmployee(d);
        }
      } else {
        var getStd = await canddidateDAL.findByCandIdStudent({ _id: d._id });
        if (getStd) {
          candidateUpdate = await canddidateDAL.updateDataByIdStd(d);
        } else {
          candidateUpdate = await stdDAL.addStudent(d);
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
