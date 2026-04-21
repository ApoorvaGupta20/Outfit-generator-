import express from "express";
import WardrobeItem from "../models/WardrobeItem.js";

const router = express.Router();

// ✅ Add new wardrobe item
router.post("/", async (req, res) => {
  try {
    const newItem = new WardrobeItem(req.body);
    const savedItem = await newItem.save();
    console.log("✅ Saved item:", savedItem);
    res.status(201).json(savedItem);
  } catch (err) {
    console.error("❌ Error saving item:", err);
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get all wardrobe items
router.get("/", async (req, res) => {
  try {
    const items = await WardrobeItem.find();
    res.json(items);
  } catch (err) {
    console.error("❌ Error fetching items:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
