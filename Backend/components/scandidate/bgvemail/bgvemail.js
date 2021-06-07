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
  var fileName = template.firstName + new Date().getTime() + ".csv";
  var writeStream = fs.createWriteStream(dir + fileName);
  var row1 =
    "NAME:" + ",," + template.firstName + "," + template.lastName + "\n\n";
  var row2 = "EMAIL ID:" + ",," + template.email + "\n\n";
  var row3 = "PHONE NUMBER: " + ",," + template.phoneNumber + "\n\n";
  var row4 = "Role: " + ",," + template.role + "\n\n";

  var joiningDate = moment(template.dateOfJoining).format("LL");
  var exitDate = moment(template.exitDate).format("LL");

  var row5 = "Start date: " + ",," + joiningDate + "\n\n";
  var row6 = "Exit date: " + ",," + exitDate + "\n\n";

  var header =
    "COMPANY NAME" +
    ",,,,," +
    "WORK ETHIC" +
    ",,,,," +
    "MERIT QUALITY" +
    ",,,,," +
    "RECOGNITION" +
    ",,,,," +
    "LEADERSHIP" +
    ",,,,,," +
    "ISSUES" +
    "\n\n";
  writeStream.write(row1 + row2 + row3 + row4 + row5 + row6 + header);
  writeStream.write(template.organizationName + ",,,,,");

  // SelfDriven
  var selfDriven = template.selfDriven;
  var selfDrvn = "";
  switch (selfDriven) {
    case 1:
      selfDrvn = "Not satisfactory";
      break;
    case 2:
      selfDrvn = "Needs Improvement";
      break;
    case 3:
      selfDrvn = "Meets Expectations";
      break;
    default:
      selfDrvn = "Exceeds Expectations";
      break;
  }
  var SelfDriven = "SelfDriven/Initiative: " + selfDrvn;
  writeStream.write(SelfDriven + ",,,,,");

  // Communication
  var communiation = template.communicationSkills;
  var comm = "";
  switch (communiation) {
    case 1:
      comm = "Basic";
      break;
    case 2:
      comm = "Intermediate";
      break;
    case 3:
      comm = "Proficient";
      break;
    default:
      comm = "Expert";
      break;
  }
  var comm = "Communication: " + comm;
  writeStream.write(comm + ",,,,,");

  // Awards
  var awards = template.awards.IsSelect;
  if (awards != null) {
    writeStream.write(awards + ",,,,,");
  } else {
    writeStream.write("Nill", +",,,,,");
  }

  // Quality
  var quality = template.quality.IsSelect;
  if (quality != null) {
    var stragThink = "";
    switch (quality) {
      case 1:
        stragThink = "Not satisfactory";
        break;
      case 2:
        stragThink = "Needs Improvement";
        break;
      case 3:
        stragThink = "Meets Expectations";
        break;
      default:
        stragThink = "Exceeds Expectations";
        break;
    }
    var stragThnk = "Strategic thinking: " + stragThink;
    writeStream.write(stragThnk + ",,,,,,");
  } else {
    var stragThnk = "Strategic thinking: " + "";
    writeStream.write(stragThnk + ",,,,,,");
  }

  //Discrepancy Documents

  if (template.discrepancyDocuments) {
    if (template.discrepancyDocuments.IsSelect) {
      if (template.discrepancyDocuments.descrepencyPeriod) {
        var temp = template[i].discrepancyDocuments.descrepencyPeriod;
        const dis_date = new Date(temp);
        // discrpncy_date = format(template[i].discrepancyDocuments.descrepencyPeriod);
        discrpncy_date = format(dis_date);
      }
      discrpncy_cause =
        template.discrepancyDocuments.descrepencyCauseActionTaken;
    }
    var disDocumnt = "Document discrepancies: " + discrpncy_date;
    var disCause = "Causes: " + discrpncy_cause;
    writeStream.write(disDocumnt + ",," + disCause + "\n,,,,,", "UTF8");
  }

  // Work Independently
  var workIndepent = template.workIndependenty;
  var work = "";
  switch (workIndepent) {
    case 1:
      work = "Not satisfactory";
      break;
    case 2:
      work = "Needs Improvement";
    case 3:
      work = "Meets Expectations";
      break;
    default:
      work = "Exceeds Expectations";
  }
  var workIndep = "Work Independently: " + work;
  writeStream.write(workIndep + ",,,,,", "UTF8");

  // Product Knowledge

  var prodKldge = template.productKnowledge;
  var prod = "";
  switch (prodKldge) {
    case 1:
      prod = "Basic";
      break;
    case 2:
      prod = "Intermediate";
      break;
    case 3:
      prod = "Proficient";
      break;
    default:
      prod = "Expert";
  }
  var prodKnow = "Product understanding: " + prod;
  writeStream.write(prodKnow + ",,,,,,,,,,", "UTF8");

  // Problem solving

  var probSolv = template.consistency.IsSelect;
  if (probSolv != null) {
    var prob = "";
    switch (probSolv) {
      case 1:
        prob = "Not satisfactory";
        break;
      case 2:
        prob = "Needs Improvement";
        break;
      case 3:
        prob = "Meets Expectations";
        break;
      default:
        prob = "Exceeds Expectations";
    }
    var probSolv = "Problem solving: " + prob;
    writeStream.write(probSolv + ",,,,,,", "UTF8");
  } else {
    var probSolv = "Problem solving: " + "";
    writeStream.write(probSolv + ",,,,,,", "UTF8");
  }

  // Compliency Documents

  if (template.compliencyDiscrepancy) {
    if (template.compliencyDiscrepancy.IsSelect) {
      if (template.compliencyDiscrepancy.compliencyPeriod) {
        var temp = template.compliencyDiscrepancy.compliencyPeriod;
        const comp_date = new Date(temp);
        // Complnce_date = template[i].compliencyDiscrepancy.compliencyPeriod;
        Complnce_date = format(comp_date);
      }
      Complnce_cause =
        template.compliencyDiscrepancy.compliencyCauseActionTaken;
      Complnce_upload = template.compliencyDiscrepancy.compliencyUploadDocument;
    }
    var compDocumnt = "Compliance: " + Complnce_date;
    var comCause = "Causes: " + Complnce_cause;
    writeStream.write(compDocumnt + ",," + comCause + "\n,,,,,", "UTF8");
  }

  // Creativity
  var creativity = template.creativity;
  var creatvty = "";
  switch (creativity) {
    case 1:
      creatvty = "Not satisfactory";
      break;
    case 2:
      creatvty = "Needs Improvement";
      break;
    case 3:
      creatvty = "Meets Expectations";
      break;
    default:
      creatvty = "Exceeds Expectations";
      break;
  }
  var cred = "Creativity: " + creatvty;
  writeStream.write(cred + ",,,,,", "UTF8");

  // Industry knowledge
  var indKnow = template.industryKnowledge;
  var indusKnow = "";
  switch (indKnow) {
    case 1:
      indusKnow = "Basic";
      break;
    case 2:
      indusKnow = "Intermediate";
      break;
    case 3:
      indusKnow = "Proficient";
      break;
    default:
      indusKnow = "Expert";
  }
  var inKnow = "Industry/domain knowledge: " + indusKnow;
  writeStream.write(inKnow + ",,,,,,,,,,", "UTF8");

  // Building high performance team

  var buildPerf = template.building.IsSelect;
  if (buildPerf != null) {
    var buidPerformance = "";
    switch (buildPerf) {
      case 1:
        buidPerformance = "Not satisfactory";
        break;
      case 2:
        buidPerformance = "Needs Improvement";
        break;
      case 3:
        buidPerformance = "Meets Expectations";
        break;
      default:
        buidPerformance = "Exceeds Expectations";
        break;
    }
    var buildPer = "Building High-Performance teams: " + buidPerformance;
    writeStream.write(buildPer + ",,,,,,", "UTF8");
  } else {
    var buildPer = "Building High-Performance teams: " + "";
    writeStream.write(buildPer + ",,,,,,", "UTF8");
  }

  // Warning Period
  if (template.warning) {
    if (template.warning.IsSelect) {
      if (template.warning.warningPeriod) {
        var temp = template.warning.warningPeriod;
        const warn_date = new Date(temp);
        // warningdate = template[i].warning.warningPeriod;
        warningdate = format(warn_date);
      }
      warningcause = template.warning.warningCauseActionTaken;
      warningupload = template.warning.warningUploadDocument;
    }
    var warnDocumnt = "Warning: " + warningdate;
    var warnCause = "Causes: " + warningcause;
    writeStream.write(warnDocumnt + ",," + warnCause + "\n,,,,,", "UTF8");
  }

  // Team Work

  var teamWork = template.teamWork;
  var team = "";
  switch (teamWork) {
    case 1:
      team = "Not satisfactory";
      break;
    case 2:
      team = "Needs Improvement";
      break;
    case 3:
      team = "Meets Expectations";
      break;
    default:
      team = "Exceeds Expectations";
      break;
  }
  var teamWrk = "Teamwork: " + team;
  writeStream.write(teamWrk + ",,,,,", "UTF8");

  // Subject matter Expert
  var subjMtr = template.academicKnowledge;
  var subMtr = "";
  switch (subjMtr) {
    case 1:
      subMtr = "Basic";
      break;
    case 2:
      subMtr = "Intermediate";
      break;
    case 3:
      subMtr = "Proficient";
      break;
    default:
      subMtr = "Expert";
  }
  var subjMatter = "Subject matter expertise: " + subMtr;
  writeStream.write(subjMatter + ",,,,,,,,,,", "UTF8");

  // Stake Holder Management

  var stkMgmt = template.stakeholder.IsSelect;
  if (stkMgmt != null) {
    var stakeMgmnt = "";
    switch (stkMgmt) {
      case 1:
        stakeMgmnt = "Not satisfactory";
        break;
      case 2:
        stakeMgmnt = "Needs Improvement";
        break;
      case 3:
        stakeMgmnt = "Meets Expectations";
        break;
      default:
        stakeMgmnt = "Exceeds Expectations";
    }
    var stakMgmnt = "Stakeholder management: " + stakeMgmnt;
    writeStream.write(stakMgmnt + ",,,,,,", "UTF8");
  } else {
    var stakMgmnt = "Stakeholder management: " + "";
    writeStream.write(stakMgmnt + ",,,,,,", "UTF8");
  }

  // Show Caused Issue

  if (template.showCausedIssue) {
    if (template.showCausedIssue.IsSelect) {
      if (template.showCausedIssue.showCausedPeriod) {
        var temp = template.showCausedIssue.showCausedPeriod;
        const show_caused_date = new Date(temp);
        // showCausedate = template[i].showCausedIssue.showCausedPeriod;
        showCausedate = format(show_caused_date);
      }
      showCausecause = template.showCausedIssue.showCausedCauseActionTaken;
      showCauseupload = template.showCausedIssue.showCausedUploadDocument;
    }
    var showCauseDocumnt = "Show cause: " + showCausedate;
    var showCauseCause = "Causes: " + showCausecause;
    writeStream.write(
      showCauseDocumnt + ",," + showCauseCause + "\n,,,,,",
      "UTF8"
    );
  }

  // Deals constuctively with pressure
  var constr = template.dealConstructivelyWithPressure;
  var dealConstructivelyPressure = "";
  switch (constr) {
    case 1:
      dealConstructivelyPressure = "Not satisfactory";
      break;
    case 2:
      dealConstructivelyPressure = "Needs Improvement";
      break;
    case 3:
      dealConstructivelyPressure = "Meets Expectations";
      break;
    default:
      dealConstructivelyPressure = "Exceeds Expectations";
      break;
  }
  var pressure = "Ability to handle pressure: " + dealConstructivelyPressure;
  writeStream.write(pressure + ",,,,,", "UTF8");

  // Key Skills

  var kSkills = template.keySkills;
  if (kSkills != null) {
    var keySkl = "Key Skills: " + template.keySkills;
    writeStream.write(keySkl + ",,,,,,,,,,,,,,,", "UTF8");
  } else {
    var keySkl = "Key Skills: " + "Nill";
    writeStream.write(keySkl + ",,,,,,,,,,,,,,,,", "UTF8");
  }

  // Suspension

  if (template.suspension) {
    if (template.suspension.IsSelect) {
      if (template.suspension.suspensionPeriod) {
        var temp = template.suspension.suspensionPeriod;
        const susp_date = new Date(temp);
        performancedate = format(susp_date);
      }
      performancecause = template.suspension.suspensionCauseActionTaken;
    }
    var performnaceDocumnt = "PIP: " + performancedate;
    var performnaceCause = "Causes: " + performancecause;
    writeStream.write(
      performnaceDocumnt + ",," + performnaceCause + "\n,,,,,",
      "UTF8"
    );
  }

  // Discipline

  var displn = template.discipline;
  var discipln = "";
  switch (displn) {
    case 1:
      discipln = "Not satisfactory";
      break;
    case 2:
      discipln = "Needs Improvement";
      break;
    case 3:
      discipln = "Meets Expectations";
      break;
    default:
      discipln = "Exceeds Expectations";
  }
  var displn = "Discipline: " + discipln;
  writeStream.write(displn + ",,,,,", "UTF8");

  // Rhire Again

  var rehireAgain = template.rehireAgain;
  if (rehireAgain != null) {
    var rehire = "Re-hire: " + template.rehireAgain;
    writeStream.write(rehire + ",,,,,,,,,,,,,,,,", "UTF8");
  } else {
    var rehire = "Re-hire: " + "Nill";
    writeStream.write(rehire + ",,,,,,,,,,,,,,,,", "UTF8");
  }

  //Termination

  if (template.termination) {
    if (template.termination.IsSelect) {
      if (template.termination.terminationPeriod) {
        var temp = template.termination.terminationPeriod;
        const term_date = new Date(temp);
        // terminationdate = template[i].termination.terminationPeriod;
        terminationdate = format(term_date);
      }
      terminationcause = template.termination.terminationCauseActionTaken;
    }
    var terminationDocumnt = "Termination: " + terminationdate;
    var terminationCause = "Causes: " + terminationcause;
    writeStream.write(
      terminationDocumnt + ",," + terminationCause + "\n,,,,,,",
      "UTF8"
    );
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
    var fileName = createXL(result[0]);
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
