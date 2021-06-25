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
      // console.log(d);
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
        status: 410,
        message: `Record already exists for ${duplicateNames}`,
      });
    } else if (saveCandidate && duplicate.length > 0) {
      return res.status(200).json({
        status: 409,
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

module.exports.downloadReportPDF = async (req, res, next) => {
  const { bio, candidate, canidateInstitute, verification } = req.body;
  const key = req.params.index;
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
    var getData = data[key];
    var template = [];
    template.push(getData);
    function format(date) {
      var d = date.getDate();
      var m = date.getMonth() + 1;
      var y = date.getFullYear();
      return (
        "" + (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y
      );
    }
    var today = new Date();
    var dateString = format(today);

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
        template[i].discrepancyDocuments.IsSelect != null ||
        template[i].compliencyDiscrepancy.IsSelect != null ||
        template[i].warning.IsSelect != null ||
        template[i].showCausedIssue.IsSelect != null ||
        template[i].suspension.IsSelect != null ||
        template[i].termination.IsSelect != null
      ) {
        countDoc += 1;
      }
    }
    if (countDoc > 0) {
      isDocument = true;
    }

    if (process.env.NODE_ENV === "development") {
      var result = {
        FirstName: bio.firstName,
        LastName: bio.lastName,
        phone: bio.phoneNumber,
        email: bio.email,
        logo: `${process.env.FRONT_END_URL}/assets/images/logo1.png`,
        orgLogo: `${process.env.FRONT_END_URL_LOCAL}/public/organization_logo/`,
        instLogo: `${process.env.FRONT_END_URL_LOCAL}/public/institute_logo/`,
        myDate: dateString,
        data: template,
        ldrshp: leadership,
        isAwarded: isAward,
        isDocumentPresent: isDocument,
      };
    } else if (process.env.NODE_ENV === "uat") {
      var result = {
        FirstName: bio.firstName,
        LastName: bio.lastName,
        phone: bio.phoneNumber,
        email: bio.email,
        logo: `${process.env.FRONT_END_URL}/assets/images/logo1.png`,
        orgLogo: `${process.env.FRONT_END_URL_DEV}/public/organization_logo/`,
        instLogo: `${process.env.FRONT_END_URL_DEV}/public/institute_logo/`,
        myDate: dateString,
        data: template,
        ldrshp: leadership,
        isAwarded: isAward,
        isDocumentPresent: isDocument,
      };
    } else if (process.env.NODE_ENV === "production") {
      var result = {
        FirstName: bio.firstName,
        LastName: bio.lastName,
        phone: bio.phoneNumber,
        email: bio.email,
        logo: `${process.env.FRONT_END_URL}/assets/images/logo1.png`,
        orgLogo: `${process.env.FRONT_END_URL}/public/organization_logo/`,
        instLogo: `${process.env.FRONT_END_URL}/public/institute_logo/`,
        myDate: dateString,
        data: template,
        ldrshp: leadership,
        isAwarded: isAward,
        isDocumentPresent: isDocument,
      };
    }

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
