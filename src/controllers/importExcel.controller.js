import xlsx from "xlsx";
import path from "path";

import {
  insertStudent,
  getStudentByEmail
} from "../models/importExcel.model.js";

export const importExcel = async (req, res) => {
  try {
    const filePath = path.resolve("src/data/data.xlsx");
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    console.log(`📊 Filas encontradas: ${rows.length}`);

    let total = 0;

    for (const r of rows) {
      const name  = r.estudiante;
      const email = r.email;
      const phone = r.telefono;

      await insertStudent(name, phone, email);
      await getStudentByEmail(email);

      total++;
      console.log(`✅ ${total}/${rows.length}`);
    }

    res.json({
      message: "Importación completada correctamente 🚀",
      total
    });

  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};