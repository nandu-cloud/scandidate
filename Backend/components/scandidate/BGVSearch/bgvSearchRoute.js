const express = require("express");
const router = express.Router();
const authJWT = require("../../../middlewares/authJWT");
const bgvController = require("./bgvController");

router.route("/").post(authJWT.verifyJWTToken, bgvController.searchbgv);

router
  .route("/:searchbyid/:id")
  .get(authJWT.verifyJWTToken, bgvController.searchByIdBGV);

router
  .route("/icon/show")
  .post(authJWT.verifyJWTToken, bgvController.searchIconOrganizationInstitute);

module.exports = router;
