import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool({
  user: "riwi_cohorte_6",
  password: "Riwi2026+",
  host: "51.222.142.204",
  database: "richie_ft_tesla",
  options: '-c search_path="m4s2_ypr"',
  port: 5432
});


pool.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch((err) => console.error("❌ Error de conexión:", err.message));