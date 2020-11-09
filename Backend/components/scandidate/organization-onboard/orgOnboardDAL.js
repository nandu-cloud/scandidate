// import mongoose models
const organizationModel = require("./orgOnboardModel");

// Add Organisation
async function onboardOrganisation(data) {
  const orgDtata = new organizationModel();
  orgDtata.organizationName = data.organizationName;
  orgDtata.contactPersonName = data.contactPersonName;
  orgDtata.organisationAddress = data.organisationAddress;
  orgDtata.organisationType = data.organisationType;
  orgDtata.organisationEmail = data.organisationEmail;
  orgDtata.organisationEmployeeSize = data.organisationEmployeeSize;
  orgDtata.organisationActiveFrom = data.organisationActiveFrom;
  orgDtata.organisationZIP = data.organisationZIP;
  orgDtata.organisationDescription = data.organisationDescription;
  orgDtata.organisationLogo = data.organisationLogo;
  orgDtata.contact = data.contact;
  orgDtata.code = data.code;
  orgDtata.status = data.status;
  orgDtata.createdAt = new Date();
  orgDtata.updatedAt = new Date();
  orgDtata.legalEntityName = data.legalEntityName;
  orgDtata.organizationLocation = data.organizationLocation;
  orgDtata.state = data.state;
  orgDtata.headQuaterLocation = data.headQuaterLocation;
  orgDtata.organizationGstn = data.organizationGstn;
  orgDtata.organizationCin = data.organizationCin;

  try {
    let result = await orgDtata.save();
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

// Find Organisation By Id New
async function getOrganisationByIdNew(data) {
  try {
    let result = await organizationModel.findById({ _id: data }).lean();
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
  getOrganisationByIdNew: getOrganisationByIdNew,
};
