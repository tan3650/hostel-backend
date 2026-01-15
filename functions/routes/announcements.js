const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * POST /announcements
 * Create announcement (warden)
 */
router.post("/", (req, res) => {
  const { title, content, posted_by } = req.body;

  const sql = `
    INSERT INTO announcements (title, content, posted_by, status)
    VALUES (?, ?, ?, 'Published')
  `;

  db.query(sql, [title, content, posted_by], (err, result) => {
    if (err) {
      console.error("Announcement insert error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({
      success: true,
      id: result.insertId
    });
  });
});

/**
 * GET /announcements
 * Fetch all announcements
 */
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM announcements ORDER BY created_at DESC",
    (err, rows) => {
      if (err) {
        console.error("Fetch announcements error:", err);
        return res.status(500).json({ error: "DB error" });
      }
      res.json(rows);
    }
  );
});

module.exports = router;
