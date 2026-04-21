import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import wardrobeRoutes from "./routes/wardrobe.js";
import outfitRoutes from "./routes/outfit.js";
import calenderRoutes from "./routes/calender.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Existing routes
app.use("/api/wardrobe", wardrobeRoutes);
app.use("/api/outfit", outfitRoutes);

// New Calendar OOTD routes
app.use("/api/calendar", calenderRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));
