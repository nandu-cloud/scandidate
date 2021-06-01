const AppError = require("../../../../helpers/appError");
const empValidator = require("./EmployeeValidator");
const empDAL = require("./EmployeeDAL");
const colors = require("../../../../helpers/colors");
const mongoose = require("mongoose");

module.exports.addEmployee = async (req, res, next) => {
  const data = req.body;
  try {
    let getValidateResult = await empValidator.addEmployeeSchema.validateAsync(
      data
    );
    let result = await empDAL.saveEmployee(getValidateResult);
    return res.status(200).json({ status: "SUCCESS", data: result });
  } catch (err) {
    return next(new AppError(err, 422));
  }
};

module.exports.getEmployee = async (req, res, next) => {
  const data = mongoose.Types.ObjectId(req.params.hrpartnerId);
  try {
    let result = await empDAL.findEmployee(data);
    return res.status(200).json({ status: "SUCCESS", data: result });
  } catch (err) {
    return next(new AppError(err, 422));
  }
};
