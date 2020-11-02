// import mongoose models
const studentModel = require("./studentModel");
const csv = require("csvtojson");
const studentDataValidator = require("./studentValidator");
const bodyParser = require("body-parser");

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
  studentData.aadharNo = data.aadharNo;
  studentData.intitutionName = data.intitutionName;
  studentData.addedById = data.addedById;
  studentData.instituteId = data.instituteId;
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
async function addStudentCsv(path, id, instituteId1) {
  var yearOfJoining;
  var yearOfPassout;
  var phoneNumber;
  try {
    csv()
      .fromFile(path)
      .then((jsonObj) => {
        console.log("----Length of the CSV is-----", jsonObj.length);
        for (var x = 0; x < jsonObj.length; x++) {
          console.log(jsonObj[x].yearOfJoining);
          if (jsonObj[x].yearOfJoining === null) {
            return new Error("Year of joining cann't be empty");
          }
          yearOfJoining = parseInt(jsonObj[x].yearOfJoining);
          jsonObj[x].yearOfJoining = yearOfJoining;

          if (jsonObj[x].yearOfPassout === null) {
            return new Error("Year of graduation cann't be empty");
          }


          yearOfPassout = parseInt(jsonObj[x].yearOfPassout);
          jsonObj[x].yearOfPassout = yearOfPassout;

          if (jsonObj[x].phoneNumber === null) {
            return new Error("Phone number cannt be empty");
          }
          phoneNumber = parseInt(jsonObj[x].phoneNumber);
          jsonObj[x].phoneNumber = phoneNumber;

          if (jsonObj[x].instituteId === null) {
            return new Error("Institute Id cann't be empty");
          }

          jsonObj[x].addedById = id;
          jsonObj[x].instituteId = instituteId1;


        }
        try {
          let result = studentModel.insertMany(jsonObj);
          return result;
        } catch (err) {
          throw err;
        }
      });
  } catch (err) {
    throw err;
  }
}

async function getAllUsers(data) {
  try {
    let result = await studentModel.find({ instituteId: data.instituteId }).sort({ _id: -1 }).lean();
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
    let result = await studentModel.findOneAndUpdate({ _id: data._id }, data, {
      new: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

//Seacrh Student

async function search_student_new(data) {
  try {
    let result = await studentModel.find(data).collation({ locale: 'en', strength: 1 });;
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
  search_student_new: search_student_new,
  addStudentCsv: addStudentCsv,
};
