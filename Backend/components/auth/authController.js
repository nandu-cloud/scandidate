const bcrypt = require("bcrypt");
const AWS = require("aws-sdk");
require("dotenv").config();
const ejs = require("ejs");
const path = require("path");
const authDAL = require("./authDAL");
const userDAL = require("./../scandidate/user/userDAL");
const authJWT = require("./../../middlewares/authJWT");
const authValidator = require("./authValidator");
const colors = require("./../../helpers/colors");
const AppError = require("./../../helpers/appError");
const saltRounds = 10;

// AWS Configs
AWS.config.update({
  accessKeyId: process.env.AWSACCESSKEYID,
  secretAccessKey: process.env.AWSSECRETACCESSKEY,
  region: process.env.AWSREGION,
});

module.exports.getUserAuth = async function (req, res, next) {
  try {
    try {
      await authValidator.authSchema.validateAsync(req.body);
    } catch (error) {
      if (error.isJoi === true) return next(new AppError(error.message, 422));
    }
    const data = {
      email: req.body.email.toLowerCase(),
      password: req.body.password,
    };
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

module.exports.sendOTPEmail = async function (req, res, next) {
  try {
    const data = {
      email: req.body.email.toLowerCase(),
    };
    let result = await authValidator.otpSchema.validateAsync(data);
    let userData = await authDAL.authUser(result);
    if (!userData)
      return next(new AppError("The user email does not exists !", 404));

    userData.otp = Math.floor(1000 + Math.random() * 9000);
    userData.logo = `${process.env.FRONT_END_URL}/assets/images/logo1.png`;
    userData.url = `${process.env.FRONT_END_URL}`;
    let html = `Please find the OTP below to reset your password:\nOTP : ${userData.otp}\nThanks & Regards\nScandidate.in`;
    try {
      html = await ejs.renderFile(
        path.join(
          __dirname,
          "./../../helpers/email-templates/password-reset-otp.ejs"
        ),
        userData
      );
    } catch (err) {
      console.log("password-reset-otp.ejs template render error");
    }

    // Create sendEmail params
    var params = {
      Destination: {
        ToAddresses: [userData.email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: html,
          },
          Text: {
            Charset: "UTF-8",
            Data: `Please find the OTP below to reset your password:\nOTP : ${userData.otp}\nThanks & Regards\nScandidate.in`,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Scandidate Reset Password OTP",
        },
      },
      Source: "Scandidate.in" + process.env.AWSSENDERMAILID,
    };
    // Create the promise and SES service object
    var sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
      .sendEmail(params)
      .promise();

    // Handle promise's fulfilled/rejected states
    sendPromise
      .then(async (data) => {
        try {
          await authDAL.updateOTP(userData);
          return res.status(200).json({
            status: "SUCCESS",
            message: `OTP sent to your email ${userData.email}. Please verify OTP for password reset`,
          });
        } catch (err) {
          next(new AppError("Failed to update the OTP !!!", 400));
        }
      })
      .catch((err) =>
        next(new AppError("Failed to send OTP through email !!!", 400))
      );
  } catch (error) {
    if (error.isJoi === true) return next(new AppError(error.message, 422));
    return next(new AppError(error, 400));
  }
};

module.exports.verifyOTP = async function (req, res, next) {
  try {
    const data = {
      email: req.body.email.toLowerCase(),
      otp: req.body.otp,
    };
    let result = await authValidator.verifyOTPSchema.validateAsync(data);
    let userData = await authDAL.authUser(result);
    if (!userData)
      return next(new AppError("The user email does not exists !", 404));
    if (data.otp !== userData.otp) {
      return res.status(400).json({
        status: "FAIL",
        message: "OTP does not match",
        data: { isVerified: false },
      });
    } else {
      return res.status(200).json({
        status: "SUCCESS",
        message: "OTP is valid",
        data: { isVerified: true },
      });
    }
  } catch (error) {
    if (error.isJoi === true) return next(new AppError(error.message, 422));
    return next(new AppError(error, 400));
  }
};

module.exports.loginPasswordReset = async function (req, res, next) {
  try {
    const data = {
      email: req.body.email.toLowerCase(),
      newPassword: req.body.newPassword,
      confirmPassword: req.body.confirmPassword,
    };
    let result = await authValidator.loginPasswordResetSchema.validateAsync(
      data
    );
    let userData = await authDAL.authUser(result);
    if (!userData)
      return next(new AppError("The user email does not exists !", 404));
    // password encryption
    let hash = bcrypt.hashSync(data.newPassword, saltRounds);
    result.hash = hash;
    await authDAL.updateNewPassword(result);
    res.status(200).json({
      status: "SUCCESS",
      message: "The password has been changed successfully!",
    });
  } catch (error) {
    if (error.isJoi === true) return next(new AppError(error.message, 422));
    console.log(colors.red, ` err:${error}`);
    return next(new AppError(error, 400));
  }
};

module.exports.resetPassword = async function (req, res, next) {
  try {
    const data = {
      _id: req.params.userId,
      newPassword: req.body.newPassword,
      confirmPassword: req.body.confirmPassword,
    };
    let result = await authValidator.passwordResetSchema.validateAsync(data);
    let userData = await userDAL.getUserById(result);
    if (!userData)
      return next(new AppError("The user id does not exists !", 404));
    // password encryption
    let hash = bcrypt.hashSync(data.newPassword, saltRounds);
    result.hash = hash;
    await authDAL.updateNewPasswordById(result);
    res.status(200).json({
      status: "SUCCESS",
      message: "The password has been changed successfully!",
    });
  } catch (error) {
    if (error.isJoi === true) return next(new AppError(error.message, 422));
    console.log(colors.red, `err:${error}`);
    return next(new AppError(error, 400));
  }
};
