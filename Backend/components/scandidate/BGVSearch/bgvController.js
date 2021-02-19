const AppError = require("./../../../helpers/appError");
const colors = require("./../../../helpers/colors");
const bgvDAL = require("./bgvDAL");
const instituionDAL = require("../institute-onboard/instituteOnboardDAL");
const organizationDAL = require("../organization-onboard/orgOnboardDAL");
const bgvSeachDAL = require("./scandidateSearchDAL");

const ejs = require("ejs");
const path = require("path");
var pdf = require("html-pdf");

module.exports.searchbgv = async (req, res, next) => {
  let typeOfSearch = "";
  let data = req.body;
  let id = req.params.userId;
  var count = Object.keys(data).length;
  if (count == 0) {
    typeOfSearch = "Universal search";
  } else {
    typeOfSearch = "User Input search";
  }
  try {
    let empData = await bgvDAL.searchBgvDataEmployee(data);

    let stdData = await bgvDAL.searchBgvDataStudent(data);

    if (empData.length > 0 && stdData.length > 0) {
      let result = empData.concat(stdData);
      var d = {
        searchdedBy: id,
        successfullSearch: true,
        totalRecords: result.length,
        typeOfSearch: typeOfSearch,
        userInputData: data,
      };
      bgvSeachDAL.saveSearchResult(d);
      return res
        .status(200)
        .json({ status: 200, message: "Success", data: result });
    } else if (empData.length > 0 && !stdData.length > 0) {
      var d = {
        searchdedBy: id,
        successfullSearch: true,
        totalRecords: empData.length,
        typeOfSearch: typeOfSearch,
        userInputData: data,
      };
      bgvSeachDAL.saveSearchResult(d);
      return res
        .status(200)
        .json({ status: 200, message: "Success", data: empData });
    } else if (!empData.length > 0 && stdData.length > 0) {
      var d = {
        searchdedBy: id,
        successfullSearch: true,
        totalRecords: stdData.length,
        typeOfSearch: typeOfSearch,
        userInputData: data,
      };
      bgvSeachDAL.saveSearchResult(d);
      return res
        .status(200)
        .json({ status: 200, message: "Success", data: stdData });
    } else {
      var d = {
        searchdedBy: id,
        successfullSearch: false,
        totalRecords: 0,
        typeOfSearch: typeOfSearch,
      };
      bgvSeachDAL.saveSearchResult(d);
      return res.status(200).json({
        status: 200,
        message: "Success",
        data: [],
      });
    }
  } catch (err) {
    console.log(colors.red, `${err}`);
    return next(new AppError(err, 400));
  }
};

