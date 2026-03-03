import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/sql_excel_logs");
    console.log(" Conectado a MongoDB");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error.message);
  }
};

export default connectMongoDB;