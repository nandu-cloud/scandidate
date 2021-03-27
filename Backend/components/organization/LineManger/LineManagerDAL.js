const empDAl = require("../saveNow/employeeModel");

async function getEmp(id) {
  try {
    let result = await empDAl.find({ assignedId: id }).lean();

    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getEmp: getEmp,
};
