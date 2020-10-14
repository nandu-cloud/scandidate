const express = require("express");
const router = express.Router();
const multer = require("multer");
const short = require("short-uuid");
const mime = require("mime");
const path = require("path");
const addEmployeeController = require("./employeeController");
const authJWT = require("./../../../../middlewares/authJWT"); 

router
  .route("/")
  .post(authJWT.verifyJWTToken, addEmployeeController.addEmployeeMethod);
//   .get(authJWT.verifyJWTToken, addEmployeeController.getAllMethod);

// router
//   .route("/:studentId")
//   .get(authJWT.verifyJWTToken, addEmployeeController.getStudentByIdMethod)
//   .put(authJWT.verifyJWTToken, addEmployeeController.updateMethod);

module.exports = router;