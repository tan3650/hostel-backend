const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// routes
app.use("/complaints", require("./routes/complaints"));
app.use("/escorts", require("./routes/escorts"));
app.use("/nightout", require("./routes/nightout"));

// health check
app.get("/", (req, res) => {
  res.json({ status: "Backend running" });
});

// REQUIRED for Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
