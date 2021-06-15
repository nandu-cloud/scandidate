const AppError = require("../../../helpers/appError");
const orgDAL = require("../../scandidate/organization-onboard/orgOnboardDAL");
const instDAL = require("../../scandidate/institute-onboard/instituteOnboardDAL");
const empDAL = require("../../organization/OppsUser/AddEmployee/employeeDAL");
const stdDAL = require("../../institution/OppsUser/AddStudent/studentDAL");
const empValidator = require("./addCandidateEmpValidator");
const stdValidator = require("./addCandidateStdValidator");

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
        var verificationDate = new Date();
        d.dateOfVerification = verificationDate;
        let empValid = await empValidator.addEmployeeSchema.validateAsync(d);
        var saveCandidate = await empDAL.addEmployee(empValid);
      } else {
        // var insName = { instituteName: d.intitutionName };
        // var { _id } = await instDAL.findInstitution(insName);
        // d.candidateInstituteId = _id.toString();
        d.bgvCandidate = true;
        var verificationDate = new Date();
        d.dateOfVerification = verificationDate;
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
    let stud = await stdDAL.showStudent({
      hrorganisationId: req.params.hrorganisationId,
    });
    let result = emp.concat(stud);
    return res.status(200).json({ status: 200, message: null, data: result });
  } catch (err) {
    return next(new AppError(err, 422));
  }
};
