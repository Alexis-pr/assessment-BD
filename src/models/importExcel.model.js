import { pool } from "../config/db.js";

export const insertCustomer = ({ name, phone, email, address }) =>
  pool.query(
    `INSERT INTO customers (customer_name, customer_phone, customer_email, customer_address, created_at)
     VALUES ($1, $2, $3, $4, NOW())
     ON CONFLICT (customer_email) DO NOTHING`,
    [name, phone, email, address]
  );
