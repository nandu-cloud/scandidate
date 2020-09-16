const AppError = require("./../../../helpers/appError");

module.exports.getUserDetails = async function (req, res, next) {
  var data = { _id: req.params.id };
  try {
    let userData = await userDetails.getSingleUser(data);
    // console.log(colors.green,`getUserDetails ${userData}`);
    res.status(200).json({ status: "SUCCESS", message: null, data: userData });
  } catch (err) {
    console.log(colors.red, `getUserDetails err ${err}`);
    return next(new AppError(err, 400));
  }
};
