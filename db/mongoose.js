import mongoose from "mongoose";
import { DB_MONGODB } from "../config/config.js";

export const conectarDB = async () => {
  try {
    await mongoose.connect(DB_MONGODB);
    console.log("Conectado a mongoDB");
    console.log("Base de datos actual: ", mongoose.connection.db.databaseName);
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("colecciones disponibles: ", collections.map(c => c.name));
  } catch (e) {
    console.error("Error al conectarse ", e);
  }
};
