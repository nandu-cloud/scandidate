// import mongoose models
const employeeModel = require("./employeeModel");

// Add Employee
async function addEmployee(data) {
    const employeeData = new employeeModel();
    employeeData.firstName = data.firstName;
    employeeData.lastName = data.lastName;
    employeeData.employeeId = data.employeeId;
    employeeData.email = data.email;
    employeeData.role = data.role;
    employeeData.department = data.department;
    employeeData.address = data.address;
    employeeData.dateOfBirth = data.dateOfBirth;
    employeeData.phoneNumber = data.phoneNumber;
    employeeData.adharNumber = data.adharNumber;
    employeeData.panNumber = data.panNumber;
    employeeData.dateOfJoining = data.dateOfJoining;
    employeeData.exitDate = data.exitDate;
    employeeData.professionalExperience = data.professionalExperience;
    employeeData.selfDriven = data.selfDriven;
    employeeData.creativity = data.creativity;
    employeeData.informalOrganizationSenseOfBelonging = data.informalOrganizationSenseOfBelonging;
    employeeData.initiative = data.initiative;
    employeeData.workIndependenty = data.workIndependenty;
    employeeData.teamWork = data.teamWork;
    employeeData.dealConstructivelyWithPressure = data.dealConstructivelyWithPressure;
    employeeData.volume = data.volume;
    employeeData.quality = data.quality;
    employeeData.consistency = data.consistency;
    employeeData.punctuality = data.punctuality;
    employeeData.discipline = data.discipline;
    employeeData.academicKnowledge = data.academicKnowledge;
    employeeData.productKnowledge = data.productKnowledge;
    employeeData.industryKnowledge = data.industryKnowledge;
    employeeData.communicationSkills = data.communicationSkills;
    employeeData.addedById = data.addedById;
    employeeData.organisationId = data.organisationId;

    employeeData.createdAt = new Date();
    employeeData.updatedAt = new Date();

    try {
        let result = await employeeData.save();
        return result;
    } catch (err) {
        throw err;
    }
}

//Get All
async function getAllUsers(data) {
    try {
      let result = await employeeModel.find({}).sort({ _id: -1 }).lean();
      return result;
    } catch (err) {
      throw err;
    }
  }

  // Find By Id
async function getEmplyeeById(data) {
    try {
      let result = await employeeModel.findById({ _id: data._id }).lean();
      return result;
    } catch (err) {
      throw err;
    }
  }

  // Update Employee Details
async function updateEmployee(data) {
    try {
      let result = await employeeModel.findOneAndUpdate(
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
    addEmployee: addEmployee,
    getAllUsers:getAllUsers,
    getEmplyeeById:getEmplyeeById,
    updateEmployee:updateEmployee
};