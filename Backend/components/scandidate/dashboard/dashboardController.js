const organizationModel = require("../organization-onboard/orgOnboardModel");
const instituteModel = require("../institute-onboard/instituteOnboardModel");
const userModel = require("./../user/userModel");
const AppError = require("./../../../helpers/appError");
const colors = require("./../../../helpers/colors");

module.exports.countTotalOrgInstUsers = async function (req, res, next) {
  try {
    let totalOrganizations = await organizationModel.estimatedDocumentCount();
    let totalInstitutions = await instituteModel.estimatedDocumentCount();
    let totalUsers = await userModel.estimatedDocumentCount();
    return res.status(200).json({
      status: "SUCCESS",
      data: {
        organizationsCount: totalOrganizations,
        institutionsCount: totalInstitutions,
        usersCount: totalUsers,
      },
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

module.exports.orgOnboardTrend = async function (req, res, next) {
  const data = {
    fromDate: new Date(req.body.fromDate),
    toDate: new Date(req.body.toDate) || new Date(),
    filter: req.body.filter || "MONTH",
  };
  console.log(data);
  let mongoQuery;
  if (data.filter === "DAY") {
    mongoQuery = [
      [
        {
          $match: {
            createdAt: { $gte: data.fromDate, $lte: data.toDate },
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
        },
        {
          $group: {
            _id: { day: "$day" },
            total: { $sum: 1 },
          },
        },
        { $sort: { "_id.day": 1 } },
      ],
    ];
  } else if (data.filter === "MONTH") {
    mongoQuery = [
      [
        {
          $match: {
            createdAt: { $gte: data.fromDate, $lte: data.toDate },
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
        },
        {
          $group: {
            _id: { month: "$month" },
            total: { $sum: 1 },
          },
        },
        { $sort: { "_id.month": 1 } },
      ],
    ];
  } else if (data.filter === "YEAR") {
    mongoQuery = [
      [
        {
          $match: {
            createdAt: { $gte: data.fromDate, $lte: data.toDate },
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
        },
        {
          $group: {
            _id: { year: "$year" },
            total: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1 } },
      ],
    ];
  }

  try {
    organizationModel.aggregate(mongoQuery).then(function (docs) {
      return res.status(200).json({
        status: "SUCCESS",
        data: docs,
      });
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

module.exports.instOnboardTrend = async function (req, res, next) {
  const data = {
    fromDate: new Date(req.body.fromDate),
    toDate: new Date(req.body.toDate) || new Date(),
    filter: req.body.filter || "MONTH",
  };
  let mongoQuery;
  if (data.filter === "DAY") {
    mongoQuery = [
      [
        {
          $match: {
            createdAt: { $gte: data.fromDate, $lte: data.toDate },
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
        },
        {
          $group: {
            _id: { day: "$day" },
            total: { $sum: 1 },
          },
        },
        { $sort: { "_id.day": 1 } },
      ],
    ];
  } else if (data.filter === "MONTH") {
    mongoQuery = [
      [
        {
          $match: {
            createdAt: { $gte: data.fromDate, $lte: data.toDate },
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
        },
        {
          $group: {
            _id: { month: "$month" },
            total: { $sum: 1 },
          },
        },
        { $sort: { "_id.month": 1 } },
      ],
    ];
  } else if (data.filter === "YEAR") {
    mongoQuery = [
      [
        {
          $match: {
            createdAt: { $gte: data.fromDate, $lte: data.toDate },
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
        },
        {
          $group: {
            _id: { year: "$year" },
            total: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1 } },
      ],
    ];
  }
  try {
    instituteModel.aggregate(mongoQuery).then(function (docs) {
      return res.status(200).json({
        status: "SUCCESS",
        data: docs,
      });
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};
