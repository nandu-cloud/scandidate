const hrpartnerModel = require("./hrpartnerModel");

async function savehrparner(data) {
  const hrpartnerdata = new hrpartnerModel(data);
  try {
    let result = await hrpartnerdata.save();
    return result;
  } catch (err) {
    throw err;
  }
}

async function findAllHrPartner() {
  try {
    let result = await hrpartnerModel.find();
    return result;
  } catch (err) {
    throw err;
  }
}

async function getHrPartnerFromId(data) {
  try {
    let result = await hrpartnerModel.findById({ _id: data._id });
    return result;
  } catch (err) {
    throw err;
  }
}

async function updateHrPartner(data) {
  try {
    let result = await hrpartnerModel.findOneAndUpdate(
      { _id: data._id },
      data,
      { new: true }
    );
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  savehrparner: savehrparner,
  findAllHrPartner: findAllHrPartner,
  getHrPartnerFromId: getHrPartnerFromId,
  updateHrPartner: updateHrPartner,
};
