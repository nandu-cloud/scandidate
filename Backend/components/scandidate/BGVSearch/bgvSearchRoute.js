const express = require("express");
const router = express.Router();
const authJWT = require("../../../middlewares/authJWT");
const bgvController = require("./bgvController");

router.route("/").post(authJWT.verifyJWTToken, bgvController.searchbgv);

router
  .route("/searchbyid")
  .post(authJWT.verifyJWTToken, bgvController.searchbgv);

module.exports = router;
