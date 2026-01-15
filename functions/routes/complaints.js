const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * GET /complaints
 * Warden: get ALL complaints
 */
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM complaints ORDER BY created_at DESC",
    (err, results) => {
      if (err) {
        console.error(" Fetch complaints error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    }
  );
});

/**
 * GET /complaints/:student_id
 * Student: get own complaints
 */
router.get("/:student_id", (req, res) => {
  db.query(
    "SELECT * FROM complaints WHERE student_id = ? ORDER BY created_at DESC",
    [req.params.student_id],
    (err, results) => {
      if (err) {
        console.error(" Fetch student complaints error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    }
  );
});

/**
 * POST /complaints
 * Student: create complaint
 */
router.post("/", (req, res) => {
  const { student_id, title, description, priority } = req.body;

  if (!student_id || !title || !description || !priority) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
    INSERT INTO complaints
    (student_id, title, description, priority, status)
    VALUES (?, ?, ?, ?, 'Submitted')
  `;

  db.query(
    sql,
    [student_id, title, description, priority],
    (err) => {
      if (err) {
        console.error(" Insert complaint error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Complaint created" });
    }
  );
});

/**
 * PUT /complaints/:id
 * Warden: update complaint status
 */
router.put("/:id", (req, res) => {
  const { status } = req.body;
  const complaintId = Number(req.params.id); 

  if (!status) {
    return res.status(400).json({ error: "Status required" });
  }

  if (isNaN(complaintId)) {
    return res.status(400).json({ error: "Invalid complaint ID" });
  }

  db.query(
    "UPDATE complaints SET status = ?, updated_at = NOW() WHERE id = ?",
    [status, complaintId],
    (err) => {
      if (err) {
        console.error(" Update complaint error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Complaint updated" });
    }
  );
});

module.exports = router;
