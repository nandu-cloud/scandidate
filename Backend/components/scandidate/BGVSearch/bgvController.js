const AppError = require("./../../../helpers/appError");
const colors = require("./../../../helpers/colors");
const bgvDAL = require("./bgvDAL.js");

module.exports.searchbgv = async (req, res, next) => {
    let data = req.body;
    console.log(data);
    try {
        let empData = await bgvDAL.searchBgvDataEmployee(data);
        console.log("Employee data: ", empData);
        if (empData.length > 0) {
            return res
                .status(200)
                .json({ status: 200, message: "Success", data: empData });
        }
        let stdData = await bgvDAL.searchBgvDataStudent(data);
        console.log("Student Data: ", stdData);
        if (stdData.length > 0) {
            return res
                .status(200)
                .json({ status: 200, message: 'Success', data: stdData });
        } else {
            return res.status(404)
                .json({ status: 404, message: 'No Such employee or student is found' });
        }

    } catch (err) {
        console.log(colors.red, `${err}`);
        return next(new AppError(err, 400));
    }
};
