import "dotenv/config";
import pkg from "pg";

const { Pool } = pkg;

const requiredEnv = [
  "PG_USER",
  "PG_PASSWORD",
  "PG_HOST",
  "PG_DATABASE",
  "PG_PORT",
  "PG_SCHEMA"
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Falta la variable de entorno obligatoria: ${key}`);
  }
}

export const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: Number(process.env.PG_PORT),
  options: `-c search_path="${process.env.PG_SCHEMA}"`
});

export const testDbConnection = async () => {
  await pool.query("SELECT 1");
};
