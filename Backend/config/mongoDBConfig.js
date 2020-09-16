const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("./../helpers/colors");

const env = process.env.NODE_ENV;

// Mongo DB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(colors.green, `MongoDB connected to ${env} database`))
  .catch((err) =>
    console.error(colors.red, `Error connecting to ${env} Database`, err)
  );
