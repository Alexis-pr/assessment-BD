  import express from "express";



  import importRoutes from "./routes/import.routes.js";

  const app = express();

  app.use(express.json());

  // 👇 registras cada módulo manualmente

  app.use("/api/import-excel", importRoutes);

  app.listen(3000, () =>
    console.log("Servidor corriendo en puerto 3000 🚀")
  );