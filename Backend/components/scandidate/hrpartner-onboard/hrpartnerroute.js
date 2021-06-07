const express = require("express");
const router = express.Router();
const authJWT = require("../../../middlewares/authJWT");
const hrpartnerController = require("./hrpartnerController");

router
  .route("/")
  .post(authJWT.verifyJWTToken, hrpartnerController.addhrpartner)
  .get(authJWT.verifyJWTToken, hrpartnerController.getAllHRpartner);

router
  .route("/:hrorganisationId")
  .get(authJWT.verifyJWTToken, hrpartnerController.getHrPartnerById)
  .put(authJWT.verifyJWTToken, hrpartnerController.updateHrPartner);

module.exports = router;
