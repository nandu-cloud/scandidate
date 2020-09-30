// import mongoose models
const organizationModel = require("./orgOnboardModel");

// Add Organisation
async function onboardOrganisation(data) {
  const ordDtata = new organizationModel();
  ordDtata.organizationName = data.organizationName;
  ordDtata.contactPersonName = data.contactPersonName;
  ordDtata.organisationAddress = data.organisationAddress;
  ordDtata.organisationType = data.organisationType;
  ordDtata.organisationEmail = data.organisationEmail;
  ordDtata.organisationEmployeeSize = data.organisationEmployeeSize;
  ordDtata.organisationActiveFrom = data.organisationActiveFrom;
  ordDtata.organisationZIP = data.organisationZIP;
  ordDtata.organisationDescription = data.organisationDescription;
  ordDtata.organisationLogo = data.organisationLogo;
  ordDtata.contact = data.contact;
  ordDtata.code = data.code;
  ordDtata.status = data.status;
  ordDtata.createdAt = new Date();
  ordDtata.updatedAt = new Date();
  try {
    let result = await ordDtata.save();
    return result;
  } catch (err) {
    throw err;
  }
}

// Get All Organisation
async function getAllOrganisation(data) {
  try {
    let result = await organizationModel.find({}).sort({ _id: -1 }).lean();
    return result;
  } catch (err) {
    throw err;
  }
}

// Find Organisation By Id
async function getOrganisationById(data) {
  try {
    let result = await organizationModel.findById({ _id: data._id }).lean();
    return result;
  } catch (err) {
    throw err;
  }
}

// Delete Organisation
async function deleteOrganisation(data) {
  try {
    let result = await organizationModel.deleteOne({ _id: data._id });
    return result;
  } catch (err) {
    throw err;
  }
}

async function updateOrganisation(data) {
  try {
    let result = await organizationModel.findOneAndUpdate(
      { _id: data._id },
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

// export functions
module.exports = {
  getAllOrganisation: getAllOrganisation,
  onboardOrganisation: onboardOrganisation,
  getOrganisationById: getOrganisationById,
  updateOrganisation: updateOrganisation,
  deleteOrganisation: deleteOrganisation,
};
