const express = require("express");
const router = express.Router();

const addEmployeeController = require("./employeeController");
const authJWT = require("./../../../../middlewares/authJWT"); 

router
  .route("/")
  .post(authJWT.verifyJWTToken, addEmployeeController.addEmployeeMethod)
  .get(authJWT.verifyJWTToken, addEmployeeController.getAllMethod);

router
.route("/:employeeId")
.get(authJWT.verifyJWTToken, addEmployeeController.getEmployeeByIdMethod)
.put(authJWT.verifyJWTToken, addEmployeeController.updateMethod);

module.exports = router;