import { Router } from "express";
import { db } from "../db.js";
import type { RowDataPacket } from "mysql2";

const router = Router();

type DbUser = RowDataPacket & {
  id: number;
  username: string;
  email: string;
  role: "user" | "admin";
};

router.get("/:id", async (req, res) => {
  const loggedUser = { id: 1, username: "alice" };

  const [rows] = await db.query<DbUser[]>(
    "SELECT id, username, email, role FROM users WHERE id = ?",
    [req.params.id]
  );

  res.json({
    loggedAs: loggedUser,
    requestedId: req.params.id,
    data: rows[0] ?? null,
  });
});

router.get("/secure/:id", async (req, res) => {
  const loggedUser = { id: 1 };

  if (loggedUser.id !== Number(req.params.id)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const [rows] = await db.query<DbUser[]>(
    "SELECT id, username, email, role FROM users WHERE id = ?",
    [req.params.id]
  );

  res.json(rows[0] ?? null);
});

export default router;