import { pool } from "../config/db.js";

// ─── STUDENTS ───────────────────────────────────────────────

export const insertStudent = (name, phone, email, address = null) =>
  pool.query(
    `INSERT INTO customers 
     (customer_name, customer_phone, customer_email, customer_address, created_at)
     VALUES ($1, $2, $3, $4, NOW())
     ON CONFLICT (customer_email) DO NOTHING`,
    [name, phone, email, address]
  );

export const getStudentByEmail = (email) =>
  pool.query(
    `SELECT * FROM customers WHERE customer_email = $1`,
    [email]
  );