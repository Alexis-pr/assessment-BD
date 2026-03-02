import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

export const pool = new Pool({
  user:     process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host:     process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  options:  `-c search_path="${process.env.PG_SCHEMA}"`,
  port:     process.env.PG_PORT
});

pool.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch((err) => console.error("❌ Error PostgreSQL:", err.message));  