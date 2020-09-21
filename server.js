const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const upload = require("express-fileupload");
const path = require("path");
const fs = require("fs");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());
app.use(cors());
app.use(upload());
app.use(
  "/doctorCertificates",
  express.static(path.join(__dirname, "doctorCertificates"))
);

const routes = require("./routes");
app.use("/api", routes);

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// mongoDB connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

// start server
app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
