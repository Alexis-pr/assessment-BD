import { pool } from "../config/db.js";

export const insertCustomer = ({ name, phone, email, address }) =>
  pool.query(
    `INSERT INTO customers (customer_name, customer_phone, customer_email, customer_address, created_at)
     VALUES ($1, $2, $3, $4, NOW())
     ON CONFLICT (customer_email) DO NOTHING`,
    [name, phone, email, address]
  );

  export const insertSuplier = ({name,email}) =>
    pool.query(`
        insert into supplier(supplier_name, supplier_email, created_at)
        values ($1,$2,now())
        on conflict (supplier_email) do nothing`,
        [name,email]
    )
  
  export const insertCategories = ({product}) => 
    pool.query(`
      insert into categories(product_category,created_at)
      values($1,now())
      on conflict (product_category) do nothing`,
      [product]
    )
  

  expo












  export const findCustomerByEmail = (email) =>
  pool.query(
    `SELECT * FROM customers WHERE customer_email =   $1`,
    [email]
  ).then(res => res.rows[0]);



export const findAllSuppliers = () =>
  pool.query(
    `SELECT * FROM suppliers ORDER BY supplier_name ASC`
  ).then(res => res.rows);


  export const findAllOrdersByCustomer = (customerId) =>
  pool.query(
    `SELECT o.order_id, o.order_date, s.supplier_name, o.total_amount
     FROM orders o
     JOIN suppliers s ON o.supplier_id = s.supplier_id
     WHERE o.customer_id = $1
     ORDER BY o.order_date DESC`,
    [customerId]
  ).then(res => res.rows);    

export const findProductsbySeller = (supplierId) =>
  pool.query(
    `SELECT p.product_id, p.product_name, p.price
     FROM products p
     WHERE p.supplier_id = $1
     ORDER BY p.product_name ASC`,
    [supplierId]
  ).then(res => res.rows);    
  
