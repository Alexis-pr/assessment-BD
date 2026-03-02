import express from "express";
import { testDbConnection } from "./config/db.js";
import importRoutes from "./routes/import.routes.js";

const app = express();
const port = Number(process.env.PORT || process.env.Port || 3000);

// middlewares
app.use(express.json());

// routes
app.use("/api/import-excel", importRoutes);

// server
const start = async () => {
  try {
    await testDbConnection();
    console.log("✅ Conectado a PostgreSQL");
  } catch (err) {
    console.error("❌ Error de conexión a PostgreSQL:", err.message);
  }

  app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en puerto ${port}`);
  });
};

start();
