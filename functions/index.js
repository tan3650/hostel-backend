import cors from "cors";
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    "https://hostel-management-fbproj.web.app",
    "http://localhost:5000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());


// routes
app.use("/complaints", require("./routes/complaints"));
app.use("/nightout", require("./routes/nightout"));
app.use("/escorts", require("./routes/escorts"));

module.exports = app;
