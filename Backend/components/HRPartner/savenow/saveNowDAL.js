const saveNowModel = require("../../organization/saveNow/employeeModel");

async function addEmployee(data) {
  const employeeData = new saveNowModel(data);

  employeeData.createdAt = new Date();
  employeeData.updatedAt = new Date();

  try {
    let result = await employeeData.save();
    return result;
  } catch (err) {
    throw err;
  }
}

async function getEmployee(data) {
  try {
    let result = await saveNowModel.findOne({ _id: data._id });
    return result;
  } catch (err) {
    throw err;
  }
}

async function updateEmployee(data) {
  try {
    let result = await saveNowModel.findOneAndUpdate({ _id: data._id }, data, {
      new: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  addEmployee: addEmployee,
  getEmployee: getEmployee,
  updateEmployee: updateEmployee,
};
