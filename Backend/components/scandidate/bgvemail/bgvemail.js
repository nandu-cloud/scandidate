const bgvDAL = require("../BGVSearch/bgvDAL");
const colors = require("../../../helpers/colors");
const path = require("path");
const fs = require("fs");
const AppError = require("../../../helpers/appError");
const nodemailer = require("nodemailer");
const AWS = require("aws-sdk");
const ejs = require("ejs");
const moment = require("moment");

function format(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();
  return "" + (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;
}

function createXL(template) {
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
  var discrpncy_cause = "";
  var Complnce_date = "";
  var Complnce_cause = "";
  var warningdate = "";
  var warningcause = "";
  var showCausedate = "";
  var showCausecause = "";
  var performancedate = "";
  var performancecause = "";
  var terminationdate = "";
  var terminationcause = "";
  var dir = path.join(__dirname, "../../../uploads/report-excel/");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  var fileName = template[0].firstName + new Date().getTime() + ".csv";
  var writeStream = fs.createWriteStream(dir + fileName);

  var row1 =
    "NAME: " +
    ",," +
    template[0].firstName +
    " " +
    template[0].lastName +
    "\n\n";

  var row2 = "EMAIL ID:" + ",," + template[0].email + "\n\n";
  var row3 = "PHONE NUMBER: " + ",," + template[0].phoneNumber + "\n\n";
  var row4 = "Role: " + ",," + template[0].role + "\n\n";

  var joiningDate = moment(template[0].dateOfJoining).format("LL");
  var exitDate = moment(template[0].exitDate).format("LL");

  var row5 = "Start date: " + ",," + joiningDate + "\n\n";
  var row6 = "Exit date: " + ",," + exitDate + "\n\n";

  var header =
    "COMPANY NAME" +
    ",,,,,," +
    "WORK ETHIC" +
    ",,,,,," +
    "MERIT QUALITY" +
    ",,,,,," +
    "RECOGNITION" +
    ",,,,,," +
    "LEADERSHIP" +
    ",,,,,," +
    "ISSUES" +
    "\n\n";
  writeStream.write(row1 + row2 + row3 + row4 + row5 + row6 + header, "UTF8");
  for (var i = 0; i < template.length; i++) {
    if (template[i].organizationName) {
      var comp = template[i].organizationName;
      writeStream.write(comp + ",,,,,,");
    }
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
      var SelfDriven = "SelfDriven/Initiative: " + selfDriv;
      writeStream.write(SelfDriven + ",,,,,,", "UTF8");
    }
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
      var comm = "Communication: " + commSkill;
      writeStream.write(comm + ",,,,,,", "UTF8");
    }

    if (template[i].awards.IsSelect != null) {
      var awdObj = template[i].awards.IsSelect;
      writeStream.write(awdObj + ",,,,,,", "UTF8");
    } else {
      var awdObj = "Nil";
      writeStream.write(awdObj + ",,,,,,", "UTF8");
    }

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
      var stragThnk = "Strategic thinking: " + stragThink;
      writeStream.write(stragThnk + ",,,,,,", "UTF8");
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
      var disDocumnt = "Document discrepancies: " + discrpncy_date;
      var disCause = "Causes: " + discrpncy_cause;
      writeStream.write(disDocumnt + ",," + disCause + "\n,,,,,,", "UTF8");
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
      var workIndep = "Work Independently: " + workIndepend;
      writeStream.write(workIndep + ",,,,,,", "UTF8");
    }
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
      var prodKnow = "Product understanding: " + prodKnow;
      writeStream.write(prodKnow + ",,,,,,,,,,,,", "UTF8");
    }

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
      var probSolv = "Problem solving: " + problemSolv;
      writeStream.write(probSolv + ",,,,,,", "UTF8");
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
      var compDocumnt = "Compliance: " + Complnce_date;
      var comCause = "Causes: " + Complnce_cause;
      writeStream.write(compDocumnt + ",," + comCause + "\n,,,,,,", "UTF8");
    }

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
      var cred = "Creativity: " + credvity;
      writeStream.write(cred + ",,,,,,", "UTF8");
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
      var inKnow = "Industry/domain knowledge: " + indusKnow;
      writeStream.write(inKnow + ",,,,,,,,,,,,", "UTF8");
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
      var buildPer = "Building High-Performance teams: " + buidPerformance;
      writeStream.write(buildPer + ",,,,,,", "UTF8");
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
      var warnDocumnt = "Warning: " + warningdate;
      var warnCause = "Causes: " + warningcause;
      writeStream.write(warnDocumnt + ",," + warnCause + "\n,,,,,,", "UTF8");
    }

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
      var teamWrk = "Teamwork: " + tWork;
      writeStream.write(teamWrk + ",,,,,,", "UTF8");
    }

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
      var subjMatter = "Subject matter expertise: " + subMtr;
      writeStream.write(subjMatter + ",,,,,,,,,,,,", "UTF8");
    }

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
      var stakMgmnt = "Stakeholder management: " + stakeMgmnt;
      writeStream.write(stakMgmnt + ",,,,,,", "UTF8");
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
      var showCauseDocumnt = "Show cause: " + showCausedate;
      var showCauseCause = "Causes: " + showCausecause;
      writeStream.write(
        showCauseDocumnt + ",," + showCauseCause + "\n,,,,,,",
        "UTF8"
      );
    }

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
      var pressure =
        "Ability to handle pressure: " + dealConstructivelyPressure;
      writeStream.write(pressure + ",,,,,,", "UTF8");
    }

    if (template[i].keySkills) {
      var keySkl = "Key Skills: " + template[i].keySkills;
      writeStream.write(keySkl + ",,,,,,,,,,,,,,,,,,", "UTF8");
    } else {
      var keySkl = "Key Skills: " + "";
      writeStream.write(keySkl + ",,,,,,,,,,,,,,,,,,", "UTF8");
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
      var performnaceDocumnt = "PIP: " + performancedate;
      var performnaceCause = "Causes: " + performancecause;
      writeStream.write(
        performnaceDocumnt + ",," + performnaceCause + "\n,,,,,,",
        "UTF8"
      );
    }

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
      var displn = "Discipline: " + discipln;
      writeStream.write(displn + ",,,,,,", "UTF8");
    }

    if (template[i].rehireAgain) {
      var rehire = "Re-hire: " + template[i].rehireAgain;
      writeStream.write(rehire + ",,,,,,,,,,,,,,,,,,", "UTF8");
    } else {
      var rehire = "Re-hire: " + "";
      writeStream.write(rehire + ",,,,,,,,,,,,,,,,,,", "UTF8");
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
      var terminationDocumnt = "Termination: " + terminationdate;
      var terminationCause = "Causes: " + terminationcause;
      writeStream.write(
        terminationDocumnt + ",," + terminationCause + "\n,,,,,,",
        "UTF8"
      );
    }
  }

  writeStream.close();
  return fileName;
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
