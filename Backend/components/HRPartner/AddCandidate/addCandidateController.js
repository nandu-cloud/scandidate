const AppError = require("../../../helpers/appError");
const empDAL = require("../../organization/OppsUser/AddEmployee/employeeDAL");
const stdDAL = require("../../institution/OppsUser/AddStudent/studentDAL");
const canddidateDAL = require("./addCandidateDAL");
const empValidator = require("./addCandidateEmpValidator");
const stdValidator = require("./addCandidateStdValidator");
const mongoose = require("mongoose");

module.exports.saveCandidate = async (req, res, next) => {
  const { bio, candidate, verification } = req.body;
  var data = [];
  for (var d of candidate) {
    if (d.hasOwnProperty("organizationName")) {
      var r = { ...bio, ...d, ...verification };
    } else {
      var {
        firstName,
        lastName,
        email,
        adharNumber,
        phoneNumber,
        dateOfBirth,
        address,
        addedById,
        hrorganisationId,
      } = bio;
      var studentBio = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        adharNumber: adharNumber,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
        address: address,
        addedById: addedById,
        hrorganisationId: hrorganisationId,
      };
      var {
        personalIdentity,
        criminal,
        verificationAddress,
        drugsAndSubstanceAbuse,
      } = verification;
      var verified = {
        personalIdentity: personalIdentity,
        criminal: criminal,
        verificationAddress: verificationAddress,
        drugsAndSubstanceAbuse: drugsAndSubstanceAbuse,
      };
      r = { ...studentBio, ...d, ...verified };
    }
    data.push(r);
  }
  try {
    for (let d of data) {
      if (d.hasOwnProperty("organizationName")) {
        // var orgName = { organizationName: d.organizationName };
        // var { _id } = await orgDAL.findOrganisation(orgName);
        // d.candidateOrganisationId = _id.toString();
        d.bgvCandidate = true;
        // var verificationDate = new Date();
        // d.dateOfVerification = verificationDate;
        let empValid = await empValidator.addEmployeeSchema.validateAsync(d);
        var saveCandidate = await empDAL.addEmployee(empValid);
      } else {
        // var insName = { instituteName: d.intitutionName };
        // var { _id } = await instDAL.findInstitution(insName);
        // d.candidateInstituteId = _id.toString();
        d.bgvCandidate = true;
        // var verificationDate = new Date();
        // d.dateOfVerification = verificationDate;
        let stdvalid = await stdValidator.addStudentSchema.validateAsync(d);
        var saveCandidate = await stdDAL.addStudent(stdvalid);
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
    let newEmployeeArray = [];
    let uniqueEmployee = {};
    for (let i in emp) {
      empEmail = emp[i]["email"];
      uniqueEmployee[empEmail] = emp[i];
    }
    for (i in uniqueEmployee) {
      newEmployeeArray.push(uniqueEmployee[i]);
    }
    let stud = await stdDAL.showStudent({
      hrorganisationId: req.params.hrorganisationId,
    });
    let result = newEmployeeArray.concat(stud);

    let resultData = result.sort((a, b) => {
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
    var { email } = data;
    var studentData = await canddidateDAL.fetchStudent({ email: email });
    var empData = await canddidateDAL.fetchEmployee({ email: email });
    var totalData = studentData.concat(empData);
    var empBio = totalData[0];
    var bio = {
      firstName: empBio.firstName,
      lastName: empBio.lastName,
      email: empBio.email,
      adharNumber: empBio.adharNumber,
      phoneNumber: empBio.phoneNumber,
      panNumber: empBio.panNumber,
      dateOfBirth: empBio.dateOfBirth,
      address: empBio.address,
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
    for (var i = 0; i < totalData.length; i++) {
      var org = {
        organizationName: totalData[i].organizationName,
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
      candidate.push(org);
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
      addedById: empBio.addedById,
      hrorganisationId: empBio.hrorganisationId,

      dateOfVerification: empBio.dateOfVerification,
      personalIdentity: empBio.personalIdentity,
      criminal: empBio.criminal,
      verificationAddress: empBio.verificationAddress,
      drugsAndSubstanceAbuse: empBio.drugsAndSubstanceAbuse,
      salarySlipCTCdocument: empBio.salarySlipCTCdocument,
      candidate: candidate,
    };
    return res
      .status(200)
      .json({ status: 200, message: null, data: candidateData });
  } catch (err) {
    return next(new AppError(err, 422));
  }
};

module.exports.updateCandidateData = async (req, res, next) => {
  const { bio, candidate, verification } = req.body;
  const empId = req.params.candidateId;
  var data = [];
  for (var d of candidate) {
    if (d.hasOwnProperty("organizationName")) {
      var r = { ...bio, ...d, ...verification };
    } else {
      var {
        firstName,
        lastName,
        email,
        adharNumber,
        phoneNumber,
        dateOfBirth,
        address,
        addedById,
        hrorganisationId,
      } = bio;
      var studentBio = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        adharNumber: adharNumber,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
        address: address,
        addedById: addedById,
        hrorganisationId: hrorganisationId,
      };
      var {
        personalIdentity,
        criminal,
        verificationAddress,
        drugsAndSubstanceAbuse,
      } = verification;
      var verified = {
        personalIdentity: personalIdentity,
        criminal: criminal,
        verificationAddress: verificationAddress,
        drugsAndSubstanceAbuse: drugsAndSubstanceAbuse,
      };
      r = { ...studentBio, ...d, ...verified };
    }
    data.push(r);
  }
  try {
    for (let d of data) {
      if (d.hasOwnProperty("organizationName")) {
        let empValid = await empValidator.addEmployeeSchema.validateAsync(d);
        var getEmployee = await canddidateDAL.fetchCandidateEmployeeData({
          _id: mongoose.Types.ObjectId(empId),
        });
        if (getEmployee) {
          empValid._id = mongoose.Types.ObjectId(empId);
          var saveCandidate = await empDAL.updateEmployee(empValid);
        } else {
          var saveCandidate = await empDAL.addEmployee(empValid);
        }
      } else {
        d.bgvCandidate = true;
        let stdvalid = await stdValidator.addStudentSchema.validateAsync(d);
        stdvalid._id = mongoose.Types.ObjectId(empId);
        var saveCandidate = await saveNowStdDAL.updateStudent({
          _id: mongoose.Types.ObjectId(empId),
          stdvalid,
        });
      }
    }
    if (saveCandidate) {
      return res
        .status(200)
        .json({ status: 200, message: "Candidate updated successfully!" });
    }
  } catch (err) {
    return next(new AppError(err, 422));
  }
};
