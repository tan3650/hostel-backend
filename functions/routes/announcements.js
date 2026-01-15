const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * POST /announcements
 * Warden posts announcement
 * Default status = Published (Posted)
 */
router.post("/", (req, res) => {
  const { title, content, posted_by } = req.body;

  if (!title || !content || !posted_by) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
    INSERT INTO announcements (title, content, posted_by, status)
    VALUES (?, ?, ?, 'Published')
  `;

  db.query(sql, [title, content, posted_by], (err, result) => {
    if (err) {
      console.error("❌ Announcement insert error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({
      success: true,
      message: "Announcement posted",
      id: result.insertId
    });
  });
});

/**
 * GET /announcements
 * Students + Warden → only Posted (Published)
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
      console.error("❌ Fetch announcements error:", err);
      return res.status(500).json({ error: "DB error" });
    }

    res.json(rows);
  });
});

/**
 * GET /announcements/all
 * Warden → see everything
 */
router.get("/all", (req, res) => {
  db.query(
    "SELECT * FROM announcements ORDER BY created_at DESC",
    (err, rows) => {
      if (err) {
        console.error("❌ Fetch all announcements error:", err);
        return res.status(500).json({ error: "DB error" });
      }
      res.json(rows);
    }
  );
});

/**
 * PUT /announcements/:id
 * Warden updates status
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
