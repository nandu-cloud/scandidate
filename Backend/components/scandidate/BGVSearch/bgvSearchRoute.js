const express = require("express");
const router = express.Router();
const authJWT = require("../../../middlewares/authJWT");
const bgvController = require("./bgvController");
const bgvemail = require("../bgvemail/bgvemail");

router.route("/:userId").post(authJWT.verifyJWTToken, bgvController.searchbgv);

router
  .route("/:searchbyid/:id")
  .get(authJWT.verifyJWTToken, bgvController.searchByIdBGV);

router
  .route("/icon/show")
  .post(authJWT.verifyJWTToken, bgvController.searchIconOrganizationInstitute);

router
  .route("/searched-candidate/download")
  .post(authJWT.verifyJWTToken, bgvController.downloadscandidateSeach);

router
  .route("/scandidatereport/bgvreportemail/:id/:organizationId")
  .get(authJWT.verifyJWTToken, bgvemail.createbgvXL);

router
  .route("/scandidatereport/report/sendemail")
  .post(authJWT.verifyJWTToken, bgvemail.sendemail);

module.exports = router;
