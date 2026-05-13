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

router.post("/search-vulnerable", async (req, res) => {
  const { search } = req.body;

  try {
    const sql = `
      SELECT id, username, email, role
      FROM users
      WHERE username = '${search}'
    `;

    const [rows] = await db.query<DbUser[]>(sql);

    res.json({
      sql,
      users: rows,
      count: rows.length,
    });
  } catch (error) {
    res.status(500).json({
      error: "SQL error",
      details: error,
    });
  }
});

router.post("/search-secure", async (req, res) => {
  const { search } = req.body;

  try {
    const sql = `
      SELECT id, username, email, role
      FROM users
      WHERE username = ?
    `;

    const [rows] = await db.query<DbUser[]>(sql, [search]);

    res.json({
      sql,
      users: rows,
      count: rows.length,
    });
  } catch (error) {
    res.status(500).json({
      error: "SQL error",
      details: error,
    });
  }
});

router.get("/secure/:id", async (req, res) => {
  const loggedUser = { id: 1 };

  if (loggedUser.id !== Number(req.params.id)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const [rows] = await db.query<DbUser[]>(
    "SELECT id, username, email, role FROM users WHERE id = ?",
    [req.params.id],
  );

  res.json(rows[0] ?? null);
});

router.get("/:id", async (req, res) => {
  const loggedUser = { id: 1, username: "alice" };

  const [rows] = await db.query<DbUser[]>(
    "SELECT id, username, email, role FROM users WHERE id = ?",
    [req.params.id],
  );

  res.json({
    loggedAs: loggedUser,
    requestedId: req.params.id,
    data: rows[0] ?? null,
  });
});

export default router;