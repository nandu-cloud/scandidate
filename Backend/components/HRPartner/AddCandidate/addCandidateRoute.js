const express = require("express");
const router = express.Router();
const authJWT = require("../../../middlewares/authJWT");
const candidateController = require("./addCandidateController");

router
  .route("/")
  .post(authJWT.verifyJWTToken, candidateController.saveCandidate);

router
  .route("/:hrorganisationId")
  .get(authJWT.verifyJWTToken, candidateController.showCandidate);

router
  .route("/candidatedata/:candidateId")
  .get(authJWT.verifyJWTToken, candidateController.showCandidateById)
  .put(authJWT.verifyJWTToken, candidateController.updateCandidateData);

module.exports = router;
