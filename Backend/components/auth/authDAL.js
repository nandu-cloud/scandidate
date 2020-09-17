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

module.exports = {
  authUser: authUser,
};
