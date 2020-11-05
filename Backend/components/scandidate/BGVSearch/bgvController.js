const AppError = require("./../../../helpers/appError");
const colors = require("./../../../helpers/colors");
const bgvDAL = require("./bgvDAL");

module.exports.searchbgv = async (req, res, next) => {
  let data = req.body;
  try {
    let empData = await bgvDAL.searchBgvDataEmployee(data);

    let stdData = await bgvDAL.searchBgvDataStudent(data);

    if (empData.length > 0 && stdData.length > 0) {
      let result = empData.concat(stdData);
      return res
        .status(200)
        .json({ status: 200, message: "Success", data: result });
    } else if (empData.length > 0 && !stdData.length > 0) {
      return res
        .status(200)
        .json({ status: 200, message: "Success", data: empData });
    } else if (!empData.length > 0 && stdData.length > 0) {
      return res
        .status(200)
        .json({ status: 200, message: "Success", data: stdData });
    } else {
      return res.status(404).json({
        status: 404,
        message: "No Such employee or student is found",
        data: [],
      });
    }
  } catch (err) {
    console.log(colors.red, `${err}`);
    return next(new AppError(err, 400));
  }
};

module.exports.searchById = async (req, res, next) => {
  let _id = req.params.searchbyid;
  try {
    let empData = await bgvDAL.searchBgvDataEmployee({ _id: _id });
    var adharNumber;
    var phoneNumber;
    var email;
    var firstName;
    var lastName;

    if (empData.length > 0) {
      console.log("------------ I am here Organization----------");
      console.log(colors.green, empData[0]);
      adharNumber = empData[0].adharNumber;
      phoneNumber = empData[0].phoneNumber;
      email = empData[0].email;
      firstName = empData[0].firstName;
      lastName = empData[0].lastName;
    } else {
      let stuData = await bgvDAL.searchBgvDataStudent({ _id: _id });
      console.log("------------ I am here Institute----------");
      console.log(colors.green, stuData[0]);
      adharNumber = stuData[0].adharNumber;
      phoneNumber = stuData[0].phoneNumber;
      email = stuData[0].email;
      firstName = stuData[0].firstName;
      lastName = stuData[0].lastName;
    }

    if (adharNumber != null) {
      try {
        let empAdharData = await bgvDAL.searchByAdharNumberEmployee(
          adharNumber
        );
        let studentAdharData = await bgvDAL.searchByAdharNumberInstitute(
          adharNumber
        );
        let resultData = empAdharData.concat(studentAdharData);
        return res
          .status(200)
          .json({ status: 200, message: "SUCCESS", data: resultData });
      } catch (err) {
        return next(new AppError(err, 400));
      }
    }

    if (phoneNumber > 0) {
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
        return res
          .status(200)
          .json({ status: 200, message: "SUCCESS", data: resultData });
      } catch (err) {
        return next(new AppError(err, 400));
      }
    }

    if (email != null) {
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
  } catch (err) {
    console.log(colors.red, `${err}`);
    return next(new AppError(err, 400));
  }
};
