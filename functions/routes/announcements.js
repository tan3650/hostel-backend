const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * POST /announcements
 * Warden: Create announcement
 */
router.post("/", (req, res) => {
  const { title, content, posted_by } = req.body;

  if (!title || !content || !posted_by) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
    INSERT INTO announcements (title, content, posted_by)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [title, content, posted_by], (err, result) => {
    if (err) {
      console.error("Announcement insert error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({
      message: "Announcement created",
      id: result.insertId
    });
  });
});

/**
 * GET /announcements
 * Student + Warden: Fetch all published announcements
 */
router.get("/", (req, res) => {
  const sql = `
    SELECT *
    FROM announcements
    WHERE status = 'Published'
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Fetch announcements error:", err);
      return res.status(500).json({ error: "DB error" });
    }

    res.json(rows);
  });
});

/**
 * PUT /announcements/:id
 * Warden: Update announcement status
 */
router.put("/:id", (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!["Draft", "Published", "Archived"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  db.query(
    "UPDATE announcements SET status=? WHERE id=?",
    [status, id],
    (err) => {
      if (err) {
        console.error("Announcement update error:", err);
        return res.status(500).json({ error: "DB error" });
      }

      res.json({ message: "Status updated" });
    }
  );
});

module.exports = router;
