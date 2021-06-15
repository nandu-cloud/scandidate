const express = require("express");
const router = express.Router();
const saveNowController = require("./savenowController");
const authJWT = require("../../../middlewares/authJWT");

router
  .route("/:candidateId")
  .post(authJWT.verifyJWTToken, saveNowController.saveNowExEmployee)
  .get(authJWT.verifyJWTToken, saveNowController.getSaveNowCandidate);

module.exports = router;
