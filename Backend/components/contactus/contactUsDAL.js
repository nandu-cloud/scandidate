const contactUsModel = require('./contactUsModel');

async function saveContactUs(data) {
    const data1 = new contactUsModel(data);
    try {
        let result = await data1.save();
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    saveContactUs: saveContactUs
}