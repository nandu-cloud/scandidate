const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("./../helpers/colors");

const env = process.env.NODE_ENV;

let mongoURI = "";

if (env.trim() === "development") {
  mongoURI = process.env.MONGODB_DEV_URI;
} else if (env.trim() === "uat") {
  mongoURI = process.env.MONGODB_UAT_URI;
} else if (env.trim() === "production") {
  mongoURI = process.env.MONGODB_PROD_URI;
}

// Mongo DB connection
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(colors.green, `MongoDB connected to ${env} database`))
  .catch((err) =>
    console.error(colors.red, `Error connecting to ${env} Database`, err)
  );
