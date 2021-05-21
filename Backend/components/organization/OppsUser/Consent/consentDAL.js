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
    let result = await consentModel.findOne({ employeeId: data._id });
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  saveConsent: saveConsent,
  findEmployeeConsent: findEmployeeConsent,
};
