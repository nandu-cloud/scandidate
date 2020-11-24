const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const AppError = require("./../../../../helpers/appError");
const colors = require("./../../../../helpers/colors");
const userDAL = require("./oppsUserDAL");
const authDAL = require("./../../../auth/authDAL");
const userValidator = require("./oppsUserValidator");
const saltRounds = 10;

module.exports.createOppsUserMethod = async function (req, res, next) {
  const data = req.body;
  try {
    await userValidator.userCreationSchema.validateAsync(data);
    let emailExists = await authDAL.authUser(data);
    if (emailExists != null)
      return next(new AppError("User email already exsits!", 404));

    if (!data.password) {
      data.password = data.phoneNumber.toString();
    }
    // password encryption
    let hash = bcrypt.hashSync(data.password, saltRounds);
    data.password = hash;
    try {
      let userData = await userDAL.createUser(data);
      let template = userData;
      template.logo = `${process.env.FRONT_END_URL}/logo1.png`;
      template.password = data.phoneNumber.toString();
      template.url = `${process.env.FRONT_END_URL}`;
      template.subject = "Welcome to Scandidate!";
      try {
        template.html = await ejs.renderFile(
          path.join(
            __dirname,
            "../../../../helpers/email-templates/user-creation.ejs"
          ),
          template
        );
        // Email sending
        email.sendEmail(template);
      } catch (err) {
        console.log("user-creation.ejs template render error");
      }
      return res.status(201).json({ status: "SUCCESS", data: userData });
    } catch (err) {
      console.log(colors.red, `createUserMethod err ${err}`);
      return next(new AppError(err, 400));
    }
  } catch (error) {
    if (error.isJoi === true) return next(new AppError(error.message, 422));
    console.log(colors.red, `bcrypt err:${error}`);
    return next(new AppError(error, 400));
  }
};

//Get All User Based On Institute

module.exports.getAllMethod = async function (req, res, next) {
  try {
    const data = {
      institutionId: mongoose.Types.ObjectId(req.params.instituteId),
    };
    let userData = await userDAL.getAllUsers(data);
    if (!userData) return next(new AppError("user does not exists!", 404));
    return res.status(200).json({
      status: "SUCCESS",
      message: "user fields",
      data: userData,
    });
  } catch (err) {
    console.log(colors.red, `getUserByIdMethod err ${err}`);
    return next(new AppError(err, 400));
  }
};

//Get By Id
module.exports.getUserByIdMethod = async function (req, res, next) {
  try {
    const data = { _id: mongoose.Types.ObjectId(req.params.userId) };
    let userData = await userDAL.getUserById(data);
    if (!userData) return next(new AppError("user does not exists!", 404));
    return res.status(200).json({
      status: "SUCCESS",
      message: "user fields",
      data: userData,
    });
  } catch (err) {
    console.log(colors.red, `getUserByIdMethod err ${err}`);
    return next(new AppError(err, 400));
  }
};

module.exports.updateMethod = async function (req, res, next) {
  const data = req.body;
  try {
    const userExsits = await userDAL.getUserById({ _id: req.params.userId });
    if (!userExsits) return next(new AppError("user does not exists!", 404));
    let result = await userValidator.updationSchema.validateAsync(data);
    result._id = mongoose.Types.ObjectId(req.params.userId);
    result.updatedAt = new Date();
    let userData = await userDAL.updateUser(result);
    return res.status(200).json({
      status: "SUCCESS",
      message: "user has been updated successfully",
      data: userData,
    });
  } catch (error) {
    if (error.isJoi === true) return next(new AppError(error.message, 422));
    console.log(colors.red, `updateMethod err ${error}`);
    return next(new AppError(error, 400));
  }
};
