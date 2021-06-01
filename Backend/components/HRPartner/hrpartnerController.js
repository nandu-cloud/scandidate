const hrpartnerValidator = require("./hrpartnerValidator");
const AppError = require("../../helpers/appError");
const mongoose = require("mongoose");
const hrpartnerDAL = require("./hrpartnerDAL");

module.exports.addhrpartner = async (req, res, next) => {
  let data = req.body;
  try {
    let result = await hrpartnerValidator.hrpartnerCreateValidator.validateAsync(
      data
    );
    let saveResult = await hrpartnerDAL.savehrparner(result);
    return res
      .status(200)
      .json({ status: "SUCCESS", message: null, data: saveResult });
  } catch (err) {
    return next(new AppError(err, 422));
  }
};

module.exports.getAllHRpartner = async (req, res, next) => {
  try {
    let result = await hrpartnerDAL.findAllHrPartner();
    return res
      .status(200)
      .json({ status: "SUCCESS", message: null, data: result });
  } catch (err) {
    return next(new AppError(err, 422));
  }
};

module.exports.getHrPartnerById = async (req, res, next) => {
  const data = req.params.organisationId;
  try {
    let result = await hrpartnerDAL.getHrPartnerFromId({ _id: data });
    return res
      .status(200)
      .json({ status: "SUCCESS", message: null, data: result });
  } catch (err) {
    return next(new AppError(err, 422));
  }
};

module.exports.updateHrPartner = async (req, res, next) => {
  const data = req.body;
  const organisationId = req.params.organisationId;
  try {
    let result = await hrpartnerValidator.hrpartnerUpdateValidator.validateAsync(
      data
    );
    result._id = mongoose.Types.ObjectId(organisationId);
    let getResult = await hrpartnerDAL.getHrPartnerFromId(result);
    if (!getResult) {
      return next(new AppError("Organisation not found", 422));
    }
    let updateResult = await hrpartnerDAL.updateHrPartner(result);
    return res.status(200).json({
      status: "SUCCESS",
      message: "HR Partner data has been updated successfully",
      data: updateResult,
    });
  } catch (err) {
    return next(new AppError(err, 422));
  }
};
