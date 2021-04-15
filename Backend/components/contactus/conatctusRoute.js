const express = require('express');
const router = express.Router();
const AppError = require('../../helpers/appError');
const colors = require("../../helpers/colors");
const contactController = require('./contactUsController');

router
    .route("/employee/savecontact")
    .post(contactController.savecontactus);


module.exports = router;