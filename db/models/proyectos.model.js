


import mongoose from 'mongoose'

const options = {
    collection: 'proyectos',
    strict: true,

    collation: {
        locale:"es",
        strength: 1,
    }
}


const proyectosSchema = new mongoose.Schema({


    imagen: String, 

    nombre: String,

    descripcion: String, 


    createdAt: {

        type: Date, 
        default: Date.now

    },





},options)



export const Proyectos = mongoose.model('Proyectos', proyectosSchema)