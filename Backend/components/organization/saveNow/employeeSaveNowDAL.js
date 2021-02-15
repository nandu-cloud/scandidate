const empDAL = require("./employeeModel");

async function saveEmployee(data) {
  const employeeData = new empDAL(data);
  employeeData.createdAt = new Date();
  employeeData.updatedAt = new Date();
  try {
    let result = await employeeData.save();
    return result;
  } catch (err) {
    throw err;
  }
}

//Get All
async function getIncompleteCandidate(data) {
  try {
    let result = await empDAL
      .find({ organisationId: data.organisationId })
      .sort({ _id: -1 })
      .lean();
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  saveEmployee: saveEmployee,
  getIncompleteCandidate: getIncompleteCandidate,
};
