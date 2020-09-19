const express = require("express");
const router = express.Router();
const instituteOnboardController = require("./instituteOnboardController");
const authJWT = require("./../../../middlewares/authJWT");

router
  .route("/")
  .post(authJWT.verifyJWTToken, instituteOnboardController.onboardInstituteMethod)
  .get(authJWT.verifyJWTToken, instituteOnboardController.getAllMethod);

  router
  .route("/:instituteId")
  .get(authJWT.verifyJWTToken, instituteOnboardController.getInstituteByIdMethod)
  .put(authJWT.verifyJWTToken, instituteOnboardController.updateInstituteMethod)
  .delete(authJWT.verifyJWTToken, instituteOnboardController.deleteInstituteMethod);

module.exports = router;