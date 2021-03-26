const userModel = require("./../../../scandidate/user/userModel");

async function createUser(data) {
  const details = new userModel(data);

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
    let result = await userModel
      .find({ organizationId: data.organizationId })
      .sort({ _id: -1 })
      .lean();
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

async function showAllLineManager() {
  try {
    let result = await userModel
      .find({ subRole: "LINE MANAGER" })
      .select("_id firstName lastName")
      .sort({ _id: -1 })
      .lean();
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createUser: createUser,
  getAllUsers: getAllUsers,
  getUserById: getUserById,
  updateUser: updateUser,
  showAllLineManager: showAllLineManager,
};
