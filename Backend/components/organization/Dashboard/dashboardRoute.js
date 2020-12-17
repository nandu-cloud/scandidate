const express = require("express");
const router = express.Router();
const authJWT = require("./../../../middlewares/authJWT");
const dashboardController = require("./dashboardController");

router
  .route("/count/:organisationId")
  .get(authJWT.verifyJWTToken, dashboardController.countTotalOrgUsers);

module.exports = router;
