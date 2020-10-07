const mongoose = require("mongoose");
const AppError = require("./../../../../helpers/appError");
const studentDAL = require("./studentDAL");
const studentDataValidator = require("./studentValidator");

// Add Organisation
module.exports.addStudentMethod = async function (req, res, next) {
  const data = req.body;
  try {
    await studentDataValidator.addStudentSchema.validateAsync(data);
    let studentData = await studentDAL.addStudent(data);
    return res.status(200).json({ status: "SUCCESS", data: studentData });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

module.exports.getAllMethod = async function (req, res, next) {
    const data = {};
    try {
      let studentData = await studentDAL.getAllUsers(data);
      return res
        .status(200)
        .json({ status: "SUCCESS", message: null, data: studentData });
    } catch (err) {
      console.log(colors.red, `getAllMethod err ${err}`);
      return next(new AppError(err, 400));
    }
  };

 // Get Student By Id
module.exports.getStudentByIdMethod = async function (req, res, next) {
  try {
    const data = { _id: mongoose.Types.ObjectId(req.params.studentId) };
    let studentData = await studentDAL.getStudentById(data);
    if (!studentData)
      return next(new AppError("Student does not exists!", 404));
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
    let result = await studentDataValidator.updateStudentSchema.validateAsync(
      data
    );
    data._id = mongoose.Types.ObjectId(req.params.studentId);
    const studentExsits = await studentDAL.getStudentById(data);
    if (!studentExsits)
      return next(new AppError("Student does not exists!", 404));
    result._id = mongoose.Types.ObjectId(req.params.studentId);
    result.updatedAt=new Date();
    let studentData = await studentDAL.updateStudent(result);
    return res.status(200).json({
      status: "SUCCESS",
      message: "Student Data has been updated successfully",
      data: studentData,
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};
