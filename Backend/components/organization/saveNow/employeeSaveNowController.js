const AppError = require("../../../helpers/appError");
const empDAL = require("./employeeSaveNowDAL");
const employeeDataValidator = require("./employeesaveNowValidator");
const mongoose = require("mongoose");

module.exports.addEmployeeMethod = async function (req, res, next) {
  const data = req.body;
  const empId = req.params.id;

  try {
    await employeeDataValidator.addEmployeeSchema.validateAsync(data);
    let fetchData = await empDAL.getEmployeeById({ _id: empId });
    if (fetchData.length == 0) {
      let employeeData = await empDAL.saveEmployee(data);
      return res.status(200).json({ status: "SUCCESS", data: employeeData });
    } else {
      data._id = mongoose.Types.ObjectId(empId);
      data.updatedAt = new Date();
      let employeeData = await empDAL.updateEmployee(data);
      return res.status(200).json({ status: "SUCCESS", data: employeeData });
    }
  } catch (err) {
    return next(new AppError(err, 400));
  }
};
