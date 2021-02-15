const AppError = require("../../../helpers/appError");
const empDAL = require("./employeeSaveNowDAL");
const employeeDataValidator = require("./employeesaveNowValidator");

module.exports.addEmployeeMethod = async function (req, res, next) {
  const data = req.body;
  try {
    await employeeDataValidator.addEmployeeSchema.validateAsync(data);
    let employeeData = await empDAL.saveEmployee(data);
    return res.status(200).json({ status: "SUCCESS", data: employeeData });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};
