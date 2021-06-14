const studentModel = require("./studentModel");

async function addStudent(data) {
  const studentData = new studentModel(data);

  studentData.createdAt = new Date();
  studentData.updatedAt = new Date();

  try {
    let result = await studentData.save();
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  addStudent: addStudent,
};
