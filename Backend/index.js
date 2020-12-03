const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/mongoDBConfig");
const colors = require("./helpers/colors");
const AppError = require("./helpers/appError");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");

const morgan = require("morgan");

const app = express();

app.use(morgan("common"));
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static(path.join(__dirname, "../Frondend-UI/dist")));

app.use("/public", express.static(path.join(__dirname, "uploads")));

// api routes
app.use("/api/auth", require("./components/auth/authRoute"));

app.use(
  "/api/scandidate/user",
  require("./components/scandidate/user/userRoute")
);
app.use(
  "/api/scandidate/organisation",
  require("./components/scandidate/organization-onboard/orgOnboardRoute")
);
app.use(
  "/api/scandidate/institute",
  require("./components/scandidate/institute-onboard/instituteOnboardRoute")
);
app.use(
  "/api/scandidate/dashboard",
  require("./components/scandidate/dashboard/dashboardRoute")
);

app.use(
  "/api/scandidate/bgvsearch",
  require("./components/scandidate/BGVSearch/bgvSearchRoute")
);

app.use(
  "/api/institute/addUser",
  require("./components/institution/Admin/AddOppsUser/oppsUserRoute")
);
app.use(
  "/api/institute/operational/student",
  require("./components/institution/OppsUser/AddStudent/studentRoute")
);
app.use(
  "/api/institute/dashboard",
  require("./components/institution/dashboard/dashboardRoute")
);

app.use(
  "/api/organisation/admin",
  require("./components/organization/Admin/addOppsUser/addUserRoute")
);
app.use(
  "/api/organisation/operational",
  require("./components/organization/OppsUser/AddEmployee/employeeRoute")
);
app.use(
  "/api/organisation/dashboard",
  require("./components/organization/Dashboard/dashboardRoute")
);

app.use("/api/country", require("./components/city/statecityroute"));

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on the server`, 404));
});

app.use(errorHandler);

const port = process.env.NODE_PORT || 2000;

const server = app.listen(port, function () {
  console.log(colors.yellow, `Server started at port : ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.error(err.name, err.message);
  console.warn(colors.blue, "Unhandled rejection!");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.error(err.name, err.message);
  console.warn(colors.cyan, "Uncaught exception, catch the errors!");
  process.exit(1);
});
