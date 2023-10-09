import mongoose from "mongoose";
import { MONGODB } from "./config.js";


export const connectMongoDb = async () => {
  try {
    await mongoose.connect(MONGODB);
    console.log("Conexion establecida correctamente");
  } catch (error) {
    console.log(`error al conectarse a la base de datos: ${error.message}`);
  }
};