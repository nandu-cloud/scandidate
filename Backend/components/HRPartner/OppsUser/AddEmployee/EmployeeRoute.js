const express = require("express");
const router = express.Router();
const authJWT = require("../../../../middlewares/authJWT");
const empController = require("./EmployeeController");

router.route("/").post(authJWT.verifyJWTToken, empController.addEmployee);

router
  .route("/getEmployee/:hrpartnerId")
  .get(authJWT.verifyJWTToken, empController.getEmployee);

module.exports = router;
