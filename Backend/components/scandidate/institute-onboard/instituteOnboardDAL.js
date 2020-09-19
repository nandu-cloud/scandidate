// import mongoose models
const instituteModel = require("./instituteOnboardModel");


//Get All Institute
async function getAllInstitute(data) {
  try {
    let result = await instituteModel.find({}).sort({ _id: -1 }).lean();
    return result;
  } catch (err) {
    throw err;
  }
}

//Add Institute
async function onboardInstitute(data) {
  const instituteData = new instituteModel();
  instituteData.instituteName = data.instituteName;
  instituteData.contactPersonName = data.contactPersonName;
  instituteData.instituteAddress = data.instituteAddress;
  instituteData.instituteType = data.instituteType;
  instituteData.instituteEmail = data.instituteEmail;
  instituteData.instituteStudentSize = data.instituteStudentSize;
  instituteData.instituteActiveFrom = data.instituteActiveFrom;
  instituteData.instituteZIP = data.instituteZIP;
  instituteData.instituteDescription = data.instituteDescription;
  instituteData.avatarLink = data.avatarLink;
  try {
    let result = await instituteData.save();
    return result;
  } catch (err) {
    throw err;
  }
}

//Find Institute By Id
async function getInstituteById(data) {
  try {
    let result = await instituteModel.findById({ _id: data._id }).lean();
    return result;
  } catch (err) {
    throw err;
  }
}

//Delete Institute
async function deleteInstitute(data) {
  try {
    let result = await instituteModel.deleteOne({ _id: data._id });
    return result;
  } catch (err) {
    throw err;
  }
}


//Update
async function updateInstitute(data) {
  try {
    let result = await instituteModel.findOneAndUpdate({ _id: data._id }, data, {
      new: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
}
// export functions 
module.exports = {
  getAllInstitute: getAllInstitute,
  onboardInstitute:onboardInstitute,
  getInstituteById:getInstituteById,
  deleteInstitute:deleteInstitute,
  updateInstitute:updateInstitute
};

