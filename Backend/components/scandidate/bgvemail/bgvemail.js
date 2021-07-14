const bgvDAL = require("../BGVSearch/bgvDAL");
const colors = require("../../../helpers/colors");
const path = require("path");
const fs = require("fs");
const AppError = require("../../../helpers/appError");
const nodemailer = require("nodemailer");
const AWS = require("aws-sdk");
const ejs = require("ejs");
const moment = require("moment");
var pdf = require("html-pdf");

function format(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();
  return "" + (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;
}

function createXL(reqData) {
  var template = [];
  template = reqData;
  var today = new Date();
  var dateString = format(today);
  var selfDriv = "";
  var workIndepend = "";
  var credvity = "";
  var tWork = "";
  var dealConstructivelyPressure = "";
  var discipln = "";
  var commSkill = "";
  var indusKnow = "";
  var prodKnow = "";
  var subMtr = "";
  var stragThink = "";
  var problemSolv = "";
  var buidPerformance = "";
  var stakeMgmnt = "";
  var discrpncy_date = "";
  var Complnce_date = "";
  var warningdate = "";
  var showCausedate = "";
  var performancedate = "";
  var terminationdate = "";
  for (let i = 0; i < template.length; i++) {
    if (template[i].selfDriven) {
      if (template[i].selfDriven == 1) {
        selfDriv = "Not satisfactory";
      }
      if (template[i].selfDriven == 2) {
        selfDriv = "Needs Improvement";
      }
      if (template[i].selfDriven == 3) {
        selfDriv = "Meets Expectations";
      }
      if (template[i].selfDriven == 4) {
        selfDriv = "Exceeds Expectations";
      }
    }

    if (template[i].workIndependenty) {
      if (template[i].workIndependenty == 1) {
        workIndepend = "Not satisfactory";
      }
      if (template[i].workIndependenty == 2) {
        workIndepend = "Needs Improvement";
      }
      if (template[i].workIndependenty == 3) {
        workIndepend = "Meets Expectations";
      }
      if (template[i].workIndependenty == 4) {
        workIndepend = "Exceeds Expectations";
      }
    }

    //Creativity

    if (template[i].creativity) {
      if (template[i].creativity == 1) {
        credvity = "Not satisfactory";
      }
      if (template[i].creativity == 2) {
        credvity = "Needs Improvement";
      }
      if (template[i].creativity == 3) {
        credvity = "Meets Expectations";
      }
      if (template[i].creativity == 4) {
        credvity = "Exceeds Expectations";
      }
    }

    //Team Work

    if (template[i].teamWork) {
      if (template[i].teamWork == 1) {
        tWork = "Not satisfactory";
      }
      if (template[i].teamWork == 2) {
        tWork = "Needs Improvement";
      }
      if (template[i].teamWork == 3) {
        tWork = "Meets Expectations";
      }
      if (template[i].teamWork == 4) {
        tWork = "Exceeds Expectations";
      }
    }

    //Deals Constructively With Pressure

    if (template[i].dealConstructivelyWithPressure) {
      if (template[i].dealConstructivelyWithPressure == 1) {
        dealConstructivelyPressure = "Not satisfactory";
      }
      if (template[i].dealConstructivelyWithPressure == 2) {
        dealConstructivelyPressure = "Needs Improvement";
      }
      if (template[i].dealConstructivelyWithPressure == 3) {
        dealConstructivelyPressure = "Meets Expectations";
      }
      if (template[i].dealConstructivelyWithPressure == 4) {
        dealConstructivelyPressure = "Exceeds Expectations";
      }
    }

    //discipline

    if (template[i].discipline) {
      if (template[i].discipline == 1) {
        discipln = "Not satisfactory";
      }
      if (template[i].discipline == 2) {
        discipln = "Needs Improvement";
      }
      if (template[i].discipline == 3) {
        discipln = "Meets Expectations";
      }
      if (template[i].discipline == 4) {
        discipln = "Exceeds Expectations";
      }
    }

    //comm skill

    if (template[i].communicationSkills) {
      if (template[i].communicationSkills == 1) {
        commSkill = "Basic";
      }
      if (template[i].communicationSkills == 2) {
        commSkill = "Intermediate";
      }
      if (template[i].communicationSkills == 3) {
        commSkill = "Proficient";
      }
      if (template[i].communicationSkills == 4) {
        commSkill = "Expert";
      }
    }

    //industry know

    if (template[i].industryKnowledge) {
      if (template[i].industryKnowledge == 1) {
        indusKnow = "Basic";
      }
      if (template[i].industryKnowledge == 2) {
        indusKnow = "Intermediate";
      }
      if (template[i].industryKnowledge == 3) {
        indusKnow = "Proficient";
      }
      if (template[i].industryKnowledge == 4) {
        indusKnow = "Expert";
      }
    }
    //pro unders

    if (template[i].productKnowledge) {
      if (template[i].productKnowledge == 1) {
        prodKnow = "Basic";
      }
      if (template[i].productKnowledge == 2) {
        prodKnow = "Intermediate";
      }
      if (template[i].productKnowledge == 3) {
        prodKnow = "Proficient";
      }
      if (template[i].productKnowledge == 4) {
        prodKnow = "Expert";
      }
    }

    //sub matter to expertise
    if (template[i].academicKnowledge) {
      if (template[i].academicKnowledge == 1) {
        subMtr = "Basic";
      }
      if (template[i].academicKnowledge == 2) {
        subMtr = "Intermediate";
      }
      if (template[i].academicKnowledge == 3) {
        subMtr = "Proficient";
      }
      if (template[i].academicKnowledge == 4) {
        subMtr = "Expert";
      }
    }

    // Leadership

    if (template[i].quality) {
      if (template[i].quality.IsSelect == 1) {
        stragThink = "Not satisfactory";
      }
      if (template[i].quality.IsSelect == 2) {
        stragThink = "Needs Improvement";
      }
      if (template[i].quality.IsSelect == 3) {
        stragThink = "Meets Expectations";
      }
      if (template[i].quality.IsSelect == 4) {
        stragThink = "Exceeds Expectations";
      }
    }

    //problemsolving

    if (template[i].consistency) {
      if (template[i].consistency.IsSelect == 1) {
        problemSolv = "Not satisfactory";
      }
      if (template[i].consistency.IsSelect == 2) {
        problemSolv = "Needs Improvement";
      }
      if (template[i].consistency.IsSelect == 3) {
        problemSolv = "Meets Expectations";
      }
      if (template[i].consistency.IsSelect == 4) {
        problemSolv = "Exceeds Expectations";
      }
    }

    //buildingHighPer
    if (template[i].building) {
      if (template[i].building.IsSelect == 1) {
        buidPerformance = "Not satisfactory";
      }
      if (template[i].building.IsSelect == 2) {
        buidPerformance = "Needs Improvement";
      }
      if (template[i].building.IsSelect == 3) {
        buidPerformance = "Meets Expectations";
      }
      if (template[i].building.IsSelect == 4) {
        buidPerformance = "Exceeds Expectations";
      }
    }

    //buildingHighPer

    if (template[i].stakeholder) {
      if (template[i].stakeholder.IsSelect == 1) {
        stakeMgmnt = "Not satisfactory";
      }
      if (template[i].stakeholder.IsSelect == 2) {
        stakeMgmnt = "Needs Improvement";
      }
      if (template[i].stakeholder.IsSelect == 3) {
        stakeMgmnt = "Meets Expectations";
      }
      if (template[i].stakeholder.IsSelect == 4) {
        stakeMgmnt = "Exceeds Expectations";
      }
    }

    if (template[i].discrepancyDocuments) {
      if (template[i].discrepancyDocuments.IsSelect) {
        if (template[i].discrepancyDocuments.descrepencyPeriod) {
          var temp = template[i].discrepancyDocuments.descrepencyPeriod;
          const dis_date = new Date(temp);
          // discrpncy_date = format(template[i].discrepancyDocuments.descrepencyPeriod);
          discrpncy_date = format(dis_date);
        }
        discrpncy_cause =
          template[i].discrepancyDocuments.descrepencyCauseActionTaken;
        discrpncy_upload =
          template[i].discrepancyDocuments.descrepencyUploadDocument;
      }
    }

    if (template[i].compliencyDiscrepancy) {
      if (template[i].compliencyDiscrepancy.IsSelect) {
        if (template[i].compliencyDiscrepancy.compliencyPeriod) {
          var temp = template[i].compliencyDiscrepancy.compliencyPeriod;
          const comp_date = new Date(temp);
          // Complnce_date = template[i].compliencyDiscrepancy.compliencyPeriod;
          Complnce_date = format(comp_date);
        }
        Complnce_cause =
          template[i].compliencyDiscrepancy.compliencyCauseActionTaken;
        Complnce_upload =
          template[i].compliencyDiscrepancy.compliencyUploadDocument;
      }
    }

    if (template[i].warning) {
      if (template[i].warning.IsSelect) {
        if (template[i].warning.warningPeriod) {
          var temp = template[i].warning.warningPeriod;
          const warn_date = new Date(temp);
          // warningdate = template[i].warning.warningPeriod;
          warningdate = format(warn_date);
        }
        warningcause = template[i].warning.warningCauseActionTaken;
        warningupload = template[i].warning.warningUploadDocument;
      }
    }

    if (template[i].showCausedIssue) {
      if (template[i].showCausedIssue.IsSelect) {
        if (template[i].showCausedIssue.showCausedPeriod) {
          var temp = template[i].showCausedIssue.showCausedPeriod;
          const show_caused_date = new Date(temp);
          // showCausedate = template[i].showCausedIssue.showCausedPeriod;
          showCausedate = format(show_caused_date);
        }
        showCausecause = template[i].showCausedIssue.showCausedCauseActionTaken;
        showCauseupload = template[i].showCausedIssue.showCausedUploadDocument;
      }
    }

    if (template[i].suspension) {
      if (template[i].suspension.IsSelect) {
        if (template[i].suspension.suspensionPeriod) {
          var temp = template[i].suspension.suspensionPeriod;
          const susp_date = new Date(temp);
          // performancedate = template[i].suspension.suspensionPeriod;
          performancedate = format(susp_date);
        }
        performancecause = template[i].suspension.suspensionCauseActionTaken;
        performanceupload = template[i].suspension.suspensionUploadDocument;
      }
    }

    if (template[i].termination) {
      if (template[i].termination.IsSelect) {
        if (template[i].termination.terminationPeriod) {
          var temp = template[i].termination.terminationPeriod;
          const term_date = new Date(temp);
          // terminationdate = template[i].termination.terminationPeriod;
          terminationdate = format(term_date);
        }
        terminationcause = template[i].termination.terminationCauseActionTaken;
        terminationupload = template[i].termination.terminationUploadDocument;
      }
    }

    template[i].selfDriven = selfDriv;
    template[i].workIndependenty = workIndepend;
    template[i].creativity = credvity;
    template[i].teamWork = tWork;
    template[i].dealConstructivelyWithPressure = dealConstructivelyPressure;
    template[i].discipline = discipln;
    template[i].communicationSkills = commSkill;
    template[i].industryKnowledge = indusKnow;
    template[i].productKnowledge = prodKnow;
    template[i].subMatter = subMtr;

    // Leadership

    template[i].stategicThinking = stragThink;
    template[i].problemSolving = problemSolv;
    template[i].buildingHighPerformanceTeam = buidPerformance;
    template[i].stakeHolderManagment = stakeMgmnt;

    if (template[i].discrepancyDocuments) {
      if (template[i].discrepancyDocuments.IsSelect) {
        template[i].discrepancy_date = discrpncy_date;
        template[i].discrepancy_cause = discrpncy_cause;
        template[i].discrepancy_upload = discrpncy_upload;
      }
    }

    if (template[i].compliencyDiscrepancy) {
      if (template[i].compliencyDiscrepancy.IsSelect) {
        template[i].Compliance_date = Complnce_date;
        template[i].Compliance_cause = Complnce_cause;
        template[i].Compliance_upload = Complnce_upload;
      }
    }

    if (template[i].warning) {
      if (template[i].warning.IsSelect) {
        template[i].warning_date = warningdate;
        template[i].warning_cause = warningcause;
        template[i].warning_upload = warningupload;
      }
    }

    if (template[i].showCausedIssue) {
      if (template[i].showCausedIssue.IsSelect) {
        template[i].showCause_date = showCausedate;
        template[i].showCause_cause = showCausecause;
        template[i].showCause_upload = showCauseupload;
      }
    }

    if (template[i].suspension) {
      if (template[i].suspension.IsSelect) {
        template[i].performance_date = performancedate;
        template[i].performance_cause = performancecause;
        template[i].performance_upload = performanceupload;
      }
    }

    if (template[i].termination) {
      if (template[i].termination.IsSelect) {
        template[i].termination_date = terminationdate;
        template[i].termination_cause = terminationcause;
        template[i].termination_upload = terminationupload;
      }
    }
  }

  let count = 0;
  var leadership = false;
  for (var i = 0; i < template.length; i++) {
    if (template[i].quality) {
      if (
        template[i].quality.IsSelect != null ||
        template[i].consistency.IsSelect != null ||
        template[i].building.IsSelect != null ||
        template[i].stakeholder.IsSelect != null
      ) {
        count += 1;
      }
    }
  }

  if (count > 0) {
    leadership = true;
  }

  var isAward = false;
  let awardCount = 0;
  for (var i = 0; i < template.length; i++) {
    if (template[i].awards) {
      if (template[i].awards.IsSelect != null) {
        awardCount += 1;
      }
    }
  }

  if (awardCount > 0) {
    isAward = true;
  }

  var isDocument = false;
  let countDoc = 0;
  for (var i = 0; i < template.length; i++) {
    if (template[i].discrepancyDocuments) {
      if (
        template[i].discrepancyDocuments.descrepencyCauseActionTaken != null ||
        template[i].compliencyDiscrepancy.compliencyCauseActionTaken != null ||
        template[i].warning.warningCauseActionTaken != null ||
        template[i].showCausedIssue.showCausedCauseActionTaken != null ||
        template[i].suspension.suspensionCauseActionTaken != null ||
        template[i].termination.terminationCauseActionTaken != null
      ) {
        countDoc += 1;
      }
    }
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "production"
    ) {
      var joiningDate = moment(template[i].dateOfJoining)
        .add(1, "d")
        .format("LL");
      var exitDate = moment(template[i].exitDate).add(1, "d").format("LL");
    } else {
      var joiningDate = moment(template[i].dateOfJoining).format("LL");
      var exitDate = moment(template[i].exitDate).format("LL");
    }
  }
  if (countDoc > 0) {
    isDocument = true;
  }
  if (process.env.NODE_ENV === "development") {
    var result = {
      FirstName: template[0].firstName,
      LastName: template[0].lastName,
      phone: template[0].phoneNumber,
      email: template[0].email,
      logo: `${process.env.FRONT_END_URL}/assets/images/logo1.png`,
      orgLogo: `${process.env.FRONT_END_URL_DEV}/public/organization_logo/`,
      instLogo: `${process.env.FRONT_END_URL_DEV}/public/institute_logo/`,
      myDate: dateString,
      data: template,
      ldrshp: leadership,
      isAwarded: isAward,
      joiningdate: joiningDate,
      exitDate: exitDate,
      isDocumentPresent: isDocument,
    };
  } else if (process.env.NODE_ENV === "production") {
    var result = {
      FirstName: template[0].firstName,
      LastName: template[0].lastName,
      phone: template[0].phoneNumber,
      email: template[0].email,
      logo: `${process.env.FRONT_END_URL}/assets/images/logo1.png`,
      myDate: dateString,
      data: template,
      ldrshp: leadership,
      isAwarded: isAward,
      joiningdate: joiningDate,
      exitDate: exitDate,
      isDocumentPresent: isDocument,
    };
  }
  let originalFileName = "";
  ejs.renderFile(
    path.join(
      __dirname,
      "../../scandidate/BGVSearch/BGVTemplate/scandidate-report-org.ejs"
    ),
    result,
    function (err, str) {
      if (err) {
      }
      var fileName = template[0].firstName + new Date().getTime() + ".pdf";
      fileName = fileName.replace(/ +/g, "");
      var checkFilePath = path.join(
        __dirname,
        "../../../uploads/report-excel/" + fileName
      );
      var options = { height: "10.5in", width: "15in" };
      pdf.create(str, options).toFile(checkFilePath, function (err, data) {});
      originalFileName = fileName;
    }
  );
  return originalFileName;
}

