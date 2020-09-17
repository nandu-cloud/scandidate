const authDAL = require("./authDAL");
const bcrypt = require("bcrypt");
const authJWT = require("./../../middlewares/authJWT");

const colors = require("./../../helpers/colors");
const AppError = require("./../../helpers/appError");

module.exports.getUserAuth = async function (req, res, next) {
  //     try {
  //        const data = { email: req.body.email, password: req.body.password };
  //   } catch (error) {
  //     if (error.isJoi === true) {
  //       return next(new AppError(error.message, 422));
  //     }
  //   }
  const data = {
    email: req.body.email.toLowerCase(),
    password: req.body.password,
  };
  try {
    let userData = await authDAL.authUser(data);
    if (userData != null) {
      try {
        const match = await bcrypt.compare(data.password, userData.password);
        if (match) {
          const token = await authJWT.signJWTToken({
            _id: userData._id,
            role: userData.role,
            subRole: userData.subRole,
          });
          userData.password = undefined;
          // eslint-disable-next-line node/no-unsupported-features/es-syntax
          let resData = { ...userData, token };
          res.header("Authorization", token).status(200).json({
            status: "SUCCESS",
            message: "Login successfull !",
            data: resData,
          });
        } else {
          return next(new AppError("password is incorrect !", 400));
        }
      } catch (err) {
        console.log(colors.red, `bcrypt compare err ${err}`);
        return next(new AppError(err, 400));
      }
    } else {
      return next(new AppError("The user does not exists !", 400));
    }
  } catch (err) {
    return next(new AppError(err, 400));
  }
};
