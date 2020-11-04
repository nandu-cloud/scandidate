const express = require("express");
const router = express.Router();
const authJWT = require("../../../middlewares/authJWT");
const bgvController = require("./bgvController");

router.route("/").post(authJWT.verifyJWTToken, bgvController.searchbgv);

router
  .route("/:searchbyid")
  .get(authJWT.verifyJWTToken, bgvController.searchById);

module.exports = router;
