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

router.get("/secret", async (req, res) => {
  const requestedUserId = Number(req.query.userId);

  const [rows] = await db.query<DbUser[]>(
    "SELECT id, username, email, role FROM users WHERE id = ?",
    [requestedUserId],
  );

  const user = rows[0];

  if (!user || user.role !== "admin") {
    return res.status(403).json({ error: "Admin only" });
  }

  res.json({
    message: "Admin secret exposed",
    accessedAs: user,
    secret: "INTERNAL_ADMIN_REPORT_2026",
  });
});

router.get("/secret-secure", async (req, res) => {
  const loggedUser = { id: 1 };

  const [rows] = await db.query<DbUser[]>(
    "SELECT id, username, email, role FROM users WHERE id = ?",
    [loggedUser.id],
  );

  const user = rows[0];

  if (!user || user.role !== "admin") {
    return res.status(403).json({ error: "Admin only" });
  }

  res.json({
    message: "Admin secret",
    accessedAs: user,
    secret: "INTERNAL_ADMIN_REPORT_2026",
  });
});

export default router;
