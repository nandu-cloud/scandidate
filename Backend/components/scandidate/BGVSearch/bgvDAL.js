const studentModel = require("../../institution/OppsUser/AddStudent/studentModel");
const employeeModel = require("../../organization/OppsUser/AddEmployee/employeeModel");
const colors = require("../../../helpers/colors");
const bgvModel = require("./bgvModel");

async function searchBgvDataEmployee(data) {
  var count = Object.keys(data).length;
  if (count == 0) {
    try {
      let employeeSearch = await employeeModel.find();
      return employeeSearch;
    } catch (err) {
      throw err;
    }
  } else {
    try {
      let employeeSearch = await employeeModel.find().and([
        { firstName: { $regex: data.firstName || "", $options: "i" } },
        { dateOfBirth: { $regex: data.dateOfBirth || "" } },
        { phoneNumber: { $regex: data.phoneNumber || "" } },
        { email: { $regex: data.email || "", $options: "i" } },
        {
          organizationName: {
            $regex: data.organizationName || "",
            $options: "i",
          },
        },
        { adharNumber: { $regex: data.adharNumber || "" } },
      ]);
      return employeeSearch;
    } catch (err) {
      throw err;
    }
  }
}

async function searchBgvDataEmployeeId(data) {
  try {
    let employeeSearch = await employeeModel.find(data);
    return employeeSearch;
  } catch (err) {
    throw err;
  }
}

async function searchBgvDataStudent(data) {
  try {
    let studentSearch = await studentModel.find().and([
      { firstName: { $regex: data.firstName || "", $options: "i" } },
      { dateOfBirth: { $regex: data.dateOfBirth || "" } },
      { phoneNumber: { $regex: data.phoneNumber || "" } },
      { email: { $regex: data.email || "", $options: "i" } },
      {
        intitutionName: { $regex: data.intitutionName || "", $options: "i" },
      },
      { adharNumber: { $regex: data.adharNumber || "" } },
    ]);
    // .collation({ locale: "en", strength: 1 });
    return studentSearch;
  } catch (err) {
    throw err;
  }
}

async function searchBgvDataStudentId(data) {
  try {
    let studentSearch = await studentModel.find(data);
    return studentSearch;
  } catch (err) {
    throw err;
  }
}

async function searchByAdharNumberEmployee(data) {
  try {
    let adhSearch = await employeeModel
      .find({ adharNumber: data })
      .sort({ createdAt: -1 });
    return adhSearch;
  } catch (err) {
    throw err;
  }
}

async function searchByAdharNumberInstitute(data) {
  try {
    let adhSearch = await studentModel
      .find({ adharNumber: data })
      .sort({ createdAt: -1 });
    return adhSearch;
  } catch (err) {
    throw err;
  }
}

async function searchByPhoneNumberEmployee(phoneNumber, firstName, lastName) {
  try {
    let adhSearch = await employeeModel
      .find({
        phoneNumber: phoneNumber,
        firstName: firstName,
        lastName: lastName,
      })
      .sort({ createdAt: -1 });
    return adhSearch;
  } catch (err) {
    throw err;
  }
}

async function searchByPhoneNumberInstitute(phoneNumber, firstName, lastName) {
  try {
    let adhSearch = await studentModel
      .find({
        phoneNumber: phoneNumber,
        firstName: firstName,
        lastName: lastName,
      })
      .sort({ createdAt: -1 });
    return adhSearch;
  } catch (err) {
    throw err;
  }
}

async function searchByEmailEmployee(data) {
  try {
    let adhSearch = await employeeModel
      .find({ email: data })
      .sort({ createdAt: -1 });
    return adhSearch;
  } catch (err) {
    throw err;
  }
}

async function searchByEmailInstitute(data) {
  try {
    let adhSearch = await studentModel
      .find({ email: data })
      .sort({ createdAt: -1 });
    return adhSearch;
  } catch (err) {
    throw err;
  }
}

async function searchByNameEmployee(firstName, lastName, dob) {
  try {
    let adhSearch = await employeeModel
      .find({
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dob,
      })
      .sort({ createdAt: -1 });
    return adhSearch;
  } catch (err) {
    throw err;
  }
}

async function searchByNameInstittute(firstName, lastName, dob) {
  try {
    let adhSearch = await studentModel
      .find({
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dob,
      })
      .sort({ createdAt: -1 });
    return adhSearch;
  } catch (err) {
    throw err;
  }
}

// BGV Search

async function saveBGVSearch(data) {
  const bgv = new bgvModel(data);
  try {
    let result = bgv.save();
    return result;
  } catch (err) {
    throw err;
  }
}

async function getBySearchedById(data) {
  try {
    let result = await bgvModel.find({ searchedById: data._id }).lean();
    return result;
  } catch (err) {
    throw err;
  }
}

async function getBySearchedId(data) {
  try {
    let result = await bgvModel
      .find({ bgvSearchedId: data._id, searchedById: data.searchedById })
      .lean();
    return result;
  } catch (err) {
    throw err;
  }
}

async function updateBgvCount(data) {
  try {
    let result = await bgvModel.update({ _id: data._id }, data, {
      new: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

async function pullData(data) {
  try {
    let result = await bgvModel
      .find({ searchedById: data._id })
      .and([
        { adharNumber: { $regex: data.adharNumber || "", $options: "i" } },
        { phoneNumber: { $regex: data.phoneNumber || "", $options: "i" } },
        { email: { $regex: data.email || "", $options: "i" } },
        { firstName: { $regex: data.firstName || "", $options: "i" } },
        { lastName: { $regex: data.lastName || "", $options: "i" } },
      ]);
    return result;
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
  searchBgvDataEmployeeId: searchBgvDataEmployeeId,
  searchBgvDataStudentId: searchBgvDataStudentId,

  //BGV

  saveBGVSearch: saveBGVSearch,
  getBySearchedById: getBySearchedById,
  getBySearchedId: getBySearchedId,
  updateBgvCount: updateBgvCount,
  pullData: pullData,
};
