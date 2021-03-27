const express = require("express");
const router = express.Router();
const authJWT = require("../../../middlewares/authJWT");
const lineMgmntController = require("./LineManagerontroller");

router
  .route("/show/assignedEmployee/:id")
  .get(authJWT.verifyJWTToken, lineMgmntController.showEmployeeAssignedDetails);

module.exports = router;
