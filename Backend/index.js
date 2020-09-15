const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/mongoDBConfig");
const colors = require("./helpers/colors");

const app = express();
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

const port = process.env.NODE_PORT || 2000;

app.listen(port, function () {
  console.log(colors.yellow, `Server started at port : ${port}`);
});
