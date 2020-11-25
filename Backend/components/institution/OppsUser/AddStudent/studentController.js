const mongoose = require("mongoose");
const AppError = require("./../../../../helpers/appError");
const studentDAL = require("./studentDAL");
const colors = require("./../../../../helpers/colors");
const studentDataValidator = require("./studentValidator");
const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");
const bodyParser = require("body-parser");
const csvValidator = require("csv-validator");

// Add Student
module.exports.addStudentMethod = async function (req, res, next) {
  const data = req.body;
  try {
    await studentDataValidator.addStudentSchema.validateAsync(data);
    let studentData = await studentDAL.addStudent(data);
    return res.status(200).json({ status: "SUCCESS", data: studentData });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

// Upload CSV
module.exports.uploadCsv = async function (req, res, next) {
  let path = req.file.path;
  let id = req.body._id;
  let instituteId = req.body.instituteId;
  try {
    let studentData = await studentDAL.addStudentCsv(path, id, instituteId);
    return res
      .status(200)
      .json({ status: "SUCCESS", message: null, data: studentData });
    sss;
  } catch (err) {
    console.log(colors.red, `uploadCsv err ${err}`);
    return next(new AppError(err, 400));
  }
};

// Save CSV Test

module.exports.saveStudentCSV = async (req, res, next) => {
  const path = req.file.path;
  const id = req.body._id;
  // const instituteId = req.body.instituteId
  const { instituteId } = req.body;

  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      return next(new AppError(err, 400));
    }
    var dataArray = data.split(/\r?\n/);
    var result = dataArray[0].split(",");
    if (result[0].toLowerCase() != "firstname") {
      return res.status(404).json({
        status: 404,
        message: "Failed",
        error: "FirstName header is missing",
      });
    }
    if (result[1].toLowerCase() != "lastname") {
      return res.status(404).json({
        status: 404,
        message: "Failed",
        error: "LastName header is missing",
      });
    }
    if (result[2].toLowerCase() != "roll") {
      return res.status(404).json({
        status: 404,
        message: "Failed",
        error: "RollNumber header is missing",
      });
    }
    if (result[3].toLowerCase() != "nameofcourse") {
      return res.status(404).status(404).json({
        status: 404,
        message: "Failed",
        error: "NameOfCourse header is missing",
      });
    }
    if (result[4].toLowerCase() != "studenttype") {
      return res.status(404).json({
        status: 404,
        message: "Failed",
        error: "StudentType header is missing",
      });
    }
    if (result[5].toLowerCase() != "yearofjoining") {
      return res.status(404).json({
        status: 404,
        message: "Failed",
        error: "YearOfJoining header is missing",
      });
    }
    if (result[6].toLowerCase() != "yearofpassout") {
      return res.status(404).json({
        status: 404,
        message: "Failed",
        error: "YearOfPassout header is missing",
      });
    }
    if (result[7].toLowerCase() != "phonenumber") {
      return res.status(404).json({
        status: 404,
        message: "Failed",
        error: "PhoneNumber header is missing",
      });
    }
    if (result[8].toLowerCase() != "email") {
      return res.status(404).json({
        status: 404,
        message: "Failed",
        error: "Email header is missing",
      });
    }
    if (result[9].toLowerCase() != "address") {
      return res.status(404).json({
        status: 404,
        message: "Failed",
        error: "Address header is missing",
      });
    }
    const headers = {
      firstName: /^[a-zA-Z]*$/,
      lastName: /^[a-zA-Z]*$/,
      roll: /^[a-zA-Z0-9]*$/,
      nameOfCourse: /^[a-zA-Z]*$/,
      studentType: /^[a-zA-Z]*$/,
      yearOfJoining: /^\d{4}$/,
      yearOfPassout: /^\d{4}$/,
      phoneNumber: /^[0-9]{10}$/,
      email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      address: /^[a-zA-Z]*$/,
    };

    try {
      csvValidator(path, headers)
        .then((json) => {
          json.map((student) => {
            let data = student;
            data.addedById = id;
            data.instituteId = instituteId;
            studentDAL.addStudent(data);
          });
        })
        .then(() => {
          return res
            .status(200)
            .json({ status: 200, message: "Student data saved" });
        })
        .catch((err) => {
          console.log(colors.red, `${err}`);
          let errorIndex = err[0].indexOf("in");
          let resultNew = err[0].substring(0, errorIndex);
          if (errorIndex > 0) {
            return res.status(422).json({
              status: 422,
              message: "Failed",
              error: resultNew + "in valid Format",
            });
          }
          return res
            .status(422)
            .json({ status: 422, message: "Failed", error: err[0] });
        });
    } catch (err) {
      return next(new AppError(err, 400));
    }
  });
};

