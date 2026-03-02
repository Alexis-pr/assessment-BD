import { pool } from "../config/db.js";

// ─── STUDENTS ───────────────────────────────────────────────
export const insertStudent = (customer_name, customer_phone, customer_email,customer_address ) =>
  pool.query(
    `INSERT INTO customers (customer_name, customer_phone, customer_email, customer_address, created_at)
     VALUES ($1, $2, $3,$4 ,NOW())
     ON CONFLICT (email) DO NOTHING`,
    [customer_name, customer_phone, customer_email,customer_address]
  );

  
/* export const getStudentByEmail = (email) =>
  pool.query("SELECT * FROM students WHERE email = $1", [email]);

// ─── TEACHERS ───────────────────────────────────────────────
export const insertTeacher = async (name) => {
  const existing = await pool.query(
    "SELECT * FROM teachers WHERE name = $1", [name]
  );
  if (existing.rows.length > 0) return existing;
  return pool.query(
    "INSERT INTO teachers (name) VALUES ($1) RETURNING *", [name]
  );
};

export const getTeacherByName = (name) =>
  pool.query("SELECT * FROM teachers WHERE name = $1", [name]);

// ─── CATEGORIES ─────────────────────────────────────────────
export const insertCategory = async (name) => {
  const existing = await pool.query(
    "SELECT * FROM categories WHERE name = $1", [name]
  );
  if (existing.rows.length > 0) return existing;
  return pool.query(
    "INSERT INTO categories (name) VALUES ($1) RETURNING *", [name]
  );
};

export const getCategoryByName = (name) =>
  pool.query("SELECT * FROM categories WHERE name = $1", [name]);

// ─── COURSES ────────────────────────────────────────────────
export const insertCourse = async (name, price, idTeacher, idCategory) => {
  const existing = await pool.query(
    "SELECT * FROM courses WHERE name = $1", [name]
  );
  if (existing.rows.length > 0) return existing;
  return pool.query(
    `INSERT INTO courses (name, price, id_teacher, id_category, created_at)
     VALUES ($1, $2, $3, $4, NOW())
     RETURNING *`,
    [name, price, idTeacher, idCategory]
  );
};

export const getCourseByName = (name) =>
  pool.query("SELECT * FROM courses WHERE name = $1", [name]);

// ─── SEDES ──────────────────────────────────────────────────
export const insertSede = async (name) => {
  const existing = await pool.query(
    "SELECT * FROM sedes WHERE name = $1", [name]
  );
  if (existing.rows.length > 0) return existing;
  return pool.query(
    "INSERT INTO sedes (name) VALUES ($1) RETURNING *", [name]
  );
};

export const getSedeByName = (name) =>
  pool.query("SELECT * FROM sedes WHERE name = $1", [name]);

// ─── INSCRIPTIONS ───────────────────────────────────────────
export const insertInscription = (idStudent, idCourse, idSede, fecha, nota) =>
  pool.query(
    `INSERT INTO inscriptions (id_student, id_course, id_sede, fecha, nota, created_at)
     VALUES ($1, $2, $3, $4, $5, NOW())`,
    [idStudent, idCourse, idSede, fecha, nota]
  ); */