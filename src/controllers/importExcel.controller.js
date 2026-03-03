import xlsx from "xlsx";
import path from "path";

import {
  insertCustomer,
  findAllSuppliers,
  findAllOrdersByCustomer,
  findProductsbySeller,

} from "../models/importExcel.model.js";

export const importExcel = async (req, res) => {
  try {
    const filePath = path.resolve("src/data/data.xlsx");
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    console.log(` Filas encontradas: ${rows.length}`);

    let total = 0

    const customerCache = {};


    for (const r of rows) {
      await insertCustomer({
        name: r.customer_name,
        email: r.customer_email,
        phone: String(r.customer_phone ?? ""),
        address: r.customer_address
      });

      await findAllSuppliers();      
      
      const customer = await findCustomerByEmail(r.customer_email);
        if (customer) {

        await findAllOrdersByCustomer(customer.customer_id);
        }
        
        await findProductsbySeller(r.supplier_id);
        
      total++;
      console.log(`Encontrados:  ${total}/${rows.length}`);
    }

    res.json({
      message: "Importación completada correctamente 🚀",
      total
    });

  } catch (error) {
    console.error("El Error es:", error.message);
    res.status(500).json({ error: error.message });
  }
};