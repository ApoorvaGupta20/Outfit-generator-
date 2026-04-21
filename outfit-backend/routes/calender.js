// outfit-backend/routes/calender.js

import express from "express";
import CalendarEntry from "../models/CalendarEntry.js";

const router = express.Router();

/**
 * Helper to normalize Mongo Date -> "YYYY-MM-DD"
 */
const normalizeDate = (entry) => {
  if (!entry) return entry;
  const obj = entry.toObject ? entry.toObject() : entry; // handle mongoose doc or plain obj
  return {
    ...obj,
    date: obj.date instanceof Date ? obj.date.toISOString().slice(0, 10) : obj.date,
  };
};

/**
 * GET /api/calendar
 * - returns all calendar entries
 * - optionally filter ?date=YYYY-MM-DD
 */
router.get("/", async (req, res) => {
  try {
    const { date } = req.query;

    let filter = {};
    if (date) {
      const d = new Date(date);
      const next = new Date(d);
      next.setDate(next.getDate() + 1);
      filter.date = { $gte: d, $lt: next };
    }

    const entries = await CalendarEntry.find(filter)
      .populate("baseItem items")
      .lean();

    const normalized = entries.map(e => normalizeDate(e));
    res.json(normalized);
  } catch (err) {
    console.error("Error fetching calendar entries:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/calendar/:id
 * - get one entry by id
 */
router.get("/:id", async (req, res) => {
  try {
    const entry = await CalendarEntry.findById(req.params.id)
      .populate("baseItem items");
    if (!entry) return res.status(404).json({ error: "Not found" });
    res.json(normalizeDate(entry));
  } catch (err) {
    console.error("Error fetching entry:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/calendar
 * Body: { date: "2025-08-15", baseItem: "<id>", items: ["<id>", ...], stylingTip: "..." }
 */
router.post("/", async (req, res) => {
  try {
    const { date, baseItem, items = [], stylingTip, notes, userId } = req.body;

    if (!date) return res.status(400).json({ error: "date is required" });
    if (!baseItem) return res.status(400).json({ error: "baseItem is required" });

    const entry = new CalendarEntry({
      date: new Date(date),
      baseItem,
      items,
      stylingTip,
      notes,
      userId: userId || null,
    });

    const saved = await entry.save();
    const populated = await CalendarEntry.findById(saved._id).populate("baseItem items");
    res.status(201).json(normalizeDate(populated));
  } catch (err) {
    console.error("Error saving calendar entry:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /api/calendar/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    await CalendarEntry.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting calendar entry:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
