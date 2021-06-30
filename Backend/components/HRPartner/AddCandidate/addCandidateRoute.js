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
  .get(authJWT.verifyJWTToken, candidateController.showCandidateById);

router
  .route("/candidateUpdate")
  .put(authJWT.verifyJWTToken, candidateController.updateCandidateData);

router
  .route("/searchOrganization")
  .post(authJWT.verifyJWTToken, candidateController.showOrganization);

router
  .route("/searchInstitution")
  .post(authJWT.verifyJWTToken, candidateController.showInstitution);

router
  .route("/downloadReport/:index")
  .post(authJWT.verifyJWTToken, candidateController.downloadReportPDF);

router
  .route("/check/duplicateCandidateEmployee")
  .post(authJWT.verifyJWTToken, candidateController.checkForDuplicateCandidate);

router
  .route("/check/duplicateCandiateStudent")
  .post(authJWT.verifyJWTToken, candidateController.checkForDuplicateStudent);

module.exports = router;
