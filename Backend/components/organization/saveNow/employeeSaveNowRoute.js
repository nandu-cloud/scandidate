const express = require("express");
const router = express.Router();
const authJWT = require("../../../middlewares/authJWT");
const employeeController = require("./employeeSaveNowController");

router
  .route("/saveNow/:id")
  .post(authJWT.verifyJWTToken, employeeController.addEmployeeMethod);

router
  .route("/getEmployee/:id")
  .get(authJWT.verifyJWTToken, employeeController.showEmployee);

module.exports = router;
