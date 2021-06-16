const mongoose = require("mongoose");
const saveNowEmpDAL = require("./saveNowDAL");
const AppError = require("../../../helpers/appError");
const saveNowValidator = require("./saveNowValidator");
const saveNowStdDAL = require("../../institution/saveNow/studentDAL");
const orgDAL = require("../../scandidate/organization-onboard/orgOnboardDAL");
const instDAL = require("../../scandidate/institute-onboard/instituteOnboardDAL");

module.exports.saveNowExEmployee = async (req, res, next) => {
  const { bio, candidate, verification } = req.body;
  const empId = req.params.candidateId;
  var fetchEmpData = await saveNowEmpDAL.getEmployee({ _id: empId });
  var fetchStdData = await saveNowStdDAL.getStudent({ _id: empId });
  if (fetchEmpData != null) {
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
          let empValid = await saveNowValidator.addEmployeeSchema.validateAsync(
            d
          );
          // empValid._id = mongoose.Types.ObjectId(empId);
          // var saveCandidate = await saveNowEmpDAL.updateEmployee(empValid);
          var getEmployee = await saveNowEmpDAL.getEmployee({
            _id: mongoose.Types.ObjectId(empId),
          });
          if (getEmployee) {
            empValid._id = mongoose.Types.ObjectId(empId);
            var saveCandidate = await saveNowEmpDAL.updateEmployee(empValid);
          } else {
            var saveCandidate = await saveNowEmpDAL.addEmployee(empValid);
          }
        } else {
          // var insName = { instituteName: d.intitutionName };
          // var { _id } = await instDAL.findInstitution(insName);
          // d.candidateInstituteId = _id.toString();
          d.bgvCandidate = true;
          // var verificationDate = new Date();
          // d.dateOfVerification = verificationDate;
          let stdvalid = await saveNowValidator.addStudentSchema.validateAsync(
            d
          );
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
  } else {
    var data = [];
    for (var d of candidate) {
      var r = { ...bio, ...d, ...verification };
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
          let empValid = await saveNowValidator.addEmployeeSchema.validateAsync(
            d
          );
          var saveCandidate = await saveNowEmpDAL.addEmployee(empValid);
        } else {
          // var insName = { instituteName: d.intitutionName };
          // var { _id } = await instDAL.findInstitution(insName);
          // d.candidateInstituteId = _id.toString();
          d.bgvCandidate = true;
          // var verificationDate = new Date();
          // d.dateOfVerification = verificationDate;
          let stdvalid = await saveNowValidator.addStudentSchema.validateAsync(
            d
          );
          var saveCandidate = await saveNowStdDAL.addStudent(stdvalid);
        }
      }
      if (saveCandidate) {
        return res
          .status(200)
          .json({ status: 200, message: "Candidate saved successfully!" });
      }
    } catch (err) {
      return next(new AppError(err, 422));
    }
  }
};

module.exports.getSaveNowCandidate = async (req, res, next) => {
  const { candidateId } = req.params;
  try {
    var data = await saveNowEmpDAL.getEmployee({
      _id: mongoose.Types.ObjectId(candidateId),
    });
    if (!data) {
      data = await saveNowStdDAL.getStudent({
        _id: mongoose.Types.ObjectId(candidateId),
      });
    }
    return res.status(200).json({ status: 200, message: null, data: data });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};
