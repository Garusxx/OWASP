import express from "express";
import cors from "cors";
import { db } from "./db.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Backend działa 🚀" });
});

app.get("/api/db-test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json({ connected: true, rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ connected: false, error: "MySQL connection failed" });
  }
});