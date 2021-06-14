const saveNowEmpDAL = require("./saveNowDAL");
const AppError = require("../../../helpers/appError");
const saveNowValidator = require("./saveNowValidator");
const saveNowStdDAL = require("../../institution/saveNow/studentDAL");

module.exports.saveNowExEmployee = async (req, res, next) => {
  const { bio, candidate, verification } = req.body;
  const { email } = bio;
  var getSavedEmployee = await saveNowEmpDAL.fetchEmployeeEmail({
    email: email,
  });
  if (!getSavedEmployee) {
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
          let empValid = await saveNowValidator.addEmployeeSchema.validateAsync(
            d
          );
          var saveCandidate = await saveNowEmpDAL.addEmployee(empValid);
        } else {
          var insName = { instituteName: d.intitutionName };
          var { _id } = await instDAL.findInstitution(insName);
          d.candidateInstituteId = _id;
          d.bgvCandidate = true;
          var verificationDate = new Date();
          d.dateOfVerification = verificationDate;
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
  } else {
  }
};
