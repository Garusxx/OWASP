import express from "express";

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend działa");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Cześć z backendu TS" });
});

app.listen(PORT, () => {
  console.log(`Server działa na http://localhost:${PORT}`);
});
