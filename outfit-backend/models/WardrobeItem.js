// 📂 models/WardrobeItem.js

import mongoose from "mongoose";

const wardrobeItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    imageUrl: {
      type: String,
      default: "", // ✅ fallback if empty
      trim: true
    },
    type: {
      type: String,
      required: true,
      enum: ["top", "bottom", "shoes", "accessory"]
    },
    season: {
      type: String,
      default: "All-season" // ✅ fallback value
    },
    style: {
      type: String,
      default: "Casual" // ✅ fallback value
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
  },
  { timestamps: true }
);

const WardrobeItem = mongoose.model("WardrobeItem", wardrobeItemSchema);

export default WardrobeItem;

