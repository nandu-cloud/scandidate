const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const AppError = require("./../../../helpers/appError");
const colors = require("./../../../helpers/colors");
const userDAL = require("./userDAL");
const authDAL = require("./../../auth/authDAL");
const userValidator = require("./userValidator");
const saltRounds = 10;

module.exports.createUserMethod = async function (req, res, next) {
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

      //Email sending



      return res.status(201).json({ status: "SUCCESS", data: userData });
    } catch (err) {
      console.log(colors.red, `createUserMethod err ${err}`);
      // send status code 400 i.e error with json object
      return next(new AppError(err, 400));
    }
  } catch (error) {
    if (error.isJoi === true) return next(new AppError(error.message, 422));
    console.log(colors.red, `bcrypt err:${error}`);
    return next(new AppError(error, 400));
  }
};

module.exports.getAllMethod = async function (req, res, next) {
  const data = {};
  try {
    let userData = await userDAL.getAllUsers(data);
    return res
      .status(200)
      .json({ status: "SUCCESS", message: null, data: userData });
  } catch (err) {
    console.log(colors.red, `getAllMethod err ${err}`);
    return next(new AppError(err, 400));
  }
};

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

module.exports.deleteUserMethod = async function (req, res, next) {
  try {
    const data = { _id: mongoose.Types.ObjectId(req.params.userId) };
    const userExsits = await userDAL.getUserById(data);
    if (!userExsits) return next(new AppError("user does not exists!", 404));
    const userData = await userDAL.deleteUser(data);
    return res.status(200).json({
      status: "SUCCESS",
      message: "User has been deleted successfully !",
      data: userData,
    });
  } catch (err) {
    console.log(colors.red, `deleteUserMethod err ${err}`);
    return next(new AppError(err, 400));
  }
};

module.exports.avatarUploadMethod = async function (req, res, next) {
  if (!req.file) return next(new AppError("No file uploaded!", 400));
  return res.status(200).json({
    status: "SUCCESS",
    message: "user avatar image uploaded successfully!",
    data: { avatarLink: `${req.file.filename}` },
  });
};

module.exports.avatarDeleteMethod = async function (req, res, next) {
  const data = req.params.avatarLink;
  const filePath = path.join(__dirname, `../../../uploads/user_avatar/${data}`);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(colors.red, "inside err...");
      if (err.code == "ENOENT")
        return next(new AppError("user avatar not found", 404));
      return next(new AppError("Unable to delete the file", 400));
    }
    return res.status(200).json({
      status: "SUCCESS",
      message: "user avatar removed successfully",
      data: null,
    });
  });
};