module.exports.searchByIdBGV = async (req, res, next) => {
  let _id = req.params.searchbyid;
  let userId = req.params.id;
  try {
    let empData = await bgvDAL.searchBgvDataEmployeeId({ _id: _id });
    var aadharNumber = "";
    var phoneNumber = "";
    var email = "";
    var firstName = "";
    var lastName = "";
    var dob = "";

    if (empData.length > 0) {
      aadharNumber = empData[0].adharNumber;
      phoneNumber = empData[0].phoneNumber;
      email = empData[0].email;
      firstName = empData[0].firstName;
      lastName = empData[0].lastName;
      dob = empData[0].dateOfBirth;

      let checkData = await bgvDAL.pullData({
        _id: userId,
        adharNumber: aadharNumber,
        phoneNumber: phoneNumber,
        email: email,
        firstName: firstName,
        lastName: lastName,
      });

      if (checkData.length < 1) {
        var date = new Date();
        date.setDate(date.getDate() + 30);
        var expireDate = date;
        await bgvDAL.saveBGVSearch({
          searchedById: userId,
          bgvSearchCount: 1,
          bgvSearchedDate: new Date(),
          bgvSearchExpireDate: expireDate,
          bgvSearchedId: _id,
          adharNumber: aadharNumber,
          phoneNumber: phoneNumber,
          email: email,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dob,
        });
      } else {
        let { bgvSearchCount, bgvSearchExpireDate } = checkData[0];
        var totdays_Date = new Date();
        var Difference_In_Time =
          bgvSearchExpireDate.getTime() - totdays_Date.getTime();
        var difference_In_Days = Math.floor(
          Difference_In_Time / (1000 * 3600 * 24)
        );

        if (difference_In_Days == 0) {
          var id = checkData[0]._id;
          await bgvDAL.updateBgvCount({
            _id: id,
            bgvSearchCount: bgvSearchCount + 1,
          });
        }
      }
    } else {
      let stuData = await bgvDAL.searchBgvDataStudentId({ _id: _id });
      if (stuData.length > 0) {
        aadharNumber = stuData[0].adharNumber;
        phoneNumber = stuData[0].phoneNumber;
        email = stuData[0].email;
        firstName = stuData[0].firstName;
        lastName = stuData[0].lastName;
        dob = stuData[0].dateOfBirth;

        let checkData = await bgvDAL.pullData({
          _id: userId,
          adharNumber: aadharNumber,
          phoneNumber: phoneNumber,
          email: email,
          firstName: firstName,
          lastName: lastName,
        });

        if (checkData.length < 1) {
          var date = new Date();
          date.setDate(date.getDate() + 30);
          var expireDate = date;
          await bgvDAL.saveBGVSearch({
            searchedById: userId,
            bgvSearchCount: 1,
            bgvSearchedDate: new Date(),
            bgvSearchExpireDate: expireDate,
            bgvSearchedId: _id,
            adharNumber: aadharNumber,
            phoneNumber: phoneNumber,
            email: email,
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dob,
          });
        } else {
          let { bgvSearchCount, bgvSearchExpireDate } = checkData[0];
          var totdays_Date = new Date();
          var Difference_In_Time =
            bgvSearchExpireDate.getTime() - totdays_Date.getTime();
          var difference_In_Days = Math.floor(
            Difference_In_Time / (1000 * 3600 * 24)
          );

          if (difference_In_Days == 0) {
            var id = checkData[0]._id;
            await bgvDAL.updateBgvCount({
              _id: id,
              bgvSearchCount: bgvSearchCount + 1,
            });
          }
        }
      } else {
        return res.status(404).json({ status: 404, message: "No data found" });
      }
    }

    if (aadharNumber.length > 0) {
      try {
        let empAdharData = await bgvDAL.searchByAdharNumberEmployee(
          aadharNumber
        );
        let studentAdharData = await bgvDAL.searchByAdharNumberInstitute(
          aadharNumber
        );

        let resultData = empAdharData.concat(studentAdharData);

        return res.status(200).json({
          status: 200,
          message: "SUCCESS",
          data: resultData,
        });
      } catch (err) {
        return next(new AppError(err, 400));
      }
    }

    if (email.length > 0) {
      try {
        let empEmailData = await bgvDAL.searchByEmailEmployee(email);
        let studentEmailData = await bgvDAL.searchByEmailInstitute(email);
        let resultData = empEmailData.concat(studentEmailData);
        return res
          .status(200)
          .json({ status: 200, message: "SUCCESS", data: resultData });
      } catch (err) {
        return next(new AppError(err, 400));
      }
    }

    if (phoneNumber.length > 0) {
      try {
        let empPhoneData = await bgvDAL.searchByPhoneNumberEmployee(
          phoneNumber,
          firstName,
          lastName
        );
        let studentPhoneData = await bgvDAL.searchByPhoneNumberInstitute(
          phoneNumber,
          firstName,
          lastName
        );
        let resultData = empPhoneData.concat(studentPhoneData);
        return res.status(200).json({
          status: 200,
          message: "SUCCESS",
          data: resultData,
        });
      } catch (err) {
        return next(new AppError(err, 400));
      }
    } else {
      try {
        let findByNameEmp = await bgvDAL.searchByNameEmployee(
          firstName,
          lastName,
          dob
        );
        let findByNameStudent = await bgvDAL.searchByNameInstittute(
          firstName,
          lastName,
          dob
        );
        let resultData = findByNameEmp.concat(findByNameStudent);
        return res.status(200).json({
          status: 200,
          message: "SUCCESS",
          data: resultData,
        });
      } catch (err) {
        return next(new AppError(err, 400));
      }
    }
  } catch (err) {
    console.log(colors.red, `${err}`);
    return next(new AppError(err, 400));
  }
};

module.exports.searchIconOrganizationInstitute = async (req, res, next) => {
  var orgReq = req.body.organisationId;
  var instReq = req.body.instituteId;
  var orgJson = [];
  var instJson = [];

  if (orgReq.length > 0) {
    try {
      for (var i = 0; i < orgReq.length; i++) {
        let result = await organizationDAL.getOrganisationByIdNew(orgReq[i]);
        orgJson.push(result);
      }
    } catch (err) {
      return next(new AppError(err, 400));
    }
  }

  if (instReq.length > 0) {
    try {
      for (var i = 0; i < instReq.length; i++) {
        let result = await instituionDAL.getInstituteByIdNew(instReq[i]);
        instJson.push(result);
      }
    } catch (err) {
      return next(new AppError(err, 400));
    }
  }

  let result = orgJson.concat(instJson);
  return res.status(200).json({
    status: 200,
    message: "SUCCESS",
    data: result,
  });
};

