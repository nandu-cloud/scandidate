const searchModel = require("./bgvSearchRateModel");

async function saveSearchResult(data) {
  const datas = new searchModel(data);
  try {
    let result = await datas.save();
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  saveSearchResult: saveSearchResult,
};
