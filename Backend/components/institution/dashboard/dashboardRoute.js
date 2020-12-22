const express = require("express");
const router = express.Router();
const authJWT = require("./../../../middlewares/authJWT");
const dashboardController = require("./dashboardController");

router
  .route("/count/:instituteId/:id")
  .get(authJWT.verifyJWTToken, dashboardController.countTotalInstUsers);

module.exports = router;
