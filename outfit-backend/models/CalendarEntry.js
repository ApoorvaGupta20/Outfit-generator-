import mongoose from "mongoose";

const calendarEntrySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    baseItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WardrobeItem",
      required: true, // since frontend enforces "choose a base item"
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WardrobeItem",
      },
    ],
    stylingTip: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const CalendarEntry = mongoose.model("CalendarEntry", calendarEntrySchema);

export default CalendarEntry;
