const AppError = require("./../../../helpers/appError");
const colors = require("./../../../helpers/colors");
const bgvDAL = require("./bgvDAL");
const instituionDAL = require("../institute-onboard/instituteOnboardDAL");
const organizationDAL = require("../organization-onboard/orgOnboardDAL");
const bgvSeachDAL = require("./scandidateSearchDAL");

module.exports.searchbgv = async (req, res, next) => {
  let typeOfSearch = "";
  let data = req.body;
  let id = req.params.userId;
  var count = Object.keys(data).length;
  if (count == 0) {
    typeOfSearch = "Universal search";
  } else {
    typeOfSearch = "User Input search";
    console.log(data);
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
