const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * POST /announcements
 * Create announcement (warden)
 */
router.post("/", (req, res) => {
  const { title, content, posted_by, status } = req.body;

  if (!title || !content || !posted_by) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const finalStatus = ["Draft", "Published", "Archived"].includes(status)
    ? status
    : "Published";

  const sql = `
    INSERT INTO announcements (title, content, posted_by, status)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [title, content, posted_by, finalStatus], (err, result) => {
    if (err) {
      console.error("❌ Announcement insert error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({
      success: true,
      message: "Announcement created",
      id: result.insertId
    });
  });
});

/**
 * GET /announcements
 * Fetch announcements
 * ?all=true  → warden sees all
 * default    → students see only Published
 */
router.get("/", (req, res) => {
  const showAll = req.query.all === "true";

  const sql = showAll
    ? "SELECT * FROM announcements ORDER BY created_at DESC"
    : "SELECT * FROM announcements WHERE status='Published' ORDER BY created_at DESC";

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("❌ Fetch announcements error:", err);
      return res.status(500).json({ error: "DB error" });
    }

    res.json(rows);
  });
});

/**
 * PUT /announcements/:id
 * Update announcement status (warden)
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
    (err, result) => {
      if (err) {
        console.error("❌ Update announcement error:", err);
        return res.status(500).json({ error: "DB error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Announcement not found" });
      }

      res.json({ success: true, message: "Status updated" });
    }
  );
});

module.exports = router;
