const express = require("express");
const formidableMiddleware = require("express-formidable");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
app.use(formidableMiddleware());

// IMPORT MODELS
require("./models/Car");
require("./models/Station");

//ROUTES DECLARATION
const carRoutes = require("./routes/cars");
app.use(carRoutes);
const stationRoutes = require("./routes/stations");
app.use(stationRoutes);

// CONNECT TO BDD
if (process.env.NODE_ENV === "test") {
  mongoose.connect(process.env.MONGODB_URI + "-test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  //   Tried to add a "dropDatabase" here but unsuccessful
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// START SERVER
module.exports = app.listen(process.env.PORT || 5000, () => {
  console.log("Server has started");
});