module.exports.getAllMethod = async function (req, res, next) {
  const data = { instituteId: mongoose.Types.ObjectId(req.params.instituteId) };
  try {
    let studentData = await studentDAL.getAllUsers(data);
    return res
      .status(200)
      .json({ status: "SUCCESS", message: null, data: studentData });
  } catch (err) {
    console.log(colors.red, `getAllMethod err ${err}`);
    return next(new AppError(err, 400));
  }
};

// Get Student By Id
module.exports.getStudentByIdMethod = async function (req, res, next) {
  try {
    const data = { _id: mongoose.Types.ObjectId(req.params.studentId) };
    let studentData = await studentDAL.getStudentById(data);
    if (!studentData)
      return next(new AppError("Student does not exists!", 404));
    return res.status(200).json({
      status: "SUCCESS",
      message: null,
      data: studentData,
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

// Update Student
module.exports.updateMethod = async function (req, res, next) {
  const data = req.body;
  try {
    let result = await studentDataValidator.updateStudentSchema.validateAsync(
      data
    );
    data._id = mongoose.Types.ObjectId(req.params.studentId);
    const studentExsits = await studentDAL.getStudentById(data);
    if (!studentExsits)
      return next(new AppError("Student does not exists!", 404));
    result._id = mongoose.Types.ObjectId(req.params.studentId);
    result.updatedAt = new Date();
    let studentData = await studentDAL.updateStudent(result);
    return res.status(200).json({
      status: "SUCCESS",
      message: "Student Data has been updated successfully",
      data: studentData,
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

//upload Extra Activity Documents
module.exports.extraActivityDocUpload = async function (req, res, next) {
  if (!req.file) return next(new AppError("No file uploaded!", 400));
  return res.status(200).json({
    status: "SUCCESS",
    message: "File uploaded successfully!",
    data: { extraActivityDocumentName: `${req.file.filename}` },
  });
};

//upload Multi Files
module.exports.fileUpload = async function (req, res, next) {
  let arraylength = req.files.length;
  let filesname = [];
  var i;
  for (i = 0; i < arraylength; i++) {
    filesname.push(req.files[i].filename);
  }
  // let filesName=''
  if (!req.files) return next(new AppError("No file uploaded!", 400));
  return res.status(200).json({
    status: "SUCCESS",
    message: "File uploaded successfully!",
    data: { eductionalDocumentNames: filesname, fileCount: arraylength },
  });
};

module.exports.deleteDocument = async (req, res, next) => {
  const data = req.params.studentDocumentLink;
  const studentId = req.params.id;
  var fileCount;
  const filePath = path.join(
    __dirname,
    `../../../../uploads/student_doc/${data}`
  );
  try {
    let {
      eductionalDocumentNames,
      purposeOfFile,
    } = await studentDAL.getStudentById({
      _id: studentId,
    });
    let index = eductionalDocumentNames.indexOf(data);
    eductionalDocumentNames.splice(index, 1);

    // Delete Purpose Of File
    purposeOfFile.splice(index, 1);

    let resultJson = {
      _id: studentId,
      eductionalDocumentNames: eductionalDocumentNames,
      purposeOfFile: purposeOfFile,
    };
    if (index >= 0) {
      studentDAL.updateStudent(resultJson);
    } else {
      return next(new AppError("Document not found in database", 400));
    }
  } catch (err) {
    return next(new AppError(err, 400));
  }
  try {
    let findStudent = await studentDAL.getStudentById({ _id: studentId });
    if (findStudent.noOfEductionalDocuments > 0) {
      fileCount = findStudent.noOfEductionalDocuments - 1;
    }
    let resultJson = {
      _id: studentId,
      noOfEductionalDocuments: fileCount,
    };
    studentDAL.updateStudent(resultJson);
  } catch (err) {
    return next(new AppError(err, 400));
  }
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(colors.red, "inside err...");
      if (err.code == "ENOENT")
        return next(new AppError("user document not found", 404));
      return next(new AppError("Unable to delete the file", 400));
    }
    return res.status(200).json({
      status: "SUCCESS",
      message: "User document removed successfully",
      fileCount: fileCount,
    });
  });
};

module.exports.downloaddocuments = async (req, res, next) => {
  const data = req.params.studentDocumentLink;
  const filePath = path.join(
    __dirname,
    `../../../../uploads/student_doc/${data}`
  );
  return res.download(filePath, data, function (err) {
    if (err) {
      console.log(colors.red, "inside err...");
      if (err.code == "ENOENT")
        return next(new AppError("user document not found", 404));
    }
  });
};
