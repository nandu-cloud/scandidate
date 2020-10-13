// import mongoose models
const studentModel = require("./studentModel");
const csv = require('csvtojson');
const studentDataValidator = require("./studentValidator");
const bodyParser = require('body-parser');

// Add Organisation
async function addStudent(data) {
  const studentData = new studentModel();
  studentData.nameOfCourse = data.nameOfCourse;
  studentData.yearOfJoining = data.yearOfJoining;
  studentData.yearOfPassout = data.yearOfPassout;
  studentData.studentType = data.studentType;
  studentData.extraActivity = data.extraActivity;
  studentData.extraActivityDocumentName = data.extraActivityDocumentName;
  studentData.eductionalDocumentNames = data.eductionalDocumentNames;
  studentData.noOfEductionalDocuments = data.noOfEductionalDocuments;
  studentData.firstName = data.firstName;
  studentData.lastName = data.lastName;
  studentData.roll = data.roll;
  studentData.email = data.email;
  studentData.phoneNumber = data.phoneNumber;
  studentData.address = data.address;
  studentData.addedById = data.addedById;
  studentData.instituteId=data.instituteId;
  studentData.createdAt = new Date();
  studentData.updatedAt = new Date();

  try {
    let result = await studentData.save();
    return result;
  } catch (err) {
    throw err;
  }
}

//Add Student From CSV
async function addStudentCsv(path,id,instituteId1) {
  var yearOfJoining;
  var yearOfPassout;
  var phoneNumber;
  csv()
    .fromFile(path)
    .then((jsonObj) => {
      for (var x = 0; x < jsonObj.length; x++) {
        yearOfJoining = parseInt(jsonObj[x].yearOfJoining)
        jsonObj[x].yearOfJoining = yearOfJoining;

        yearOfPassout = parseInt(jsonObj[x].yearOfPassout);
        jsonObj[x].yearOfPassout = yearOfPassout;

        phoneNumber = parseInt(jsonObj[x].phoneNumber);
        jsonObj[x].phoneNumber = phoneNumber;

        jsonObj[x].addedById=id;
        jsonObj[x].instituteId=instituteId1;
      };
      try {
        let result = studentModel.insertMany(jsonObj);
        return result;
      } catch (err) {
        throw err;
      }
    });
}

async function getAllUsers(data) {
  try {
    let result = await studentModel.find({}).sort({ _id: -1 }).lean();
    return result;
  } catch (err) {
    throw err;
  }
}
// Find By Id
async function getStudentById(data) {
  try {
    let result = await studentModel.findById({ _id: data._id }).lean();
    return result;
  } catch (err) {
    throw err;
  }
}

//Update Student Details
async function updateStudent(data) {
  try {
    let result = await studentModel.findOneAndUpdate(
      { _id: data._id },
      data,
      {
        new: true,
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

// export functions
module.exports = {
  addStudent: addStudent,
  getAllUsers: getAllUsers,
  getStudentById: getStudentById,
  updateStudent: updateStudent,
  addStudentCsv: addStudentCsv,
};
