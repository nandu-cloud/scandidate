// import mongoose models
const organizationModel = require("./orgOnboardModel");

// Add Organisation
async function onboardOrganisation(data) {
  const orgDtata = new organizationModel(data);

  orgDtata.createdAt = new Date();
  orgDtata.updatedAt = new Date();

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

async function findOrganisation(data) {
  try {
    let result = await organizationModel.findOne(data).lean();
    return result;
  } catch (err) {
    throw err;
  }
}

async function findAllOrganization() {
  try {
    let result = await organizationModel.find().select("organizationName _id");
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
  findOrganisation: findOrganisation,
  findAllOrganization: findAllOrganization,
};
