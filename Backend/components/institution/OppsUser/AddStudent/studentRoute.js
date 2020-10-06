const express = require("express");
const router = express.Router();
const addStudentController = require("./studentController");
const authJWT = require("./../../../../middlewares/authJWT");

router
  .route("/")
  .post(authJWT.verifyJWTToken, addStudentController.addStudentMethod)
  .get(authJWT.verifyJWTToken, addStudentController.getAllMethod);

router
.route("/:studentId")
.get(authJWT.verifyJWTToken, addStudentController.getStudentByIdMethod)
.put(authJWT.verifyJWTToken, addStudentController.updateMethod)
//.delete(authJWT.verifyJWTToken, oppsUserController.deleteUserMethod);
module.exports = router;
