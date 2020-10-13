const express = require("express");
const router = express.Router();
const authJWT = require("./../../../middlewares/authJWT");
const dashboardController = require("./dashboardController");

router
  .route("/count/:instituteId")
  .get(authJWT.verifyJWTToken, dashboardController.countTotalOrgInstUsers);

module.exports = router;
