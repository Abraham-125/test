import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.post("/usuarios", async (req, res) => {
  const { nombre } = req.body;
  try {
    await pool.query("INSERT INTO usuarios (nombre) VALUES ($1)", [nombre]);
    res.status(201).json({ message: "Usuario creado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta de prueba
app.get("/usuarios", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(10000, () => console.log("Servidor backend en puerto 10000"));
