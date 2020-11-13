// import mongoose models
const employeeModel = require("./employeeModel");

// Add Employee
async function addEmployee(data) {
  const employeeData = new employeeModel(data);

  employeeData.createdAt = new Date();
  employeeData.updatedAt = new Date();

  try {
    let result = await employeeData.save();
    return result;
  } catch (err) {
    throw err;
  }
}

//Get All
async function getAllUsers(data) {
  try {
    let result = await employeeModel
      .find({ organisationId: data.organisationId })
      .sort({ _id: -1 })
      .lean();
    return result;
  } catch (err) {
    throw err;
  }
}

// Find By Id
async function getEmplyeeById(data) {
  try {
    let result = await employeeModel.findById({ _id: data._id }).lean();
    return result;
  } catch (err) {
    throw err;
  }
}

// Update Employee Details
async function updateEmployee(data) {
  try {
    let result = await employeeModel.findOneAndUpdate({ _id: data._id }, data, {
      new: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// Search Employee

async function search_employee_list(data) {
  try {
    let result = await employeeModel
      .find(data)
      // .and([
      //   { firstName: { $regex: data.firstName || "", $options: "i" } },
      //   { organizationName: { $regex: data.organizationName || "", $options: "i" } },
      //   { email: { $regex: data.email || "", $options: "i" } },
      // ])
      .collation({ locale: "en", strength: 1 });
    console.log(result);
    return result;
  } catch (err) {
    throw err;
  }
}

// export functions
module.exports = {
  addEmployee: addEmployee,
  getAllUsers: getAllUsers,
  search_employee_list: search_employee_list,
  getEmplyeeById: getEmplyeeById,
  updateEmployee: updateEmployee,
};
