const mongoose = require("mongoose");
const AppError = require("./../../../helpers/appError");
const colors = require("./../../../helpers/colors");
const bgvDAL = require("./bgvDAL.JS");

module.exports.searchbgv = (req, res, next) => {
    return res.json(req.body);
}