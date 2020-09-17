const express = require("express");
var router = express.Router();
var authController = require("./authController");

router.route("/").post(authController.getUserAuth);

module.exports = router;
