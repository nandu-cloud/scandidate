// import mongoose models
const studentModel = require("./studentModel");
const csv = require("csvtojson");
const studentDataValidator = require("./studentValidator");
const bodyParser = require("body-parser");
const { $where } = require("./studentModel");

// Add Organisation
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

//Add Student From CSV
async function addStudentCsv(path, id, instituteId1) {
  var yearOfJoining;
  var yearOfPassout;
  var phoneNumber;
  try {
    csv()
      .fromFile(path)
      .then((jsonObj) => {
        // for (var x = 0; x < jsonObj.length; x++) {

        //   yearOfJoining = parseInt(jsonObj[x].yearOfJoining);
        //   jsonObj[x].yearOfJoining = yearOfJoining;

        //   yearOfPassout = parseInt(jsonObj[x].yearOfPassout);
        //   jsonObj[x].yearOfPassout = yearOfPassout;

        //   phoneNumber = parseInt(jsonObj[x].phoneNumber);
        //   jsonObj[x].phoneNumber = phoneNumber;

        //   jsonObj[x].addedById = id;
        //   jsonObj[x].instituteId = instituteId1;

        // }
        try {
          // console.log("-------I am here 1------");
          // studentDataValidator.addStudentSchema.validateAsync(jsonObj);
          // console.log("-------I am here 2------");
          // let result = studentModel.insertMany(jsonObj);
          // console.log("-------I am here 3------");
          // console.log(result);
          // return result;
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
    let result = await studentModel
      .find({ instituteId: data.instituteId })
      .sort({ _id: -1 })
      .lean();
    return result;
  } catch (err) {
    throw err;
  }
}
// Find By Id
async function getStudentById(data) {
  try {
    let result = await studentModel.findById({ _id: data._id }).lean();
    let r = result;
    let { eductionalDocumentNames } = r;
    for (var i = 0; i < eductionalDocumentNames.length; i++) {
      var r1 = eductionalDocumentNames[i].match(/[^\d]+|\d+/g);
      eductionalDocumentNames[i] = r1[1];
    }
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
  console.log(data);

  try {
    let result = await studentModel
      .find()
      .and([
        { firstName: { $regex: data.firstName || "", $options: "i" } },
        { intitutionName: { $regex: data.intitutionName || "", $options: "i" } },
        { phoneNumber: { $regex: data.phoneNumber || "" } },
        { yearOfPassout: { $regex: data.yearOfPassout || "" } }
      ])
    // .collation({ locale: "en", strength: 1 });
    return result;
  } catch (err) {
    throw err;
  }
}

// File Count





// export functions
module.exports = {
  addStudent: addStudent,
  getAllUsers: getAllUsers,
  getStudentById: getStudentById,
  updateStudent: updateStudent,
  search_student_new: search_student_new,
  addStudentCsv: addStudentCsv,
};
