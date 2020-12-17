const employeeModel = require("../OppsUser/AddEmployee/employeeModel");
const AppError = require("./../../../helpers/appError");
const userDAL = require("../../scandidate/user/userDAL");

module.exports.countTotalOrgUsers = async function (req, res, next) {
  let organisationId = req.params.organisationId;
  // let id = req.params.id;
  try {
    let totalEmployee = await employeeModel.countDocuments({
      organisationId: organisationId,
    });
    let totalCandidate = await employeeModel.estimatedDocumentCount();
    let totalBGV = 0;
    return res.status(200).json({
      status: "SUCCESS",
      data: {
        totalEmployee: totalEmployee,
        totalCandidate: totalCandidate,
        totalBGV: totalBGV,
      },
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};
