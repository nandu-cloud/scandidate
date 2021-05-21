const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const short = require("short-uuid");
const mime = require("mime");
const addEmployeeController = require("./employeeController");
const authJWT = require("./../../../../middlewares/authJWT");

// user Storage Path
const uploadPath = path.join(__dirname, "../../../../uploads/organization_doc");
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    let ext = mime.getExtension(file.mimetype);
    cb(null, short.uuid() + "." + ext);
    // var dateTime = new Date();
    // cb(
    //   null,
    //   dateTime.getDate() +
    //     "-" +
    //     dateTime.getMonth() +
    //     "-" +
    //     dateTime.getFullYear() +
    //     " " +
    //     file.originalname
    // );
  },
});

//Document Filter
function fileFilter(req, file, cb) {
  let ext = mime.getExtension(file.mimetype);
  if (ext === "doc" || ext === "pdf" || ext === "docx") {
    cb(null, true);
  } else {
    cb(new Error("The file extension is invalid! only pdf/doc are accepted."));
    // cb(null, false);
  }
}

let upload = multer({ storage: storage, fileFilter: fileFilter });

router
  .route("/uploads")
  .post(
    authJWT.verifyJWTToken,
    upload.single("document"),
    addEmployeeController.fileUpload
  );

router
  .route("/")
  .post(authJWT.verifyJWTToken, addEmployeeController.addEmployeeMethod);
//.get(authJWT.verifyJWTToken, addEmployeeController.getAllMethod);

router
  .route("/:employeeId")
  .get(authJWT.verifyJWTToken, addEmployeeController.getEmployeeByIdMethod)
  .put(authJWT.verifyJWTToken, addEmployeeController.updateMethod);

router
  .route("/getEmployee/:organisationId")
  .get(authJWT.verifyJWTToken, addEmployeeController.getAllMethod);

router
  .route("/downloadfile/:employeedocumentlink")
  .get(authJWT.verifyJWTToken, addEmployeeController.downloaddocuments);

router
  .route("/deletefile/:employeedocumentlink/:id")
  .delete(authJWT.verifyJWTToken, addEmployeeController.deleteDocument);

router
  .route("/check/duplicateemployeerecord")
  .post(
    authJWT.verifyJWTToken,
    addEmployeeController.checkduplicateEmployeeRecords
  );

router
  .route("/consent/sendEmail/:empId")
  .post(authJWT.verifyJWTToken, addEmployeeController.sendConsentEmail);

router
  .route("/exemployee/validate/:empId/:option")
  .get(addEmployeeController.validateConsent);

module.exports = router;
