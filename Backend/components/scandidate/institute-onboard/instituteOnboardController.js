const AppError = require("./../../../helpers/appError");
const colors = require("./../../../helpers/colors");
const instituteDAL = require("./instituteOnboardDAL");
const instituteValidator = require("./instituteOnboardValidator")
const mongoose = require("mongoose");


//Add Institute
module.exports.onboardInstituteMethod = async function (req, res, next) {
  const data = req.body;
  try {
    await instituteValidator.instituteCreationSchema.validateAsync(data);
    let instituteData = await instituteDAL.onboardInstitute(data);
    return res.status(200).json({ status: "SUCCESS", data: instituteData });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

//Get All Organisation Data
module.exports.getAllMethod = async function (req, res, next) {
  const data = {};
  try {
    let instituteData = await instituteDAL.getAllInstitute(data);
    return res
      .status(200)
      .json({ status: "SUCCESS", message: null, data: instituteData });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

//Get Institute By Id
module.exports.getInstituteByIdMethod = async function (req, res, next) {
  try {
    const data = { _id: mongoose.Types.ObjectId(req.params.instituteId) };
    let instituteData = await instituteDAL.getInstituteById(data);
    if (!instituteData) return next(new AppError("Institute does not exists!", 404));
    return res.status(200).json({
      status: "SUCCESS",
      message: null,
      data: instituteData,
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};


//Update Institute
module.exports.updateInstituteMethod = async function (req, res, next) {
  const data = req.body;
  try {
    let result = await instituteValidator.instituteUpdationSchema.validateAsync(data);
    data._id = mongoose.Types.ObjectId(req.params.instituteId); 
    const instituteExsits = await instituteDAL.getInstituteById(data);
    if (!instituteExsits) return next(new AppError("user does not exists!", 404));
    result._id = mongoose.Types.ObjectId(req.params.instituteId); 
    let instituteData = await instituteDAL.updateInstitute(result);
    return res.status(200).json({
      status: "SUCCESS",
      message: "Institute Data has been updated successfully",
      data: instituteData,
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

//Delete Institute
module.exports.deleteInstituteMethod = async function (req, res,next) {
  try {
    const data = { _id: mongoose.Types.ObjectId(req.params.instituteId) };
    const instituteExsits = await instituteDAL.getInstituteById(data);
    if (!instituteExsits) return next(new AppError("Organisation does not exists!", 404));
    const instituteData = await instituteDAL.deleteInstitute(data);
    return res.status(200).json({
      status: "SUCCESS",
      message: "Institute has been deleted successfully !",
      data: instituteData,
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};