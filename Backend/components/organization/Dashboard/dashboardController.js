const employeeModel = require("../OppsUser/AddEmployee/employeeModel");
const AppError = require("./../../../helpers/appError");
const bgvDAL = require("../../scandidate/BGVSearch/bgvDAL");

module.exports.countTotalOrgUsers = async function (req, res, next) {
  let organisationId = req.params.organisationId;
  let id = req.params.id;
  try {
    let totalEmployee = await employeeModel.countDocuments({
      organisationId: organisationId,
    });
    let totalStudentCount = await studenModel.estimatedDocumentCount();
    let totalEmployeeCount = await employeeModel.estimatedDocumentCount();
    var totalCandidate = totalStudentCount + totalEmployeeCount;
    let totalBGVCount = await bgvDAL.getBySearchedById({ _id: id });
    var sumCount = 0;
    totalBGVCount.map(d => {
      sumCount = sumCount + d.bgvSearchCount
    })
    // console.log(totalBGVCount);
    let totalBGV = sumCount;
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
