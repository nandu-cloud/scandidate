const express = require("express");
const router = express.Router();
const userController = require("./userController");
const authJWT = require("./../../../middlewares/authJWT");

router
  .route("/")
  .post(authJWT.verifyJWTToken, userController.createUserMethod)
  .get(authJWT.verifyJWTToken, userController.getAllMethod);

router
  .route("/:userId")
  .get(authJWT.verifyJWTToken, userController.getUserByIdMethod)
  .put(authJWT.verifyJWTToken, userController.updateMethod)
  .delete(authJWT.verifyJWTToken, userController.deleteUserMethod);

module.exports = router;
