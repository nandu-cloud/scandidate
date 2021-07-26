const express = require("express");
const router = express.Router();
const saveNowController = require("./savenowController");
const authJWT = require("../../../middlewares/authJWT");

router
  .route("/savenow")
  .post(authJWT.verifyJWTToken, saveNowController.saveNowCandidate);

module.exports = router;
