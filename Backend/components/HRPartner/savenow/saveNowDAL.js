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

async function fetchEmployeeEmail(data) {
  try {
    let result = await saveNowModel.find({ email: data.email, status: false });
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  addEmployee: addEmployee,
  fetchEmployeeEmail: fetchEmployeeEmail,
};
