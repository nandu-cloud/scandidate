const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const AppError = require("./../../../helpers/appError");
const colors = require("./../../../helpers/colors");
const userDAL = require("./userDAL");
const userValidator = require("./userValidator");
const saltRounds = 10;

module.exports.createUserMethod = async function (req, res, next) {
  const data = req.body;
  try {
    await userValidator.userCreationSchema.validateAsync(data);

    if (!data.password) {
      data.password = data.phoneNumber.toString();
    }
    // password encryption
    let hash = bcrypt.hashSync(data.password, saltRounds);
    data.password = hash;

    try {
      let userData = await userDAL.createUser(data);
      return res.status(201).json({ status: "SUCCESS", data: userData });
    } catch (err) {
      console.log(colors.red, `createUserMethod err ${err}`);
      // send status code 400 i.e error with json object
      return next(new AppError(err, 400));
    }
  } catch (error) {
    if (error.isJoi === true) return next(new AppError(error.message, 422));
    console.log(colors.red, `bcrypt err:${err}`);
    return next(new AppError(err, 400));
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
  } catch (err) {
    if (error.isJoi === true) return next(new AppError(error.message, 422));
    console.log(colors.red, `updateMethod err ${err}`);
    return next(new AppError(err, 400));
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
