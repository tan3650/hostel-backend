const express = require("express");
const cors = require("cors");
require("./db"); // initializes DB connection

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/complaints", require("./routes/complaints"));
app.use("/nightout", require("./routes/nightout"));
app.use("/escorts", require("./routes/escorts"));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// IMPORTANT: Railway provides PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
