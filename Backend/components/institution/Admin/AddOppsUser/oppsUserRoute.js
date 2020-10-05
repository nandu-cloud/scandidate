const express = require("express");
const router = express.Router();;
const oppsUserController = require("./oppsUserController");
const authJWT = require("./../../../../middlewares/authJWT");

router
  .route("/")
  .post(authJWT.verifyJWTToken, oppsUserController.createOppsUserMethod);

router
  .route("/:instituteId")  
  .get(authJWT.verifyJWTToken, oppsUserController.getAllMethod);

router
  .route("/oppsUser/:userId")
  .get(authJWT.verifyJWTToken, oppsUserController.getUserByIdMethod)
  .put(authJWT.verifyJWTToken, oppsUserController.updateMethod)
  //.delete(authJWT.verifyJWTToken, oppsUserController.deleteUserMethod);

module.exports = router;
