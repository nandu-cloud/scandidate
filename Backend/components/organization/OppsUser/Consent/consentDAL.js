const consentModel = require("./consentModel");

async function saveConsent(data) {
  const consentData = new consentModel(data);
  try {
    let result = await consentData.save();
    return result;
  } catch (err) {
    throw err;
  }
}

async function findEmployeeConsent(data) {
  try {
    let result = await consentModel.findOne({ employeeId: data._id }).lean();
    return result;
  } catch (err) {
    throw err;
  }
}

async function findSavedEmployeeConsent(data) {
  try {
    let result = await consentModel.find({
      firstName: data.firstName,
      lastName: data.lastName,
      $or: [
        { email: data.email },
        { phoneNumber: data.phoneNumber },
        { adharNumber: data.adharNumber },
      ],
    });
    return result;
  } catch (err) {
    throw err;
  }
}

async function updateConsent(data) {
  try {
    let result = await consentModel.findOneAndUpdate(
      { employeeId: data.employeeId },
      data,
      {
        new: true,
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

async function showAllConsent() {
  try {
    let result = await consentModel.find();
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  saveConsent: saveConsent,
  findEmployeeConsent: findEmployeeConsent,
  findSavedEmployeeConsent: findSavedEmployeeConsent,
  updateConsent: updateConsent,
  showAllConsent: showAllConsent,
};
