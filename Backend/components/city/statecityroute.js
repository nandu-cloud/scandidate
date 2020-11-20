const express = require("express");
const router = express.Router();
const authJWT = require("../../middlewares/authJWT");
const stateController = require('./statecityController');


router
    .route("/saveData")
    .post(authJWT.verifyJWTToken, stateController.saveStateCityDistrict);


router
    .route("/getstates/:id")
    .get(authJWT.verifyJWTToken, stateController.showState);



module.exports = router;