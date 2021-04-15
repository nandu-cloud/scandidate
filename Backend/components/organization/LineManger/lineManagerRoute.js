const express = require("express");
const router = express.Router();
const authJWT = require("../../../middlewares/authJWT");
const lineMgmntController = require("./LineManagerontroller");

router
  .route("/show/assignedEmployee/:id")
  .get(authJWT.verifyJWTToken, lineMgmntController.showEmployeeAssignedDetails);


router
  .route("/savenow/assigneddata/:empId/:linemanagerId")
  .post(authJWT.verifyJWTToken, lineMgmntController.assignedDataTolineManager);


router
  .route("/checkLinemanagerName/:empId")
  .get(authJWT.verifyJWTToken, lineMgmntController.checkLineManager);

module.exports = router;