module.exports.downloadscandidateSeach = async (req, res, next) => {
  let template = req.body.data;
  let icons = req.body.data1;

  if (!template || !icons) {
    return next(new AppError("Employee/Student details not found", 400));
  } else if (template.length === 0 || icons.length === 0) {
    return next(new AppError("Details not found", 400));
  }

  function format(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return "" + (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;
  }

  var fname = template[0].firstName;
  var lname = template[0].lastName;
  var pNumber = template[0].phoneNumber;
  var eml = template[0].email;
  var today = new Date();
  var dateString = format(today);

  for (let i = 0; i < template.length; i++) {
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

    //Creativity

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

    //Team Work

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

    //Deals Constructively With Pressure

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

    //discipline

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

    //comm skill

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

    //industry know

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

    //pro unders

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

    //sub matter to expertise

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

    // //problemsolving

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
        var temp = template[i].discrepancyDocuments.descrepencyPeriod;
        const dis_date = new Date(temp);
        // discrpncy_date = format(template[i].discrepancyDocuments.descrepencyPeriod);
        discrpncy_date = format(dis_date);
        discrpncy_cause =
          template[i].discrepancyDocuments.descrepencyCauseActionTaken;
        discrpncy_upload =
          template[i].discrepancyDocuments.descrepencyUploadDocument;
      }
    }

    if (template[i].compliencyDiscrepancy) {
      if (template[i].compliencyDiscrepancy.IsSelect) {
        var temp = template[i].compliencyDiscrepancy.compliencyPeriod;
        const comp_date = new Date(temp);
        // Complnce_date = template[i].compliencyDiscrepancy.compliencyPeriod;
        Complnce_date = format(comp_date);
        Complnce_cause =
          template[i].compliencyDiscrepancy.compliencyCauseActionTaken;
        Complnce_upload =
          template[i].compliencyDiscrepancy.compliencyUploadDocument;
      }
    }

    if (template[i].warning) {
      if (template[i].warning.IsSelect) {
        var temp = template[i].warning.warningPeriod;
        const warn_date = new Date(temp);
        // warningdate = template[i].warning.warningPeriod;
        warningdate = format(warn_date);
        warningcause = template[i].warning.warningCauseActionTaken;
        warningupload = template[i].warning.warningUploadDocument;
      }
    }

    if (template[i].showCausedIssue) {
      if (template[i].showCausedIssue.IsSelect) {
        var temp = template[i].showCausedIssue.showCausedPeriod;
        const show_caused_date = new Date(temp);
        // showCausedate = template[i].showCausedIssue.showCausedPeriod;
        showCausedate = format(show_caused_date);
        showCausecause = template[i].showCausedIssue.showCausedCauseActionTaken;
        showCauseupload = template[i].showCausedIssue.showCausedUploadDocument;
      }
    }

    if (template[i].suspension) {
      if (template[i].suspension.IsSelect) {
        var temp = template[i].suspension.suspensionPeriod;
        const susp_date = new Date(temp);
        // performancedate = template[i].suspension.suspensionPeriod;
        performancedate = format(susp_date);
        performancecause = template[i].suspension.suspensionCauseActionTaken;
        performanceupload = template[i].suspension.suspensionUploadDocument;
      }
    }

    if (template[i].termination) {
      if (template[i].termination.IsSelect) {
        var temp = template[i].termination.terminationPeriod;
        const term_date = new Date(temp);
        // terminationdate = template[i].termination.terminationPeriod;
        terminationdate = format(term_date);
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

  var result = {
    FirstName: fname,
    LastName: lname,
    phone: pNumber,
    email: eml,
    orgLogo: `${process.env.FRONT_END_URL}` + "/public/organization_logo/",
    instLogo: `${process.env.FRONT_END_URL}` + "/public/institute_logo/",
    myDate: dateString,
    data: template,
    data1: icons,
  };

  try {
    ejs.renderFile(
      path.join(
        __dirname,
        "../../scandidate/BGVSearch/BGVTemplate/scandidate-report.ejs"
      ),
      result,
      function (err, str) {
        if (err) {
          return next(new AppError(err, 400));
        }

        // Test
        var checkFilePath = path.join(
          __dirname,
          "../../../uploads/scandidate-report/" +
            fname +
            new Date().getTime() +
            ".pdf"
        );
        var fileName = fname + new Date().getTime() + ".pdf";

        // var tempFilename =
        //   "uploads/scandidate-report/" + fname + new Date().getTime() + ".pdf";
        // var temFilepath = checkFilePath;
        pdf.create(str).toFile(checkFilePath, function (err, data) {
          if (err) {
            return next(new AppError(err, 400));
          }

          var fileName = fname + new Date().getTime() + ".pdf";
          console.log(fileName);
          return res.status(200).download(checkFilePath, fileName, (err) => {
            if (err) {
              if (err.code == "ENOENT")
                return next(new AppError("user document not found", 404));
            }
          });
        });
      }
    );
  } catch (err) {
    return next(new AppError(err, 400));
  }
};
