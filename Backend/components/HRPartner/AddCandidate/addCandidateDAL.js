const empModel = require("../../organization/OppsUser/AddEmployee/employeeModel");
const stdModel = require("../../institution/OppsUser/AddStudent/studentModel");

async function fetchCandidateEmployeeData(data) {
  try {
    let result = await empModel.findOne({
      _id: data._id,
      bgvCandidate: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

async function fetchCandidateStudent(data) {
  try {
    let result = await stdModel.findOne({
      _id: data._id,
      bgvCandidate: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

async function fetchEmployee(data) {
  try {
    let result = await empModel.find({ email: data.email, bgvCandidate: true });

    return result;
  } catch (err) {
    throw err;
  }
}

async function fetchStudent(data) {
  try {
    let result = await stdModel.find({ email: data.email, bgvCandidate: true });
    return result;
  } catch (err) {
    throw err;
  }
}

async function findByCandIdEmployee(data) {
  try {
    let result = await empModel.findById({ _id: data._id });
    return result;
  } catch (err) {
    throw err;
  }
}

async function findByCandIdStudent(data) {
  try {
    let result = await stdModel.findById({ _id: data._id });
    return result;
  } catch (err) {
    throw err;
  }
}

async function updateDataByIdEmp(data) {
  try {
    let result = await empModel.findOneAndUpdate({ _id: data._id }, data, {
      new: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

async function updateDataByIdStd(data) {
  try {
    let result = await stdModel.findOneAndUpdate({ _id: data._id }, data, {
      new: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  fetchCandidateEmployeeData: fetchCandidateEmployeeData,
  fetchCandidateStudent: fetchCandidateStudent,
  fetchEmployee: fetchEmployee,
  fetchStudent: fetchStudent,
  updateDataByIdEmp: updateDataByIdEmp,
  findByCandIdEmployee: findByCandIdEmployee,
  findByCandIdStudent: findByCandIdStudent,
  updateDataByIdStd: updateDataByIdStd,
};
