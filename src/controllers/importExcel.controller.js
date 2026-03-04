import xlsx from "xlsx";
import path from "path";

import {
  insertCategories,
  insertCustomer,
  insertSuplier,
 

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
    const supplierCache = {};
    const categoriesCache = {}


    for (const r of rows) {

      if(!r.customer_email){
        console.log("Fila omitida sin email");
        continue;
      } 
      //console.log(rows[0])
      //  Usando tu cache como en tu código original

      if (customerCache[r.customer_email]) {
        console.log(`Cliente ${r.customer_email} ya procesado, saltando`);
        continue;
      }
      customerCache[r.customer_email] = true;

      await insertCustomer({
        name: r.customer_name ?? "",
        email: r.customer_email,
        phone: String(r.customer_phone ?? ""),
        address: r.customer_address ?? ""
        
      });
      //--------------------------------------------------------------------
      /* cache para el supplier */
      if(!r.supplier_email){
        console.log("Fila omitida sin email");
        continue;
      }
       // se gaurda los datos en el cache y continua
        if(supplierCache[r.supplier_email]){
          console.log(`Cliente ${r.supplier_email} ya procesado, saltando`);
          continue;
        }
        supplierCache[r.supplier_email] = true;

      await insertSuplier({
        name : r.supplier_name ?? "",
        email: r.supplier_email
      })
     //-------------------------------------------------------------------
      if(!r.product_category){
        console.log("fila omitida sin categoria");
        continue;
      }

      if(categoriesCache[r.product_category]){
        console.log(`Cliente ${r.product_category} ya procesado, saltando`);
          continue;
      }
      categoriesCache[r.product_category] = true;

     await insertCategories({
      product: r.product_category
     })
        
     /*  await findAllSuppliers();      
      
      const customer = await findCustomerByEmail(r.customer_email);
        if (customer) {

        await findAllOrdersByCustomer(customer.id);
        }
        
        await findProductsbySeller(r.supplier.id); */
        
      total++;
      console.log(`Encontrados:  ${total}/${rows.length}`);
    }

    res.json({
      message: "Importación completada correctamente 🚀",
      total
    });
    //----------------------------------------------------------------
    








  } catch (error) {
    console.error("El Error es:", error.message);
    res.status(500).json({ error: error.message });
  }
};