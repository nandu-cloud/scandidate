const studentModel = require("../../institution/OppsUser/AddStudent/studentModel");
const employeeModel = require("../../organization/OppsUser/AddEmployee/employeeModel");
const colors = require("../../../helpers/colors");

async function searchBgvDataEmployee(data) {
  try {
    let employeeSearch = await employeeModel
      .find(data)
      // .and([
      //   { firstName: { $regex: data.firstName, $options: "i" } }

      // ])
      .collation({ locale: "en", strength: 1 });
    return employeeSearch;
  } catch (err) {
    throw err;
  }
}

async function searchBgvDataStudent(data) {
  try {
    let studentSearch = await studentModel
      .find(data)
      // .and([
      //   { firstName: { $regex: data.firstName, $options: "i" } },

      // ])
      .collation({ locale: "en", strength: 1 });
    return studentSearch;
  } catch (err) {
    throw err;
  }
}

async function searchByAdharNumberEmployee(data) {
  try {
    let adhSearch = await employeeModel.find({ adharNumber: data });
    return adhSearch;
  } catch (err) {
    throw err;
  }
}

async function searchByAdharNumberInstitute(data) {
  try {
    let adhSearch = await studentModel.find({ adharNumber: data });
    return adhSearch;
  } catch (err) {
    throw err;
  }
}

async function searchByPhoneNumberEmployee(phoneNumber, firstName, lastName) {
  try {
    let adhSearch = await employeeModel.find({
      phoneNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName,
    });
    return adhSearch;
  } catch (err) {
    throw err;
  }
}

async function searchByPhoneNumberInstitute(phoneNumber, firstName, lastName) {
  try {
    let adhSearch = await studentModel.find({
      phoneNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName,
    });
    return adhSearch;
  } catch (err) {
    throw err;
  }
}

async function searchByEmailEmployee(data) {
  try {
    let adhSearch = await employeeModel.find({ email: data });
    return adhSearch;
  } catch (err) {
    throw err;
  }
}

async function searchByEmailInstitute(data) {
  try {
    let adhSearch = await studentModel.find({ email: data });
    return adhSearch;
  } catch (err) {
    throw err;
  }
}

async function searchByNameEmployee(firstName, lastName, dob) {
  try {
    let adhSearch = await employeeModel.find({
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dob,
    });
    return adhSearch;
  } catch (err) {
    throw err;
  }
}

async function searchByNameInstittute(firstName, lastName, dob) {
  try {
    let adhSearch = await studentModel.find({
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dob,
    });
    return adhSearch;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  searchBgvDataEmployee: searchBgvDataEmployee,
  searchBgvDataStudent: searchBgvDataStudent,
  searchByAdharNumberEmployee: searchByAdharNumberEmployee,
  searchByAdharNumberInstitute: searchByAdharNumberInstitute,
  searchByPhoneNumberEmployee: searchByPhoneNumberEmployee,
  searchByPhoneNumberInstitute: searchByPhoneNumberInstitute,
  searchByEmailEmployee: searchByEmailEmployee,
  searchByEmailInstitute: searchByEmailInstitute,
  searchByNameEmployee: searchByNameEmployee,
  searchByNameInstittute: searchByNameInstittute,
};
