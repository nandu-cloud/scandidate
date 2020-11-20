const AppError = require('../../helpers/appError');
const stateDAL = require('./statecityDAL');


module.exports.saveStateCityDistrict = async (req, res, next) => {
    try {
        let result = await stateDAL.saveAlllData(req.body);
        return result;
    } catch (err) {
        return next(new AppError(err, 400));
    }
}


module.exports.showState = async (req, res, next) => {
    try {
        let allStates = await stateDAL.showAllState();
        return res.status(200).json({
            status: 200,
            message: 'SUCCESS',
            data: allStates
        })
    } catch (err) {
        return next(new AppError(err, 400));
    }
}