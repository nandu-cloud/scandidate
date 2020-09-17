const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const AppError = require("./../../../helpers/appError");
const colors = require("./../../../helpers/colors");
const userDAL = require("./userDAL");

const saltRounds = 10;

module.exports.createUserMethod = async function (req, res, next) {
  const data = req.body;
  if (!data.password) {
    data.password = data.phoneNumber.toString();
  }
  try {
    // password encryption
    var hash = bcrypt.hashSync(data.password, saltRounds);
    data.password = hash;

    try {
      let userData = await userDAL.createUser(data);
      return res.status(200).json({ status: "SUCCESS", data: userData });
    } catch (err) {
      console.log(colors.red, `createUserMethod err ${err}`);
      // send status code 400 i.e error with json object
      return next(new AppError(err, 400));
    }
  } catch (err) {
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
  const data = { _id: mongoose.Types.ObjectId(req.params.userId) };
  try {
    let userData = await userDAL.getUserById(data);
    return res.status(200).json({
      status: "SUCCESS",
      message: null,
      data: userData,
    });
  } catch (err) {
    console.log(colors.red, `getUserByIdMethod err ${err}`);
    return next(new AppError(err, 400));
  }
};

module.exports.updateMethod = async function (req, res, next) {
  const data = req.body;
  data._id = mongoose.Types.ObjectId(req.params.userId);

  try {
    let userData = await userDAL.getUserById(data);
    return res.status(200).json({
      status: "SUCCESS",
      message: "user has been updated successfully",
      data: userData,
    });
  } catch (err) {
    console.log(colors.red, `updateMethod err ${err}`);
    return next(new AppError(err, 400));
  }
};

module.exports.deleteUserMethod = async function (req, res) {
  const data = { _id: mongoose.Types.ObjectId(req.params.userId) };
  try {
    let userData = await userDAL.deleteUser(data);

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
