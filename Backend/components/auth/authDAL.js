// import mongoose models
const userModel = require("../scandidate/user/userModel");

async function authUser(data) {
  try {
    let result = await userModel
      .findOne({ email: data.email })
      .select(
        "organizationId institutionId firstName lastName role subRole  email avatarLink password"
      )
      .lean();
    return result;
  } catch (err) {
    throw err;
  }
}

async function updateOTP(data) {
  try {
    let result = await userModel.updateOne(
      { email: data.email },
      { $set: { otp: data.otp, updatedAt: new Date() } }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

async function updateNewPassword(data) {
  try {
    let result = await userModel.updateOne(
      { email: data.email },
      {
        $set: { password: data.hash, updatedAt: new Date() },
        $unset: { otp: "" },
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

async function updateNewPasswordById(data) {
  try {
    let result = await userModel.findByIdAndUpdate(
      { _id: data._id },
      { password: data.hash, updatedAt: new Date() }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  authUser: authUser,
  updateOTP: updateOTP,
  updateNewPassword: updateNewPassword,
  updateNewPasswordById: updateNewPasswordById,
};
