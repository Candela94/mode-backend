

import { Router } from "express";
import { uploadFiles } from "../middlewares/uploadImg.js";
import { AdminMiddleware, authMiddleWare } from "../middlewares/auth.middleware.js";
import { Proyectos } from "../db/models/proyectos.model.js";

import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { getAllProyectos, getProyecto } from "../controllers/proyectos.controllers.js";

import { BACKEND_URL } from "../config/config.js";





const router = Router()


//Ruta para subida de imágenes
router.post('/admin/proyectos', AdminMiddleware, uploadFiles.fields([
    { name: 'portada', maxCount:1 },
    {name: 'imagenes'}


]), async (req, res, next) => {

    try {


        if (!req.files || !req.files.portada || !req.files.imagenes) {
            return res.status(400).json({
                success: false,
                message: "Faltan imágebes"
            })
        }

        const portadaFile = req.files.portada[0];
        const imagenesFiles = req.files.imagenes;


     

        const imagenesUrl = imagenesFiles.map(file => `${BACKEND_URL}/uploads/imagenes/${file.filename}`)
        const portadaUrl = `${BACKEND_URL}/uploads/imagenes/${portadaFile.filename}`;


        //Creamos proyecto en la base de datos 
        const proyecto = await Proyectos.create({

            imagenes: imagenesUrl,
            portada: portadaUrl,
            nombre: req.body.nombre,

          
           

        })




        return res.status(200).json({
            success: "ok",
            message: "Imagenes subida con éxito :)",
            data: proyecto,
            fileData: {
                portada: portadaUrl,
                imagenes: imagenesUrl
           
                //peso:`${Math.round(req.file.size/1024)}`,
                //size:"500kb"
            }

        })
    } catch (e) {

        next(e)



    }



})

 

//Login y registro ADMIN 

//login 
router.post("/admin/login", loginUser)


//registro
router.post("/admin/register", registerUser)







//Proyectos 


//Obtener todos los proyectos
router.get("/proyectos", getAllProyectos)


//Obtener un proyecto
router.get("/proyectos/:pid", getProyecto)






export default router