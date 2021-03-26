const express = require("express");
const router = express.Router();
const multer = require("multer");
const short = require("short-uuid");
const mime = require("mime");
const path = require("path");
const userController = require("./userController");
const authJWT = require("./../../../middlewares/authJWT");

// user images Storage Path
const uploadPath = path.join(__dirname, "../../../uploads/user_avatar");
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    let ext = mime.getExtension(file.mimetype);
    cb(null, short.uuid() + "." + ext);
  },
});
function fileFilter(req, file, cb) {
  let ext = mime.getExtension(file.mimetype);
  if (ext === "png" || ext === "jpeg" || ext === "gif") {
    cb(null, true);
  } else {
    cb(new Error("The file extension is invalid! only png/jpeg are accepted."));
    // cb(null, false);
  }
}
let upload = multer({ storage: storage, fileFilter: fileFilter });

router
  .route("/")
  .post(authJWT.verifyJWTToken, userController.createUserMethod)
  .get(authJWT.verifyJWTToken, userController.getAllMethod);

router
  .route("/:userId")
  .get(authJWT.verifyJWTToken, userController.getUserByIdMethod)
  .put(authJWT.verifyJWTToken, userController.updateMethod)
  .delete(authJWT.verifyJWTToken, userController.deleteUserMethod);

router
  .route("/uploadavatar")
  .post(
    authJWT.verifyJWTToken,
    upload.single("avatar"),
    userController.avatarUploadMethod
  );

router
  .route("/deleteavatar/:avatarLink")
  .delete(authJWT.verifyJWTToken, userController.avatarDeleteMethod);

router
  .route("/show/lineManager")
  .get(authJWT.verifyJWTToken, userController.showLineManager);

module.exports = router;
