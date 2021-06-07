const express = require("express");
const router = express.Router();
const addUserController = require("./addUserController");
const authJWT = require("./../../../../middlewares/authJWT");

router
  .route("/")
  .post(authJWT.verifyJWTToken, addUserController.createOppsUserMethod);

router
  .route("/:hrorganisationId")
  .get(authJWT.verifyJWTToken, addUserController.getAllMethod);

router
  .route("/oppsUser/:userId")
  .get(authJWT.verifyJWTToken, addUserController.getUserByIdMethod)
  .put(authJWT.verifyJWTToken, addUserController.updateMethod);

module.exports = router;
