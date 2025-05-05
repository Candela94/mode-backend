
//Conexión a MongoDB

import mongoose from "mongoose";

import { DATABASE, DB_PASS, DB_USER , CLUSTER } from "../config/config.js";


export const conectarDB = async () => {


    const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${CLUSTER}/${DATABASE}?retryWrites=true&w=majority&appName=CEI-PRACTICAS`

    try {
        await mongoose.connect(url);
        console.log("Conectado a mongoDB")
        console.log("Base de datos actual: ", mongoose.connection.db.databaseName);

        //preguntamos qué colecciones tengo libres 
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("colecciones disponibles: ", collections.map( c=> c.name))


    } catch(e) {
        console.error("Error al conectarse ", e)
    }


} 