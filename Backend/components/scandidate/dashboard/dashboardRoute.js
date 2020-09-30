const express = require("express");
const router = express.Router();
const authJWT = require("./../../../middlewares/authJWT");
const dashboardController = require("./dashboardController");

router
  .route("/count")
  .get(authJWT.verifyJWTToken, dashboardController.countTotalOrgInstUsers);

router
  .route("/orgonboardtrend")
  .put(authJWT.verifyJWTToken, dashboardController.orgOnboardTrend);

router
  .route("/instonboardtrend")
  .put(authJWT.verifyJWTToken, dashboardController.instOnboardTrend);

module.exports = router;
