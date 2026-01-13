const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: [
    "https://hostel-management-fbproj.web.app",
  ]
}));

app.use(express.json());

// routes
app.use("/complaints", require("./routes/complaints"));
app.use("/nightout", require("./routes/nightout"));
app.use("/escorts", require("./routes/escorts"));

module.exports = app;
