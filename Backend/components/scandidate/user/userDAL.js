// import mongoose models
const userModel = require("./userModel");

async function createUser(data) {
  const details = new userModel();
  details.organizationId = data.organizationId;
  details.institutionId = data.institutionId;
  details.firstName = data.firstName;
  details.lastName = data.lastName;
  details.role = data.role;
  details.subRole = data.subRole;
  details.email = data.email;
  details.password = data.password;
  details.phoneNumber = data.phoneNumber;
  details.dateOfBirth = data.dateOfBirth;
  details.employeeId = data.employeeId;
  details.currentAddress = data.currentAddress;
  details.permanentAddress = data.permanentAddress;
  details.aboutMe = data.aboutMe;
  details.avatarLink = data.avatarLink;
  details.noOfAssociatedUsers = data.noOfAssociatedUsers;
  details.onboardedById = data.onboardedById;
  details.status = data.status;
  details.createdAt = new Date();
  details.updatedAt = new Date();

  try {
    let result = await details.save();
    return result;
  } catch (err) {
    if (err.message) {
      throw err.message;
    } else {
      throw err;
    }
  }
}

async function getAllUsers(data) {
  try {
    let result = await userModel.find({}).sort({ _id: -1 }).lean();
    return result;
  } catch (err) {
    throw err;
  }
}

async function getUserById(data) {
  try {
    let result = await userModel.findById({ _id: data._id }).lean();
    return result;
  } catch (err) {
    throw err;
  }
}

async function updateUser(data) {
  try {
    let result = await userModel.findOneAndUpdate({ _id: data._id }, data, {
      new: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

async function deleteUser(data) {
  try {
    let result = await userModel.deleteOne({ _id: data._id });
    return result;
  } catch (err) {
    throw err;
  }
}

// export 4 functions i.e create,read,update,delete
module.exports = {
  createUser: createUser,
  getAllUsers: getAllUsers,
  getUserById: getUserById,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
