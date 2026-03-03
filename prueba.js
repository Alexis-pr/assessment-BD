import xlsx from "xlsx";
import path from "path";

import {
  insertStudent,
  getStudentByEmail,
  insertTeacher,
  getTeacherByName,
  insertCategory,
  getCategoryByName,
  insertCourse,
  getCourseByName,
  insertSede,
  getSedeByName,
  insertInscription
} from "../models/importExcel.model.js";

export const importExcel = async (req, res) => {
  try {
    const filePath = path.resolve("src/data/data.xlsx");
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    console.log(` Filas encontradas: ${rows.length}`);

    // Cache en memoria para no repetir queries a la BD
    const teacherCache  = {};
    const categoryCache = {};
    const courseCache   = {};
    const sedeCache     = {};

    let total = 0;

    for (const r of rows) {
      const name         = r.estudiante;
      const email        = r.email;
      const phone        = r.telefono;
      const teacherName  = r.profesor;
      const categoryName = r.categoria_curso;
      const courseName   = r.curso;
      const price        = r.precio;
      const sedeName     = r.sede;
      const fecha        = r.fecha_inscripcion;
      const nota         = r.nota;

      // STUDENT — siempre único por email
      await insertStudent(name, email, phone);
      const student = await getStudentByEmail(email);

      // TEACHER — usa caché
      if (!teacherCache[teacherName]) {
        await insertTeacher(teacherName);
        const t = await getTeacherByName(teacherName);
        teacherCache[teacherName] = t.rows[0];
      }
      const teacher = teacherCache[teacherName];

      // CATEGORY — usa caché
      if (!categoryCache[categoryName]) {
        await insertCategory(categoryName);
        const c = await getCategoryByName(categoryName);
        categoryCache[categoryName] = c.rows[0];
      }
      const category = categoryCache[categoryName];

      // COURSE — usa caché
      if (!courseCache[courseName]) {
        await insertCourse(courseName, price, teacher.id, category.id);
        const c = await getCourseByName(courseName);
        courseCache[courseName] = c.rows[0];
      }
      const course = courseCache[courseName];

      // SEDE — usa caché
      if (!sedeCache[sedeName]) {
        await insertSede(sedeName);
        const s = await getSedeByName(sedeName);
        sedeCache[sedeName] = s.rows[0];
      }
      const sede = sedeCache[sedeName];

      // INSCRIPTION — siempre nueva
      await insertInscription(
        student.rows[0].id,
        course.id,
        sede.id,
        fecha,
        nota
      );

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