module.exports.createbgvXL = async (req, res, next) => {
  const id = req.params.id;
  const orgId = req.params.organizationId;
  var data = { _id: id, organisationId: orgId };

  var result = await bgvDAL.getBGVDataEmail(data);
  try {
    var fileName = createXL(result);
    return res.status(200).json({
      status: 200,
      message: "BGV report created successfully",
      originalFileName: fileName,
    });
  } catch (err) {
    console.log(colors.red, err);
    return next(new AppError("Failed to generate bgv report", 500));
  }
};

module.exports.sendemail = async (req, res, next) => {
  var template = req.body;
  // Email sending
  try {
    let result = await scheduledEmail(template);
    if (result) {
      return res
        .status(200)
        .json({ status: 200, message: "Email sent sucessfully" });
    }
  } catch (err) {
    console.log(colors.red, err);
    return next(new AppError("Failed to sent email", 500));
  }
};

async function scheduledEmail(data) {
  var mailResult;
  var data1 = { msg: data.message };
  data.html = await ejs.renderFile(
    path.join(__dirname, "../../../helpers/email-templates/sendbgvemail.ejs"),
    data1
  );
  let transporter = nodemailer.createTransport({
    SES: new AWS.SES({ apiVersion: "2010-12-01" }),
  });

  var mail = {
    from: "Scandidate.in" + process.env.AWSSENDERMAILID,
    to: data.email,
    subject: data.subject, // Subject line
    html: data.html,
    attachments: [
      {
        filename: data.originalFileName,
        path: path.join(
          __dirname,
          "../../../uploads/report-excel/" + data.originalFileName
        ),
      },
    ],
  };

  await transporter
    .sendMail(mail)
    .then((info) => {
      mailResult = true;
    })
    .catch((err) => {
      mailResult = false;
    });

  // console.log("Message sent: %s", info.messageId);
  return mailResult;
}
