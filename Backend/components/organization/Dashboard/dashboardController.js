const employeeModel = require("../OppsUser/AddEmployee/employeeModel");
// const studenModel = require("../../institution/OppsUser/AddStudent/studentModel");
const AppError = require("./../../../helpers/appError");
const bgvDAL = require("../../scandidate/BGVSearch/bgvDAL");
const empDAL = require("../OppsUser/AddEmployee/employeeDAL");
const stuDAL = require("../../institution/OppsUser/AddStudent/studentDAL");

module.exports.countTotalOrgUsers = async function (req, res, next) {
  let organisationId = req.params.organisationId;
  let totalEmail = [];
  let id = req.params.id;
  try {
    let totalEmployee = await employeeModel.countDocuments({
      organisationId: organisationId,
    });
    let totalStudentCount = await stuDAL.findDistinctStudent();
    totalStudentCount.map((e) => {
      totalEmail.push(e.email);
    });
    let totalEmployeeCount = await empDAL.findDistinctEmployee();
    totalEmployeeCount.map((e) => {
      totalEmail.push(e.email);
    });
    var uniqEmail = new Set();
    totalEmail.map((e) => {
      uniqEmail.add(e);
    });
    // var totalCandidate = totalStudentCount + totalEmployeeCount;
    let totalBGVCount = await bgvDAL.getBySearchedById({ _id: id });
    var sumCount = 0;
    totalBGVCount.map((d) => {
      sumCount = sumCount + d.bgvSearchCount;
    });
    let totalBGV = sumCount;
    return res.status(200).json({
      status: "SUCCESS",
      data: {
        totalEmployee: totalEmployee,
        totalCandidate: uniqEmail.size,
        totalBGV: totalBGV,
      },
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};
