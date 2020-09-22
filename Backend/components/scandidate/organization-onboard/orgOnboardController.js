const AppError = require("./../../../helpers/appError");
const colors = require("./../../../helpers/colors");
const orgnisationDAL = require("./orgOnboardDAL");
const orgnisationValidator = require("./orgOnboardValidator");
const mongoose = require("mongoose");

//Add Organisation
module.exports.onboardOrganisationMethod = async function (req, res, next) {
  const data = req.body;
  try {
    
    await orgnisationValidator.organisationCreationSchema.validateAsync(data);
    let organisationData = await orgnisationDAL.onboardOrganisation(data);
    return res.status(200).json({ status: "SUCCESS", data: organisationData });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};


//Get All Organisation Data
module.exports.getAllMethod = async function (req, res, next) {
  const data = {};
  try {
    let organisationData = await orgnisationDAL.getAllOrganisation(data);
    return res
      .status(200)
      .json({ status: "SUCCESS", message: null, data: organisationData });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

//Get Organisation By Id
module.exports.getOrganisationByIdMethod = async function (req, res, next) {
  try {
    const data = { _id: mongoose.Types.ObjectId(req.params.organisationId) };
    let organisationData = await orgnisationDAL.getOrganisationById(data);
    if (!organisationData) return next(new AppError("Organisation does not exists!", 404));
    return res.status(200).json({
      status: "SUCCESS",
      message: null,
      data: organisationData,
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

//Update Organisation
module.exports.updateOrganisationMethod = async function (req, res, next) {
  const data = req.body;
  try {
    let result = await orgnisationValidator.organisationUpdationSchema.validateAsync(data);
    data._id = mongoose.Types.ObjectId(req.params.organisationId); 
    const organisationExsits = await orgnisationDAL.getOrganisationById(data);
    if (!organisationExsits) return next(new AppError("user does not exists!", 404));
    result._id = mongoose.Types.ObjectId(req.params.organisationId); 
    let organisationData = await orgnisationDAL.updateOrganisation(result);
    return res.status(200).json({
      status: "SUCCESS",
      message: "Organisation Data has been updated successfully",
      data: organisationData,
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};


//Delete Organisation
module.exports.deleteOrganisationMethod = async function (req, res,next) {
  try {
    const data = { _id: mongoose.Types.ObjectId(req.params.organisationId) };
    const organisationExsits = await orgnisationDAL.getOrganisationById(data);
    if (!organisationExsits) return next(new AppError("Organisation does not exists!", 404));
    const organisationData = await orgnisationDAL.deleteOrganisation(data);
    return res.status(200).json({
      status: "SUCCESS",
      message: "Organisation has been deleted successfully !",
      data: organisationData,
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};
