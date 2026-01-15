const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: ["https://hostel-management-fbproj.web.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/complaints", require("./routes/complaints"));
app.use("/escorts", require("./routes/escorts"));
app.use("/nightout", require("./routes/nightout"));
app.use("/anonymous", require("./routes/anonymous"));
app.use("/announcements", require("./routes/announcements"));

// health check
app.get("/", (req, res) => {
  res.json({ status: "Backend running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ Server running on port", PORT);
});
