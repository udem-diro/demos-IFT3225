import "dotenv/config";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { USERS, LIGNES } from "./data/index.js";
import { requireAuth } from "./middlewares/auth.js"


const app = express();
app.use(cors());
app.use(express.json());

const SECRET = process.env.JWT_SECRET || "dev-secret-a-changer";
const PORT = process.env.PORT || 4000;


// POST /auth/login : vérifie les identifiants et renvoie un jeton + l'utilisateur public.
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body ?? {};
  const compte = USERS.find((u) => u.username === username && u.password === password);

  if (!compte) {
    return res.status(401).json({
      error: { code: "INVALID_CREDENTIALS", message: "Identifiants invalides." }
    });
  }

  const user = { id: compte.id, name: compte.name, role: compte.role };
  const token = jwt.sign(user, SECRET, { expiresIn: "2h" });
  res.json({ token, user });
});

// GET /auth/me : renvoie l'utilisateur derrière le jeton
app.get("/auth/me", requireAuth, (req, res) => {
  const { id, name, role } = req.auth;
  res.json({ user: { id, name, role } });
});

// GET /lignes 
app.get("/lignes", (req, res) => {
  res.json(LIGNES)
});

// GET /
app.get("/", (req, res) => {
  res.json({ message: "Bus en Vue API est en marche :)" });
});

app.listen(PORT, () => console.log(`Backend sur http://localhost:${PORT}`));