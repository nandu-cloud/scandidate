const express = require("express");
const router = express.Router();
const saveNowController = require("./savenowController");
const authJWT = require("../../../middlewares/authJWT");

router
  .route("/")
  .post(authJWT.verifyJWTToken, saveNowController.saveNowExEmployee);

module.exports = router;
