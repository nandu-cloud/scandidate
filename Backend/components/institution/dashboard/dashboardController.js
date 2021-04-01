const studentModel = require("../OppsUser/AddStudent/studentModel");
const empModel = require("../../organization/OppsUser/AddEmployee/employeeModel");
const AppError = require("./../../../helpers/appError");
const colors = require("./../../../helpers/colors");
const bgvDAL = require("../../scandidate/BGVSearch/bgvDAL");

module.exports.countTotalInstUsers = async function (req, res, next) {
  let instituteId = req.params.instituteId;
  let id = req.params.id;
  try {
    let totalStudent = await studentModel.countDocuments({
      instituteId: instituteId,
    });
    let totalEmployeeCount = await studentModel.estimatedDocumentCount();
    let totalStudentCount = await empModel.estimatedDocumentCount();
    let totalCandidate = totalEmployeeCount + totalStudentCount;
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
        totalStudent: totalStudent,
        totalCandidate: totalCandidate,
        totalBGV: totalBGV,
      },
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};
