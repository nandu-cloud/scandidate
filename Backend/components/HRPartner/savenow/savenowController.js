const mongoose = require("mongoose");
const AppError = require("../../../helpers/appError");
const orgDAL = require("../../scandidate/organization-onboard/orgOnboardDAL");
const instDAL = require("../../scandidate/institute-onboard/instituteOnboardDAL");
const saveNowDAL = require("./saveNowDAL");
const empValidator = require("../../organization/saveNow/employeesaveNowValidator");
const stdValidator = require("../../institution/saveNow/studentSaveNowValidator");

module.exports.saveNowCandidate = async (req, res, next) => {
  const { bio, candidate, canidateInstitute, verification } = req.body;
  var data = [];
  if (candidate) {
    for (var d of candidate) {
      var r = { ...bio, ...d, ...verification };
      data.push(r);
    }
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
    finalStatus: bio.finalStatus,
  };
  console.log(studentBio);
  var studentVerification = {
    dateOfVerification: verification.dateOfVerification,
    verifiedFor: verification.verifiedFor,
    verifiedBy: verification.verifiedBy,
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
          dateOfJoining: d.dateOfJoining,
          exitDate: d.exitDate,
        };
        var checkDuplicate = await saveNowDAL.checkEmployeeIfExists(checkDupl);
        if (!checkDuplicate.length > 0) {
          var saveCandidate = await saveNowDAL.saveNowEmployee(empValid);
        } else {
          var saveCandidate = await saveNowDAL.updateSaveNowEmployee(empValid);
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
        let stdvalid = await stdValidator.addStudentSaveNowSchema.validateAsync(
          d
        );
        var checkDup = { intitutionName: d.intitutionName, email: d.email };
        var checkDuplicate = await saveNowDAL.checkStudentExists(checkDup);
        if (!checkDuplicate.length > 0) {
          var saveCandidate = await saveNowDAL.saveNowStudent(stdvalid);
        } else {
          var saveCandidate = await saveNowDAL.updateSaveNowStudent(stdvalid);
        }
      }
    }
    if (saveCandidate) {
      return res
        .status(200)
        .json({ status: 200, message: "Candidate on-boarded successfully!" });
    }
    return res.status(400).json({ status: 400, message: "Error" });
  } catch (err) {
    return next(new AppError(err, 422));
  }
};
