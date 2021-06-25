const empModel = require("../../organization/OppsUser/AddEmployee/employeeModel");
const stdModel = require("../../institution/OppsUser/AddStudent/studentModel");
const orgModel = require("../../scandidate/organization-onboard/orgOnboardModel");
const instModel = require("../../scandidate/institute-onboard/instituteOnboardModel");

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

async function checkDuplicateEmpRecord(data) {
  try {
    var result = await empModel.findOne({
      $and: [
        { organizationName: data.organizationName },
        { email: data.email },
        {
          $or: [
            { dateOfJoining: data.dateOfJoining },
            { exitDate: data.exitDate },
          ],
        },
      ],
    });
    return result;
  } catch (err) {
    throw err;
  }
}

async function checkDuplicateStudentRecord(data) {
  try {
    var result = await stdModel.findOne({
      $and: [
        {
          intitutionName: data.intitutionName,
        },

        { email: data.email },
      ],
    });
    return result;
  } catch (err) {
    throw err;
  }
}

async function showOrganization(data) {
  try {
    let result = await orgModel
      .find({
        organizationName: { $regex: data, $options: "i" },
      })
      .select("_id organizationName");
    return result;
  } catch (err) {
    throw err;
  }
}

async function showInstitution(data) {
  try {
    let result = await instModel
      .find({
        instituteName: { $regex: data, $options: "i" },
      })
      .select("_id instituteName");
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
  checkDuplicateEmpRecord: checkDuplicateEmpRecord,
  checkDuplicateStudentRecord: checkDuplicateStudentRecord,
  showOrganization: showOrganization,
  showInstitution: showInstitution,
};
