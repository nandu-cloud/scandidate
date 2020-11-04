const AppError = require("./../../../helpers/appError");
const colors = require("./../../../helpers/colors");
const bgvDAL = require("./bgvDAL");

module.exports.searchbgv = async (req, res, next) => {
  let data = req.body;
  try {
    let empData = await bgvDAL.searchBgvDataEmployee(data);
    // if (empData.length > 0) {
    //   return res
    //     .status(200)
    //     .json({ status: 200, message: "Success", data: empData });
    // }
    let stdData = await bgvDAL.searchBgvDataStudent(data);
    // if (stdData.length > 0) {
    //   return res
    //     .status(200)
    //     .json({ status: 200, message: "Success", data: stdData });
    // } else {
    //   return res.status(404).json({
    //     status: 404,
    //     message: "No Such employee or student is found",
    //     data: [],
    //   });
    // }
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
    if (empData.length > 0) {
      return res
        .status(200)
        .json({ status: 200, message: "Success", data: empData });
    }
    let stdData = await bgvDAL.searchBgvDataStudent({ _id: _id });
    if (stdData.length > 0) {
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
