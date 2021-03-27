const AppError = require("../../../helpers/appError");
const colors = require("../../../helpers/colors");
const lineManagerDAL = require("./LineManagerDAL");

module.exports.showEmployeeAssignedDetails = async (req, res, next) => {
  const id = req.params.id;
  try {
    let result = await lineManagerDAL.getEmp(id);
    if (!result) return next(new AppError("user does not exists!", 404));
    return res
      .status(200)
      .json({ status: 200, message: "Success", data: result });
  } catch (err) {
    console.log(colors.red, err);
    return next(new AppError("Something is wrong", 400));
  }
};
