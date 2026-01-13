const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * GET /escorts
 * Warden: get all escort requests
 */
router.get("/", (req, res) => {
    db.query(
        "SELECT * FROM escort_requests ORDER BY created_at DESC",
        (err, results) => {
            if (err) {
                console.error("❌ Fetch escorts error:", err);
                return res.status(500).json({ error: "Database error" });
            }
            res.json(results);
        }
    );
});

/**
 * GET /escorts/:student_id
 * Student: get own escort requests
 */
router.get("/student/:student_id", (req, res) => {
  db.query(
    "SELECT * FROM escort_requests WHERE student_id = ? ORDER BY created_at DESC",
    [req.params.student_id],
    (err, results) => {
      if (err) {
        console.error("❌ Fetch student escorts error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json(results);
    }
  );
});


/**
 * POST /escorts
 * Student: create escort request
 */
router.post("/", (req, res) => {
    const { student_id, student_name, reason, location, time } = req.body;

    if (!student_id || !reason || !location || !time) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = `
        INSERT INTO escort_requests
        (student_id, student_name, reason, location, time)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [student_id, student_name, reason, location, time],
        (err) => {
            if (err) {
                console.error("❌ Insert escort error:", err);
                return res.status(500).json({ error: "Database error" });
            }
            res.json({ message: "Escort request submitted" });
        }
    );
});

/**
 * PUT /escorts/:id
 * Warden: update escort status
 */
router.put("/:id", (req, res) => {
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: "Status required" });
    }

    db.query(
        "UPDATE escort_requests SET status = ?, updated_at = NOW() WHERE id = ?",
        [status, req.params.id],
        (err, result) => {
            if (err) {
                console.error("❌ Update escort error:", err);
                return res.status(500).json({ error: "Database error" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Escort request not found" });
            }

            res.json({ message: "Escort status updated" });
        }
    );
});

module.exports = router;
