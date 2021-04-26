const AppError = require("../../../helpers/appError");
const colors = require("../../../helpers/colors");
const lineManagerDAL = require("./LineManagerDAL");
const empDAL = require('../OppsUser/AddEmployee/employeeDAL');

module.exports.showEmployeeAssignedDetails = async (req, res, next) => {
  const id = req.params.id;
  try {
    let empData = await lineManagerDAL.getEmp(id);
    let getEmById = await empDAL.getEmployeByAddedById(id);

    for (var i = 0; i < getEmById.length; i++) {
      var getEmail = getEmById[i].email;
      for (var j = 0; j < empData.length; j++) {
        var getEmail2 = empData[j].email;
        if (getEmail === getEmail2) {
          empData.splice(j, 1);
        }
      }
    }

    let result = empData.concat(getEmById);

    // let r = result.sort((a, b) => {
    //   return b.createdAt - a.createdAt;
    // })

    let resultData = result.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    if (!result) return next(new AppError("user does not exists!", 404));
    return res
      .status(200)
      .json({ status: 200, message: "Success", data: resultData });
  } catch (err) {
    console.log(colors.red, err);
    return next(new AppError("Something is wrong", 400));
  }
};


module.exports.assignedDataTolineManager = async (req, res, next) => {
  const empId = req.params.empId;
  const linemgrId = req.params.linemanagerId;
  try {
    let fetchDuplicateData = await lineManagerDAL.findDuplicate(empId, linemgrId);
    if (!fetchDuplicateData.length > 0) {
      let result = await lineManagerDAL.fetchData(empId);
      if (!result) return next(new AppError('User not found', 400))
      result.assignedId = linemgrId;
      let { firstName, lastName } = await lineManagerDAL.findassignUser(linemgrId);
      let result3 = await lineManagerDAL.addAssignedLineManager(result);
      if (!result3) return next(new AppError('Something went wrong'))
      return res.json({ status: 200, message: `Successfully assigned to ${firstName + ' ' + lastName}`, data: result });
    } else {
      return res.json({ status: 409, error: 'Already assigned' });
    }
  } catch (err) {
    return next(new AppError('Unable to fetch data', 400))
  }
}

module.exports.checkLineManager = async (req, res, next) => {
  const empId = req.params.empId;
  try {
    let result = await lineManagerDAL.fetchData(empId);
    if (result.assignedId != null) {
      let { firstName, lastName } = await lineManagerDAL.findassignUser(result.assignedId);
      let employeeName = result.firstName + " " + result.lastName;
      return res.status(200).json({ status: 200, data: 'success', message: `${employeeName} already assigned to ${firstName + " " + lastName}`, flag: true });
    } else {
      return res.status(200).json({ status: 200, data: 'success', message: 'Employee not assigned', flag: false });
    }

  } catch (err) {
    return next(new AppError(err, 400));
  }
}