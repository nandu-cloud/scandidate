const stateModelDemo = require('./stateModel');


async function saveAlllData(data) {
    const stateData = new stateModelDemo(data);
    try {
        let result = stateData.save(data);
        return result;
    } catch (err) {
        throw err;
    }
}



async function showAllState() {
    try {
        let result = await stateModelDemo.find().lean();
        return result;
    } catch (err) {
        throw err;
    }
}



module.exports = {
    showAllState: showAllState,
    saveAlllData: saveAlllData
}