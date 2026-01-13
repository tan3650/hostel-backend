const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * POST /nightout
 * Student: create night-out request
 */
router.post("/", (req, res) => {
  const {
    student_id,
    student_name,
    from_date,
    to_date,
    reason,
    parent_contact
  } = req.body;

  if (!student_id || !from_date || !to_date || !reason) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
    INSERT INTO night_out_requests
    (student_id, student_name, from_date, to_date, reason, parent_contact)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [student_id, student_name, from_date, to_date, reason, parent_contact],
    (err) => {
      if (err) {
        console.error("❌ Nightout insert error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json({ message: "Night-out request submitted" });
    }
  );
});

/**
 * GET /nightout
 * Warden: get ALL night-out requests
 * ⚠️ MUST COME BEFORE /:student_id
 */
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM night_out_requests ORDER BY created_at DESC",
    (err, results) => {
      if (err) {
        console.error("❌ Nightout fetch all error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json(results);
    }
  );
});

/**
 * GET /nightout/:student_id
 * Student: get own night-out requests
 */
router.get("/:student_id", (req, res) => {
  db.query(
    "SELECT * FROM night_out_requests WHERE student_id = ? ORDER BY created_at DESC",
    [req.params.student_id],
    (err, results) => {
      if (err) {
        console.error("❌ Nightout fetch student error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json(results);
    }
  );
});

/**
 * PUT /nightout/:id
 * Warden: approve / reject night-out request
 */
router.put("/:id", (req, res) => {
  const { status } = req.body;
  const nightoutId = Number(req.params.id); // ✅ REQUIRED

  if (!status) {
    return res.status(400).json({ error: "Status required" });
  }

  // ✅ Match ENUM exactly
  if (!["Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  if (isNaN(nightoutId)) {
    return res.status(400).json({ error: "Invalid night-out ID" });
  }

  // ✅ updated_at now exists
  db.query(
    "UPDATE night_out_requests SET status = ?, updated_at = NOW() WHERE id = ?",
    [status, nightoutId],
    (err, result) => {
      if (err) {
        console.error("❌ Nightout update error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Night-out request not found" });
      }

      res.json({ message: "Night-out status updated" });
    }
  );
});

module.exports = router;
