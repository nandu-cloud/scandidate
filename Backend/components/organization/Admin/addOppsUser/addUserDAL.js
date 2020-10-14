const userModel = require("./../../../scandidate/user/userModel");

async function createUser(data) {
  console.log("T2")
  const details = new userModel();
  details.organizationId = data.organizationId;
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

//Get All User Of Current Organisation
async function getAllUsers(data) {
  try {
    let result = await userModel.find({ organizationId: data.organizationId }).sort({ _id: -1 }).lean();
    return result;
  } catch (err) {
    throw err;
  }
}

//Get User By ID
async function getUserById(data) {
  try {
    let result = await userModel.findById({ _id: data._id }).lean();
    return result;
  } catch (err) {
    throw err;
  }
}

//Update User
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

module.exports = {
    createUser: createUser,
    getAllUsers:getAllUsers,
    getUserById:getUserById,
    updateUser:updateUser,
  };