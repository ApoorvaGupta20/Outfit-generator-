import express from "express";
import WardrobeItem from "../models/WardrobeItem.js";
import SavedOutfit from "../models/SavedOutfit.js";
import { matchRules } from "../utils/matchRules.js";

const router = express.Router();

// ✅ Suggest for a specific item ID
router.get("/suggest/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await WardrobeItem.findById(itemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const possibleColors = matchRules[item.color] || [];
    const colorFilter = possibleColors.includes("Any")
      ? {}
      : { color: { $in: possibleColors } };

    let outfit = { tops: [], bottoms: [], shoes: [], accessories: [] };

    switch (item.type) {
      case "top":
        outfit.bottoms = await WardrobeItem.find({ type: "bottom", ...colorFilter }).limit(2);
        outfit.shoes = await WardrobeItem.find({ type: "shoes", ...colorFilter }).limit(2);
        outfit.accessories = await WardrobeItem.find({ type: "accessory", ...colorFilter }).limit(2);

        if (outfit.bottoms.length === 0) {
          outfit.bottoms = await WardrobeItem.find({ type: "bottom" }).limit(2);
        }
        if (outfit.shoes.length === 0) {
          outfit.shoes = await WardrobeItem.find({ type: "shoes" }).limit(2);
        }
        if (outfit.accessories.length === 0) {
          outfit.accessories = await WardrobeItem.find({ type: "accessory" }).limit(2);
        }
        break;

      case "bottom":
        outfit.tops = await WardrobeItem.find({ type: "top", ...colorFilter }).limit(2);
        outfit.shoes = await WardrobeItem.find({ type: "shoes", ...colorFilter }).limit(2);
        outfit.accessories = await WardrobeItem.find({ type: "accessory", ...colorFilter }).limit(2);

        if (outfit.tops.length === 0) {
          outfit.tops = await WardrobeItem.find({ type: "top" }).limit(2);
        }
        if (outfit.shoes.length === 0) {
          outfit.shoes = await WardrobeItem.find({ type: "shoes" }).limit(2);
        }
        if (outfit.accessories.length === 0) {
          outfit.accessories = await WardrobeItem.find({ type: "accessory" }).limit(2);
        }
        break;

      case "shoes":
        outfit.tops = await WardrobeItem.find({ type: "top", ...colorFilter }).limit(2);
        outfit.bottoms = await WardrobeItem.find({ type: "bottom", ...colorFilter }).limit(2);
        outfit.accessories = await WardrobeItem.find({ type: "accessory", ...colorFilter }).limit(2);

        if (outfit.tops.length === 0) {
          outfit.tops = await WardrobeItem.find({ type: "top" }).limit(2);
        }
        if (outfit.bottoms.length === 0) {
          outfit.bottoms = await WardrobeItem.find({ type: "bottom" }).limit(2);
        }
        if (outfit.accessories.length === 0) {
          outfit.accessories = await WardrobeItem.find({ type: "accessory" }).limit(2);
        }
        break;

      case "accessory":
        outfit.tops = await WardrobeItem.find({ type: "top", ...colorFilter }).limit(2);
        outfit.bottoms = await WardrobeItem.find({ type: "bottom", ...colorFilter }).limit(2);
        outfit.shoes = await WardrobeItem.find({ type: "shoes", ...colorFilter }).limit(2);

        if (outfit.tops.length === 0) {
          outfit.tops = await WardrobeItem.find({ type: "top" }).limit(2);
        }
        if (outfit.bottoms.length === 0) {
          outfit.bottoms = await WardrobeItem.find({ type: "bottom" }).limit(2);
        }
        if (outfit.shoes.length === 0) {
          outfit.shoes = await WardrobeItem.find({ type: "shoes" }).limit(2);
        }
        break;
    }

    const stylingTips = [
      "Add a statement piece for a bold vibe!",
      "Layer wisely for a chic look!",
      "Balance colors to keep it classy.",
      "Use minimal accessories for an elegant touch.",
      "Mix textures for an interesting outfit!"
    ];
    const stylingTip = stylingTips[Math.floor(Math.random() * stylingTips.length)];

    res.json({ item, outfit, stylingTip });

  } catch (err) {
    console.error("❌ Error in suggest/:id:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Suggest a random outfit
router.get("/suggest", async (req, res) => {
  try {
    const items = await WardrobeItem.find();
    if (!items.length) {
      return res.status(404).json({ error: "No wardrobe items found" });
    }

    const item = items[Math.floor(Math.random() * items.length)];
    const possibleColors = matchRules[item.color] || [];
    const colorFilter = possibleColors.includes("Any")
      ? {}
      : { color: { $in: possibleColors } };

    let outfit = { tops: [], bottoms: [], shoes: [], accessories: [] };

    switch (item.type) {
      case "top":
        outfit.bottoms = await WardrobeItem.find({ type: "bottom", ...colorFilter }).limit(2);
        outfit.shoes = await WardrobeItem.find({ type: "shoes", ...colorFilter }).limit(2);
        outfit.accessories = await WardrobeItem.find({ type: "accessory", ...colorFilter }).limit(2);

        if (outfit.bottoms.length === 0) {
          outfit.bottoms = await WardrobeItem.find({ type: "bottom" }).limit(2);
        }
        if (outfit.shoes.length === 0) {
          outfit.shoes = await WardrobeItem.find({ type: "shoes" }).limit(2);
        }
        if (outfit.accessories.length === 0) {
          outfit.accessories = await WardrobeItem.find({ type: "accessory" }).limit(2);
        }
        break;

      case "bottom":
        outfit.tops = await WardrobeItem.find({ type: "top", ...colorFilter }).limit(2);
        outfit.shoes = await WardrobeItem.find({ type: "shoes", ...colorFilter }).limit(2);
        outfit.accessories = await WardrobeItem.find({ type: "accessory", ...colorFilter }).limit(2);

        if (outfit.tops.length === 0) {
          outfit.tops = await WardrobeItem.find({ type: "top" }).limit(2);
        }
        if (outfit.shoes.length === 0) {
          outfit.shoes = await WardrobeItem.find({ type: "shoes" }).limit(2);
        }
        if (outfit.accessories.length === 0) {
          outfit.accessories = await WardrobeItem.find({ type: "accessory" }).limit(2);
        }
        break;

      case "shoes":
        outfit.tops = await WardrobeItem.find({ type: "top", ...colorFilter }).limit(2);
        outfit.bottoms = await WardrobeItem.find({ type: "bottom", ...colorFilter }).limit(2);
        outfit.accessories = await WardrobeItem.find({ type: "accessory", ...colorFilter }).limit(2);

        if (outfit.tops.length === 0) {
          outfit.tops = await WardrobeItem.find({ type: "top" }).limit(2);
        }
        if (outfit.bottoms.length === 0) {
          outfit.bottoms = await WardrobeItem.find({ type: "bottom" }).limit(2);
        }
        if (outfit.accessories.length === 0) {
          outfit.accessories = await WardrobeItem.find({ type: "accessory" }).limit(2);
        }
        break;

      case "accessory":
        outfit.tops = await WardrobeItem.find({ type: "top", ...colorFilter }).limit(2);
        outfit.bottoms = await WardrobeItem.find({ type: "bottom", ...colorFilter }).limit(2);
        outfit.shoes = await WardrobeItem.find({ type: "shoes", ...colorFilter }).limit(2);

        if (outfit.tops.length === 0) {
          outfit.tops = await WardrobeItem.find({ type: "top" }).limit(2);
        }
        if (outfit.bottoms.length === 0) {
          outfit.bottoms = await WardrobeItem.find({ type: "bottom" }).limit(2);
        }
        if (outfit.shoes.length === 0) {
          outfit.shoes = await WardrobeItem.find({ type: "shoes" }).limit(2);
        }
        break;
    }

    const stylingTips = [
      "Add a statement piece for a bold vibe!",
      "Layer wisely for a chic look!",
      "Balance colors to keep it classy.",
      "Use minimal accessories for an elegant touch.",
      "Mix textures for an interesting outfit!"
    ];
    const stylingTip = stylingTips[Math.floor(Math.random() * stylingTips.length)];

    res.json({ item, outfit, stylingTip });

  } catch (err) {
    console.error("❌ Error in suggest:", err);
    res.status(500).json({ error: err.message });
  }
});
// ✅ Save an outfit
router.post("/save", async (req, res) => {
  try {
    console.log("📩 Save request body:", req.body);

    let { baseItem, items, stylingTip } = req.body;

    // if baseItem is an object, grab its _id
    if (typeof baseItem === "object" && baseItem._id) {
      baseItem = baseItem._id;
    }

    // same for items array
    if (Array.isArray(items)) {
      items = items.map(i => (typeof i === "object" && i._id ? i._id : i));
    } else {
      items = [];
    }

    if (!baseItem) {
      return res.status(400).json({ error: "Base item is required" });
    }

    const savedOutfit = new SavedOutfit({
      baseItem,
      items,
      stylingTip: stylingTip || "",
    });

    const saved = await savedOutfit.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error saving outfit:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;