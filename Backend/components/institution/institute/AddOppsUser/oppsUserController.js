const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
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

// //Get All User Based On Institute

// module.exports.getAllMethod = async function (req, res, next) {
//   const data = {};
//   try {
//     const data = { _id: mongoose.Types.ObjectId(req.params.instituteId) };
//     let userData = await userDAL.getAllUsers(data);
//     if (!userData) return next(new AppError("user does not exists!", 404));
//     return res.status(200).json({
//       status: "SUCCESS",
//       message: "user fields",
//       data: userData,
//     });
//   } catch (err) {
//     console.log(colors.red, `getUserByIdMethod err ${err}`);
//     return next(new AppError(err, 400));
//   }
// };

