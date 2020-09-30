const express = require("express");
let router = express.Router();
let authController = require("./authController");

router.route("/").post(authController.getUserAuth);

router.route("/sendemailotp").put(authController.sendOTPEmail);

router.route("/verifyotp").put(authController.verifyOTP);

router.route("/loginpasswordreset").put(authController.loginPasswordReset);

router.route("/passwordreset/:userId").put(authController.resetPassword);

module.exports = router;
