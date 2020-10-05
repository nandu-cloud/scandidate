const userModel = require("./../../../scandidate/user/userModel");

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


module.exports = {
    createUser: createUser,
  };