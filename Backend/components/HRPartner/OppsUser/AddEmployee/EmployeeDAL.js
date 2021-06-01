const empModel = require("./EmployeeModel");

async function saveEmployee(data) {
  const emp = new empModel(data);
  try {
    let result = await emp.save();
    return result;
  } catch (err) {
    throw err;
  }
}

async function findEmployee(data) {
  try {
    let result = await empModel
      .find({
        organisationId: data.organisationId,
      })
      .sort({ _id: -1 })
      .lean();
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  saveEmployee: saveEmployee,
  findEmployee: findEmployee,
};
