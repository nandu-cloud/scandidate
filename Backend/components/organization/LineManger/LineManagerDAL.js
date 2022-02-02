const empDAl = require("../saveNow/employeeModel");
const userDAL = require("../../scandidate/user/userModel");
const mongoose = require("mongoose");

async function getEmp(id) {
  try {
    let result = await empDAl.find({ assignedId: id }).lean();
    return result;
  } catch (err) {
    throw err;
  }
}

async function fetchData(empId) {
  try {
    var _id = mongoose.Types.ObjectId(empId);
    let result = await empDAl.findById({ _id: _id }).lean();
    return result;
  } catch (err) {
    throw err;
  }
}

async function addAssignedLineManager(data) {
  try {
    let result = await empDAl.findByIdAndUpdate({ _id: data._id }, data, {
      new: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

async function findassignUser(data) {
  try {
    let _id = mongoose.Types.ObjectId(data);
    let result = await userDAL.findById({ _id: _id });
    return result;
  } catch (err) {
    throw err;
  }
}

async function findDuplicate(empId, linemgrId) {
  try {
    let result = await empDAl.find({
      _id: mongoose.Types.ObjectId(empId),
      assignedId: linemgrId,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getEmp: getEmp,
  fetchData: fetchData,
  addAssignedLineManager: addAssignedLineManager,
  findassignUser: findassignUser,
  findDuplicate: findDuplicate,
};
