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

async function getStudent(data) {
  try {
    let result = await studentModel.findOne({ _id: data._id });
    return result;
  } catch (err) {
    throw err;
  }
}

async function updateStudent(data) {
  try {
    let result = await studentModel.findOneAndUpdate({ _id: data._id }, data, {
      new: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  addStudent: addStudent,
  getStudent: getStudent,
  updateStudent: updateStudent,
};
