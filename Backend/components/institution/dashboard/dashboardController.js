const studentModel = require("../OppsUser/AddStudent/studentModel");
const AppError = require("./../../../helpers/appError");
const colors = require("./../../../helpers/colors");
const userDAL = require("../../scandidate/user/userDAL");

module.exports.countTotalInstUsers = async function (req, res, next) {
  let instituteId = req.params.instituteId;
  // let id = req.params.id;
  try {
    let totalStudent = await studentModel.countDocuments({
      instituteId: instituteId,
    });
    let totalCandidate = await studentModel.estimatedDocumentCount();
    let totalBGV = 0;
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
