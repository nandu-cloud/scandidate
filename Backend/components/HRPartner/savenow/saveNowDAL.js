const saveNowModelEmployee = require("../../organization/saveNow/employeeModel");
const saveNoModelStudent = require("../../institution/saveNow/studentModel");

async function checkEmployeeIfExists(data) {
  try {
    let result = await saveNowModelEmployee.find({
      email: data.email,
      $or: [{ dateOfJoining: data.dateOfJoining }, { exitDate: data.exitDate }],
    });
    return result;
  } catch (err) {
    throw err;
  }
}

async function saveNowEmployee(data) {
  const saveNow = new saveNowModelEmployee(data);
  try {
    let result = await saveNow.save();
    return result;
  } catch (err) {
    throw err;
  }
}

async function updateSaveNowEmployee(data) {
  try {
    let result = await saveNowModelEmployee.findOneAndUpdate(
      { email: data.email, organisationId: data.organisationId },
      data,
      { new: true }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

async function checkStudentExists(data) {
  try {
    let result = await saveNoModelStudent.find({
      email: data.email,
      intitutionName: data.intitutionName,
    });
    return result;
  } catch (err) {}
}

async function saveNowStudent(data) {
  const saveNow = new saveNoModelStudent(data);
  try {
    let result = await saveNow.save();
    return result;
  } catch (err) {
    throw err;
  }
}

async function updateSaveNowStudent(data) {
  try {
    let result = await saveNoModelStudent.findOneAndUpdate(
      {
        email: data.email,
        instituteId: data.instituteId,
      },
      data,
      { new: true }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

async function showEmployeeByHrOrganisation(data) {
  try {
    let result = await saveNowModelEmployee.find({ hrorganisationId: data });
    return result;
  } catch (err) {
    throw err;
  }
}

async function showStudentByHrOrganisation(data) {
  try {
    let result = await saveNoModelStudent.find({ hrorganisationId: data });
    return result;
  } catch (err) {
    throw err;
  }
}

async function showEmployeeById(data) {
  try {
    let result = await saveNowModelEmployee.findOne({ _id: data._id });
    return result;
  } catch (err) {
    throw err;
  }
}

async function showStudentById(data) {
  try {
    let result = await saveNoModelStudent.findOne({ _id: data._id });
    return result;
  } catch (err) {
    throw err;
  }
}

async function fetchCandidateEmployeeData(data) {
  try {
    let result = await saveNowModelEmployee.findOne({
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
    let result = await saveNoModelStudent.findOne({
      _id: data._id,
      bgvCandidate: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

/// Email

async function fetchEmployeeEmail(data) {
  try {
    let result = await saveNowModelEmployee.find({
      email: data.email,
      bgvCandidate: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

async function fetchStudentEmail(data) {
  try {
    let result = await saveNoModelStudent.find({
      email: data.email,
      bgvCandidate: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  checkEmployeeIfExists: checkEmployeeIfExists,
  saveNowEmployee: saveNowEmployee,
  updateSaveNowEmployee: updateSaveNowEmployee,
  checkStudentExists: checkStudentExists,
  saveNowStudent: saveNowStudent,
  updateSaveNowStudent: updateSaveNowStudent,
  showEmployeeByHrOrganisation: showEmployeeByHrOrganisation,
  showStudentByHrOrganisation: showStudentByHrOrganisation,
  showEmployeeById: showEmployeeById,
  showStudentById: showStudentById,
  fetchCandidateEmployeeData: fetchCandidateEmployeeData,
  fetchCandidateStudent: fetchCandidateStudent,
  fetchEmployeeEmail: fetchEmployeeEmail,
  fetchStudentEmail: fetchStudentEmail,
};
