const AppError = require("../../../helpers/appError");
const orgDAL = require("../../scandidate/organization-onboard/orgOnboardDAL");
const instDAL = require("../../scandidate/institute-onboard/instituteOnboardDAL");
const empDAL = require("../../organization/OppsUser/AddEmployee/employeeDAL");
const stdDAL = require("../../institution/OppsUser/AddStudent/studentDAL");
const empValidator = require("../../organization/OppsUser/AddEmployee/employeeValidator");
const stdValidator = require("../../institution/OppsUser/AddStudent/studentValidator");

module.exports.saveCandidate = async (req, res, next) => {
  const { bio, candidate, verification } = req.body;
  var data = [];
  for (var d of candidate) {
    var r = { ...bio, ...d, ...verification };
    data.push(r);
  }
  try {
    for (let d of data) {
      if (d.hasOwnProperty("organizationName")) {
        var orgName = { organizationName: d.organizationName };
        var { _id } = await orgDAL.findOrganisation(orgName);
        d.candidateOrganisationId = _id;
        d.bgvCandidate = true;
        var verificationDate = new Date();
        d.dateOfVerification = verificationDate;
        let empValid = await empValidator.addEmployeeSchema.validateAsync(d);
        var saveCandidate = await empDAL.addEmployee(empValid);
      } else {
        var insName = { instituteName: d.intitutionName };
        var { _id } = await instDAL.findInstitution(insName);
        d.candidateInstituteId = _id;
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
