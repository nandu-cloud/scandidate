const AppError = require("../../../../helpers/appError");
const colors = require("../../../../helpers/colors");
const mongoose = require("mongoose");
const empDAL = require("../../../organization/OppsUser/AddEmployee/employeeDAL");
const empValidator = require("../../../organization/OppsUser/AddEmployee/employeeValidator");

module.exports.addEmployee = async (req, res, next) => {
  const data = req.body;
  try {
    let getValidateResult = await empValidator.addEmployeeSchema.validateAsync(
      data
    );
    let result = await empDAL.addEmployee(getValidateResult);
    return res.status(200).json({ status: "SUCCESS", data: result });
  } catch (err) {
    return next(new AppError(err, 422));
  }
};

module.exports.getEmployee = async (req, res, next) => {
  const data = {
    organisationId: mongoose.Types.ObjectId(req.params.organisationId),
  };
  try {
    let result = await empDAL.getAllUsers(data);
    return res.status(200).json({ status: "SUCCESS", data: result });
  } catch (err) {
    return next(new AppError(err, 422));
  }
};
