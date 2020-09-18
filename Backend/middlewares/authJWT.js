const jwt = require("jsonwebtoken");
require("dotenv").config();
const AppError = require("./../helpers/appError");
const colors = require("./../helpers/colors");

module.exports.verifyJWTToken = async (req, res, next) => {
  const reqHeader = req.header("authorization");
  if (!reqHeader)
    return next(new AppError("Access Denied! No token provided", 401));
  const bearerToken = reqHeader.split(" ");
  const token = bearerToken[1];
  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.decoded = decoded;
    console.log(colors.cyan, decoded);
    return next();
  } catch (err) {
    const message =
      err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
    return next(new AppError(message, 403));
  }
};

module.exports.signJWTToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, function (err, token) {
      if (err) reject(err);
      resolve(token);
    });
  });
};
