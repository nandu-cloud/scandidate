const express = require("express");
const router = express.Router();
const orgOnboardController = require("./orgOnboardController");
const authJWT = require("./../../../middlewares/authJWT");

router
  .route("/")
  .post(authJWT.verifyJWTToken, orgOnboardController.onboardOrganisationMethod)
  .get(authJWT.verifyJWTToken, orgOnboardController.getAllMethod);


  router
  .route("/:organisationId")
  .get(authJWT.verifyJWTToken, orgOnboardController.getOrganisationByIdMethod)
  .put(authJWT.verifyJWTToken, orgOnboardController.updateOrganisationMethod)
  .delete(authJWT.verifyJWTToken, orgOnboardController.deleteOrganisationMethod);

module.exports = router;
