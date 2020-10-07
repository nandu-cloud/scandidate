const express = require("express");
const router = express.Router();
const multer = require("multer");
const short = require("short-uuid");
const mime = require("mime");
const path = require("path");
const addStudentController = require("./studentController");
const authJWT = require("./../../../../middlewares/authJWT");

// organization logo images Storage Path
const uploadPath = path.join(__dirname, "../../../../uploads/student_doc");

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
  if (ext === "png" || ext === "jpeg" || ext === "doc" || ext === "pdf" || ext === "docx") {
    cb(null, true);
  } else {
    cb(new Error("The file extension is invalid! only png/jpeg are accepted."));
    // cb(null, false);
  }
}
let upload = multer({ storage: storage, fileFilter: fileFilter });
let multiUpload = multer({ storage : storage,fileFilter: fileFilter })

router
  .route("/uploadExtraActivityDoc")
  .post(
    authJWT.verifyJWTToken,
    upload.single("extraActivityDoc"),
    addStudentController.extraActivityDocUpload
  );

router
  .route("/uploadFiles")
  .post(
    authJWT.verifyJWTToken,
    multiUpload.array('files', 12),
    addStudentController.fileUpload
  );

router
  .route("/")
  .post(authJWT.verifyJWTToken, addStudentController.addStudentMethod)
  .get(authJWT.verifyJWTToken, addStudentController.getAllMethod);

router
  .route("/:studentId")
  .get(authJWT.verifyJWTToken, addStudentController.getStudentByIdMethod)
  .put(authJWT.verifyJWTToken, addStudentController.updateMethod);

module.exports = router;
