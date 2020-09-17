const AppError = require("./../../../helpers/appError");
const colors = require("./../../../helpers/colors");
const orgnisationDAL = require("./orgOnboardDAL");
const mongoose = require("mongoose");

//Add Organisation
module.exports.onboardOrganisationMethod = async function (req, res, next) {
  const data = req.body;
      try {
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
  const data = { _id: mongoose.Types.ObjectId(req.params.organisationId) };
  try {
    let organisationData = await orgnisationDAL.getOrganisationById(data);
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
  data._id = mongoose.Types.ObjectId(req.params.organisationId);
  try {
    let organisationData = await orgnisationDAL.updateOrganisation(data);
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
module.exports.deleteOrganisationMethod = async function (req, res) {
  const data = { _id: mongoose.Types.ObjectId(req.params.organisationId) };
  try {
    let organisationData = await orgnisationDAL.deleteOrganisation(data);

    return res.status(200).json({
      status: "SUCCESS",
      message: "Organisation has been deleted successfully !",
      data: organisationData,
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};