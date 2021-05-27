const mongoose = require("mongoose");
const AppError = require("./../../../../helpers/appError");
const employeeDAL = require("./employeeDAL");
const incompleteemployeeDAL = require("../../saveNow/employeeSaveNowDAL");
const employeeDataValidator = require("./employeeValidator");
const colors = require("./../../../../helpers/colors");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const email = require("../../../../helpers/email");
const consentDAL = require("../Consent/consentDAL");

module.exports.fileUpload = async function (req, res, next) {
  const fileName = req.file.originalname;
  if (!req.file) return next(new AppError("No file uploaded!", 400));
  return res.status(200).json({
    status: "SUCCESS",
    message: "Documents Uploaded SuccessFully!",
    data: {
      documentUpload: `${req.file.filename}`,
      originalFilename: fileName,
    },
  });
};

// Add Employee
module.exports.addEmployeeMethod = async function (req, res, next) {
  const data = req.body;
  try {
    await employeeDataValidator.addEmployeeSchema.validateAsync(data);
    let employeeData = await employeeDAL.addEmployee(data);
    let template = employeeData.toObject();
    template.logo = `${process.env.FRONT_END_URL}/assets/images/logo1.png`;
    template.agreelink = `${process.env.FRONT_END_URL}/exemployee/validate/${employeeData._id}/1`;
    template.disagreelink = `${process.env.FRONT_END_URL}/exemployee/validate/${employeeData._id}/0`;
    template.subject = "Consent Email";
    try {
      template.html = await ejs.renderFile(
        path.join(__dirname, "../../../../helpers/email-templates/consent.ejs"),
        template
      );
      // Email sending
      email.sendEmail(template);
    } catch (err) {
      console.log(colors.red, "consent.ejs template render error");
    }

    return res.status(200).json({ status: "SUCCESS", data: employeeData });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

//Get All Employee
module.exports.getAllMethod = async (req, res, next) => {
  const data = {
    organisationId: mongoose.Types.ObjectId(req.params.organisationId),
  };
  try {
    let employeeData = await employeeDAL.getAllUsers(data);
    let incompleteData = await incompleteemployeeDAL.getIncompleteCandidate(
      data
    );

    for (var i = 0; i < employeeData.length; i++) {
      var getEmail = employeeData[i].email;
      var getDateOfJoining = employeeData[i].dateOfJoining;
      for (var j = 0; j < incompleteData.length; j++) {
        var getEmail2 = incompleteData[j].email;
        var getDateOfJoining2 = incompleteData[j].dateOfJoining;
        if (
          getEmail === getEmail2 &&
          getDateOfJoining.getTime() === getDateOfJoining2.getTime()
        ) {
          incompleteData.splice(j, 1);
        }
      }
    }

    let result = employeeData.concat(incompleteData);
    // let r = result.sort((a, b) => {
    //   return b.createdAt - a.createdAt;
    // })

    let resultData = result.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return res
      .status(200)
      .json({ status: "SUCCESS", message: null, data: resultData });
  } catch (err) {
    console.log(colors.red, `getAllMethod err ${err}`);
    return next(new AppError(err, 400));
  }
};

// Get Employee By Id
module.exports.getEmployeeByIdMethod = async function (req, res, next) {
  try {
    const data = { _id: mongoose.Types.ObjectId(req.params.employeeId) };
    let studentData = await employeeDAL.getEmplyeeById(data);
    if (!studentData)
      return next(new AppError("Employee does not exists!", 404));
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
    let result = await employeeDataValidator.updateEmployeeSchema.validateAsync(
      data
    );
    data._id = mongoose.Types.ObjectId(req.params.employeeId);
    const employeeExsits = await employeeDAL.getEmplyeeById(data);
    if (!employeeExsits)
      return next(new AppError("Employee does not exists!", 404));
    var dateOfJoining = new Date(data.dateOfJoining);
    var dateOfExit = new Date(data.exitDate);
    var diffDates = dateOfJoining.getTime() - dateOfExit.getTime();
    var days = diffDates / (1000 * 60 * 60 * 24);
    if (days > 0) {
      return next(
        new AppError("Relieving date must be greater than joining date", 400)
      );
    }
    result._id = mongoose.Types.ObjectId(req.params.employeeId);
    result.updatedAt = new Date();
    let studentData = await employeeDAL.updateEmployee(result);
    return res.status(200).json({
      status: "SUCCESS",
      message: "Employee Data has been updated successfully",
      data: studentData,
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

module.exports.downloaddocuments = async (req, res, next) => {
  const data = req.params.employeedocumentlink;
  const filePath = path.join(
    __dirname,
    `../../../../uploads/organization_doc/${data}`
  );
  return res.download(filePath, data, function (err) {
    if (err) {
      console.log(colors.red, "inside err...");
      if (err.code == "ENOENT")
        return next(new AppError("user document not found", 404));
    }
  });
};

module.exports.deleteDocument = async (req, res, next) => {
  const data = req.params.employeedocumentlink;
  const id = req.params.id;
  const filePath = path.join(
    __dirname,
    `../../../../uploads/organization_doc/${data}`
  );

  var userData = await employeeDAL.getEmplyeeById({ _id: id });
  var isSelect = userData.awards.IsSelect;
  var remark = userData.awards.remarks;
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(colors.red, "inside err...");
      if (err.code == "ENOENT")
        return next(new AppError("user document not found", 404));
      return next(new AppError("Unable to delete the file", 400));
    } else {
      try {
        let d = {
          _id: id,
          awards: {
            IsSelect: isSelect,
            remarks: remark,
            documentName: "",
            documentUpload: "",
            originalFilename: "",
          },
        };
        employeeDAL.updateEmployee(d).then(() => {
          return res.status(200).json({
            status: 200,
            message: "Successfully deleted",
          });
        });
      } catch (err) {
        return next(new AppError(err, 400));
      }
    }
  });
};

module.exports.checkduplicateEmployeeRecords = async (req, res, next) => {
  let result = await employeeDAL.checkDuplicateEmpRecord(req.body);
  if (result === undefined) {
    return res
      .status(200)
      .json({ status: 200, message: "Employee doesn't exists" });
  }
  return next(new AppError(result, 400));
};

module.exports.sendConsentEmail = async (req, res, next) => {
  const employeeId = req.params.empId;
  try {
    var template = await employeeDAL.getEmplyeeById({ _id: employeeId });
  } catch (err) {
    return next(new AppError(err, 422));
  }
  template.logo = `${process.env.FRONT_END_URL}/assets/images/logo1.png`;
  template.agreelink = `${process.env.LOCAL_FORNT_END_URL}/exemployee/validate/${employeeId}/1`;
  template.disagreelink = `${process.env.LOCAL_FORNT_END_URL}/exemployee/validate/${employeeId}/0`;
  template.subject = "Consent Email";
  try {
    template.html = await ejs.renderFile(
      path.join(__dirname, "../../../../helpers/email-templates/consent.ejs"),
      template
    );
    // Email sending
    email.sendEmail(template);
  } catch (err) {
    console.log(colors.red, "consent.ejs template render error");
  }
};

module.exports.validateConsent = async (req, res, next) => {
  const getOption = req.params.option;
  const empId = req.params.empId;

  var getEmpData = await employeeDAL.getEmplyeeById({ _id: empId });
  if (!getEmpData) {
    return next(new AppError("Employee doesn't exists", 422));
  }

  let result = await consentDAL.findEmployeeConsent({ _id: empId });
  if (result) {
    // return res
    //   .status(200)
    //   .json({ status: 422, message: "Employee consent found" });
    return res.sendFile(path.join(__dirname, "../Consent/fail.html"));
  }

  if (getOption == 0) {
    try {
      var data = {
        firstName: getEmpData.firstName,
        lastName: getEmpData.lastName,
        email: getEmpData.email,
        phoneNumber: getEmpData.phoneNumber,
        adharNumber: getEmpData.adharNumber,
        employeeId: empId,
        consent: false,
      };
      let result = await consentDAL.saveConsent(data);
      if (!result) {
        console.log(colors.red, "Consent not saved");
      }
    } catch (err) {
      console.log(colors.red, err);
    }
    // return res.status(200).json({ status: 200, message: "Consent disagreed" });
    return res.sendFile(path.join(__dirname, "../Consent/success.html"));
  }

  var data = {
    firstName: getEmpData.firstName,
    lastName: getEmpData.lastName,
    email: getEmpData.email,
    phoneNumber: getEmpData.phoneNumber,
    adharNumber: getEmpData.adharNumber,
    employeeId: empId,
    consent: true,
  };
  let consentSaved = await consentDAL.saveConsent(data);
  if (!consentSaved) {
    console.log(colors.red, "Consent not saved");
  }

  // return res.status(200).json({ status: 200, message: "Consent agreed" });
  return res.sendFile(path.join(__dirname, "../Consent/success.html"));
};
