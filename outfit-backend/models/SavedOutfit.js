import mongoose from "mongoose";

const savedOutfitSchema = new mongoose.Schema(
  {
    baseItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WardrobeItem",
      required: true,
    },
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "WardrobeItem",
    }],
    stylingTip: String
  },
  { timestamps: true }
);

const SavedOutfit = mongoose.model("SavedOutfit", savedOutfitSchema);
export default SavedOutfit;
