import express from "express";
import cors from "cors";

import profileRoutes from "./routes/profileRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OK");
});

// 🔥 routes
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);
