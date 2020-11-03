const studentModel = require("../../institution/OppsUser/AddStudent/studentModel");
const employeeModel = require("../../organization/OppsUser/AddEmployee/employeeModel");
const instituteModel = require("../../scandidate/institute-onboard/instituteOnboardModel");


async function searchBgv(data) {
    try {
        let studentSearch = await studentModel.find(data).collation({ locale: 'en', strength: 1 });
        return studentSearch;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    searchBgv: searchBgv
}