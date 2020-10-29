const mongoose = require("mongoose");
const AppError = require("./../../../../helpers/appError");
const employeeDAL = require("./employeeDAL");
const employeeDataValidator = require("./employeeValidator");
 

// Add Employee
module.exports.addEmployeeMethod = async function (req, res, next) {
  const data = req.body;
  try {
    await employeeDataValidator.addEmployeeSchema.validateAsync(data);
    let employeeData = await employeeDAL.addEmployee(data);
    return res.status(200).json({ status: "SUCCESS", data: employeeData });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

//Get All Employee
module.exports.getAllMethod = async function (req, res, next) {
  const data = { organisationId: mongoose.Types.ObjectId(req.params.organisationId) };
    try {
      let employeeData = await employeeDAL.getAllUsers(data);
      return res
        .status(200)
        .json({ status: "SUCCESS", message: null, data: employeeData });
    } catch (err) {
      console.log(colors.red, `getAllMethod err ${err}`);
      return next(new AppError(err, 400));
    }
  };

  // Get Employee By Id
module.exports.getEmployeeByIdMethod = async function (req, res, next) {
    try {
      const data = { _id: mongoose.Types.ObjectId(req.params.employeeId) };
      let studentData = await employeeDAL.getEmplyeeById(data);
      if (!studentData)
        return next(new AppError("Employee does not exists!", 404));
      return res.status(200).json({
        status: "SUCCESS",
        message: null,
        data: studentData,
      });
    } catch (err) {
  
      return next(new AppError(err, 400));
    }
  };

  
  // Update Student
module.exports.updateMethod = async function (req, res, next) {
    const data = req.body;
    try {
      let result = await employeeDataValidator.updateEmployeeSchema.validateAsync(
        data
      );
      data._id = mongoose.Types.ObjectId(req.params.employeeId);
      const employeeExsits = await employeeDAL.getEmplyeeById(data);
      if (!employeeExsits)
        return next(new AppError("Employee does not exists!", 404));
      result._id = mongoose.Types.ObjectId(req.params.employeeId);
      result.updatedAt = new Date();
      let studentData = await employeeDAL.updateEmployee(result);
      return res.status(200).json({
        status: "SUCCESS",
        message: "Employee Data has been updated successfully",
        data: studentData,
      });
    } catch (err) {
      return next(new AppError(err, 400));
    }
  };