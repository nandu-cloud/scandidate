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



async function showAllState(userInput, id) {
    try {
        let { stateName, city } = await stateModelDemo.findById({ _id: id }).lean();
        var index = stateName.indexOf(userInput);
        return city[index];
    } catch (err) {
        throw err;
    }
}



module.exports = {
    showAllState: showAllState,
    saveAlllData: saveAlllData
}