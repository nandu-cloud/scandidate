const empModel = require("./employeeModel");

async function saveEmployee(data) {
  const employeeData = new empModel(data);
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
    let result = await empModel
      .find({ organisationId: data.organisationId })
      .sort({ _id: -1 })
      .lean();
    return result;
  } catch (err) {
    throw err;
  }
}

async function getEmployeeById(data) {
  try {
    let result = await empModel.find({ _id: data._id }).lean();
    return result;
  } catch (err) {
    throw err;
  }
}

// Update Employee Details
async function updateEmployee(data) {
  try {
    let result = await empModel.findOneAndUpdate({ _id: data._id }, data, {
      new: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  saveEmployee: saveEmployee,
  getIncompleteCandidate: getIncompleteCandidate,
  getEmployeeById: getEmployeeById,
  updateEmployee: updateEmployee,
};
