const AppError = require("../../../../helpers/appError");
const colors = require("../../../../helpers/colors");
const mongoose = require("mongoose");
const empDAL = require("../../../organization/OppsUser/AddEmployee/employeeDAL");
const empValidator = require("../../../organization/OppsUser/AddEmployee/employeeValidator");
const path = require("path");
const ejs = require("ejs");
const email = require("../../../../helpers/email");
const consentDAL = require("../../../organization/OppsUser/Consent/consentDAL");

module.exports.addEmployee = async (req, res, next) => {
  const data = req.body;
  try {
    let getValidateResult = await empValidator.addEmployeeSchema.validateAsync(
      data
    );
    let result = await empDAL.addEmployee(getValidateResult);

    let template = result.toObject();
    template.logo = `${process.env.FRONT_END_URL}/assets/images/logo1.png`;

    if (process.env.NODE_ENV === "development") {
      template.agreelink = `${process.env.FRONT_END_URL_LOCAL}/validate/${result._id}/1`;
      template.disagreelink = `${process.env.FRONT_END_URL_LOCAL}/validate/${result._id}/0`;
    } else if (process.env.NODE_ENV === "uat") {
      template.agreelink = `${process.env.FRONT_END_URL_DEV}/validate/${result._id}/1`;
      template.disagreelink = `${process.env.FRONT_END_URL_DEV}/validate/${result._id}/0`;
    } else if (process.env.NODE_ENV === "production") {
      template.agreelink = `${process.env.FRONT_END_URL}/validate/${result._id}/1`;
      template.disagreelink = `${process.env.FRONT_END_URL}/validate/${result._id}/0`;
    }

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

    var empConsentData = {
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      phoneNumber: result.phoneNumber,
      adharNumber: result.adharNumber,
    };

    let checkConsent = await consentDAL.findSavedEmployeeConsent(
      empConsentData
    );
    if (!checkConsent.length > 0) {
      var consentData = {
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        phoneNumber: result.phoneNumber,
        adharNumber: result.adharNumber,
        employeeId: result._id,
        consent: false,
        flag: false,
      };

      let saveConsent = await consentDAL.saveConsent(consentData);
      if (!saveConsent) {
        console.log(colors.err, "Consent not saved");
      }
    }

    return res.status(200).json({ status: "SUCCESS", data: result });
  } catch (err) {
    return next(new AppError(err, 422));
  }
};

module.exports.getEmployee = async (req, res, next) => {
  const data = {
    organisationId: mongoose.Types.ObjectId(req.params.organisationId),
  };
  try {
    let result = await empDAL.getAllUsers(data);
    return res.status(200).json({ status: "SUCCESS", data: result });
  } catch (err) {
    return next(new AppError(err, 422));
  }
};
