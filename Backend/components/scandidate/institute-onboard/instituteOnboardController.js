const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const AppError = require("./../../../helpers/appError");
const colors = require("./../../../helpers/colors");
const instituteDAL = require("./instituteOnboardDAL");
const instituteValidator = require("./instituteOnboardValidator");
const studentDAL = require("../../institution/OppsUser/AddStudent/studentDAL");
const email = require("../../../helpers/email");

// Add Institute
module.exports.onboardInstituteMethod = async function (req, res, next) {
  const data = req.body;
  try {
    await instituteValidator.instituteCreationSchema.validateAsync(data);
    let instituteData = await instituteDAL.onboardInstitute(data);
    let template = instituteData;
    template.logo = `${process.env.FRONT_END_URL}/assets/images/logo1.png`;
    template.email = instituteData.instituteEmail;
    template.subject = `Welcome to scandidate.`;
    try {
      template.html = await ejs.renderFile(
        path.join(
          __dirname,
          "../../../helpers/email-templates/institute-onboard.ejs"
        ),
        template
      );
    } catch (err) {
      template.html = `Welcome ${template.instituteName}, to scandidate platform`;
      console.log("institute-onboard.ejs template render error");
    }
    email.sendEmail(template);
    return res.status(200).json({ status: "SUCCESS", data: instituteData });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

// Get All Institute Data
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

// Get Institute By Id
module.exports.getInstituteByIdMethod = async function (req, res, next) {
  try {
    const data = { _id: mongoose.Types.ObjectId(req.params.instituteId) };
    let instituteData = await instituteDAL.getInstituteById(data);
    if (!instituteData)
      return next(new AppError("Institute does not exists!", 404));
    return res.status(200).json({
      status: "SUCCESS",
      message: null,
      data: instituteData,
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

// Update Institute
module.exports.updateInstituteMethod = async function (req, res, next) {
  const data = req.body;
  try {
    let result = await instituteValidator.instituteUpdationSchema.validateAsync(
      data
    );
    data._id = mongoose.Types.ObjectId(req.params.instituteId);
    const instituteExsits = await instituteDAL.getInstituteById(data);
    if (!instituteExsits)
      return next(new AppError("user does not exists!", 404));
    result._id = mongoose.Types.ObjectId(req.params.instituteId);
    result.updatedAt = new Date();
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

// Delete Institute
module.exports.deleteInstituteMethod = async function (req, res, next) {
  try {
    const data = { _id: mongoose.Types.ObjectId(req.params.instituteId) };
    const instituteExsits = await instituteDAL.getInstituteById(data);
    if (!instituteExsits)
      return next(new AppError("Organisation does not exists!", 404));
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

module.exports.instLogoUploadMethod = async function (req, res, next) {
  if (!req.file) return next(new AppError("No file uploaded!", 400));
  return res.status(200).json({
    status: "SUCCESS",
    message: "Institute logo uploaded successfully!",
    data: { instituteLogo: `${req.file.filename}` },
  });
};

module.exports.instLogoDeleteMethod = async function (req, res, next) {
  const data = req.params.instituteLogo;
  const filePath = path.join(
    __dirname,
    `../../../uploads/institute_logo/${data}`
  );
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(colors.red, "inside err...");
      if (err.code == "ENOENT")
        return next(new AppError("Institute logo not found", 404));
      return next(new AppError("Unable to delete the file", 400));
    }
    return res.status(200).json({
      status: "SUCCESS",
      message: "Institute logo removed successfully",
      data: null,
    });
  });
};

module.exports.search_student = async (req, res, next) => {
  let user_input = req.body;
  try {
    const data = await studentDAL.search_student_new(user_input);
    return res.status(200).json({
      status: 200,
      message: "success",
      data: data,
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

module.exports.getInstitutionName = async (req, res, next) => {
  try {
    let result = await instituteDAL.showListInstitution();
    return res.status(200).json({ status: 200, message: null, data: result });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};
