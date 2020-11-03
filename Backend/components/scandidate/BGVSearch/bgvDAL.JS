const studentModel = require("../../institution/OppsUser/AddStudent/studentModel");
const employeeModel = require("../../organization/OppsUser/AddEmployee/employeeModel");
const instituteModel = require("../institute-onboard/instituteOnboardModel");
const organizationModel = require("../organization-onboard/orgOnboardModel");


async function searchBgvDataEmployee(data) {
    try {
        let employeeSearch = await employeeModel.find(data).collation({ locale: 'en', strength: 1 });
        return employeeSearch;
    } catch (err) {
        throw err;
    }
}

async function searchBgvDataStudent(data) {
    try {
        let studentSearch = await studentModel.find(data).collation({ locale: 'en', strength: 1 });
        return studentSearch;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    searchBgvDataEmployee: searchBgvDataEmployee,
    searchBgvDataStudent: searchBgvDataStudent
};