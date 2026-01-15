const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * POST /anonymous
 * Create anonymous report
 */
router.post("/", (req, res) => {
  const { report_type, description, img } = req.body;

  if (!report_type || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
    INSERT INTO anonymous_reports (report_type, description, img)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [report_type, description, img || null], (err, result) => {
    if (err) {
      console.error("Anonymous insert error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({
      message: "Anonymous report submitted",
      id: result.insertId
    });
  });
});

/**
 * GET /anonymous
 * Warden: fetch all anonymous reports
 */
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM anonymous_reports ORDER BY created_at DESC",
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "DB error" });
      }
      res.json(rows);
    }
  );
});

/**
 * PUT /anonymous/:id
 * Update report status (warden)
 */
router.put("/:id", (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!["Submitted", "In Review", "Closed"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  db.query(
    "UPDATE anonymous_reports SET status=? WHERE id=?",
    [status, id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "DB error" });
      }
      res.json({ message: "Status updated" });
    }
  );
});

module.exports = router;
