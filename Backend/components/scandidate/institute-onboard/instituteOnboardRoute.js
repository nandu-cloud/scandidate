const express = require("express");
const router = express.Router();
const multer = require("multer");
const short = require("short-uuid");
const mime = require("mime");
const path = require("path");
const instituteOnboardController = require("./instituteOnboardController");
const authJWT = require("./../../../middlewares/authJWT");

// institute logo images Storage Path
const uploadPath = path.join(__dirname, "../../../uploads/institute_logo");
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
  .post(
    authJWT.verifyJWTToken,
    instituteOnboardController.onboardInstituteMethod
  )
  .get(authJWT.verifyJWTToken, instituteOnboardController.getAllMethod);

router
  .route("/:instituteId")
  .get(
    authJWT.verifyJWTToken,
    instituteOnboardController.getInstituteByIdMethod
  )
  .put(authJWT.verifyJWTToken, instituteOnboardController.updateInstituteMethod)
  .delete(
    authJWT.verifyJWTToken,
    instituteOnboardController.deleteInstituteMethod
  );

router
  .route("/uploadlogo")
  .post(
    authJWT.verifyJWTToken,
    upload.single("logo"),
    instituteOnboardController.instLogoUploadMethod
  );

router
  .route("/deletelogo/:instituteLogo")
  .delete(
    authJWT.verifyJWTToken,
    instituteOnboardController.instLogoDeleteMethod
  );

router
  .route("/student/search")
  .get(authJWT.verifyJWTToken, instituteOnboardController.searchStudent);

module.exports = router;
