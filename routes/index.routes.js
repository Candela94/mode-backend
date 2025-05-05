

import { Router } from "express";
import { uploadFiles } from "../middlewares/uploadImg.js";
import { AdminMiddleware, authMiddleWare } from "../middlewares/auth.middleware.js";
import { Proyectos } from "../db/models/proyectos.model.js";

import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { getAllProyectos, getProyecto } from "../controllers/proyectos.controllers.js";





const router = Router()


//Ruta para subida de imágenes
router.post('/admin/uploads', AdminMiddleware, uploadFiles.fields([
    { name: 'imgprod' }


]), async (req, res, next) => {

    try {


        if (!req.files || !req.files.imgprod ) {
            return res.status(400).json({
                success: false,
                message: "No se ha proporcionado ninguna imagen"
            })
        }




        console.log(req.files);

        const imageUrl = `${BACKEND_URL}/uploads/imagenes/${req.file.imgprod[0].filename}`
      

        //Creamos canción en la base de datos 
        const proyecto = await Proyectos.create({

            imagen: imageUrl,
        
            nombre: req.body.nombre,

            descripcion: req.body.descripcion
           

        })




        return res.status(200).json({
            success: "ok",
            message: "Imagen subida con éxito :)",
            data: proyecto,
            fileData: {
                imageUrl: imageUrl,
           
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