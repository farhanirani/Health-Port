const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

const routes = require("./routes");
app.use("/api", routes);

// check if its in build
// if (PORT !== 5000) {
//   app.use(express.static(join(__dirname, "client", "build")));
//   app.use("*", (req, res) => {
//     res.sendFile(join(__dirname, "client", "build", "index.html"));
//   });
// }

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
