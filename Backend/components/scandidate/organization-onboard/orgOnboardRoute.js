const express = require("express");
const router = express.Router();
const multer = require("multer");
const short = require("short-uuid");
const mime = require("mime");
const path = require("path");
const orgOnboardController = require("./orgOnboardController");
const authJWT = require("./../../../middlewares/authJWT");

// organization logo images Storage Path
const uploadPath = path.join(__dirname, "../../../uploads/organization_logo");
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
  .post(authJWT.verifyJWTToken, orgOnboardController.onboardOrganisationMethod)
  .get(authJWT.verifyJWTToken, orgOnboardController.getAllMethod);

router
  .route("/listOfOrganization")
  .get(authJWT.verifyJWTToken, orgOnboardController.getOrganisationName);

router
  .route("/:organisationId")
  .get(authJWT.verifyJWTToken, orgOnboardController.getOrganisationByIdMethod)
  .put(authJWT.verifyJWTToken, orgOnboardController.updateOrganisationMethod)
  .delete(
    authJWT.verifyJWTToken,
    orgOnboardController.deleteOrganisationMethod
  );

router
  .route("/uploadlogo")
  .post(
    authJWT.verifyJWTToken,
    upload.single("logo"),
    orgOnboardController.orgLogoUploadMethod
  );

router
  .route("/deletelogo/:orgLogo")
  .delete(authJWT.verifyJWTToken, orgOnboardController.orgLogoDeleteMethod);

router
  .route("/search/employee")
  .post(authJWT.verifyJWTToken, orgOnboardController.search_employee);

module.exports = router;
