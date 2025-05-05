


import { Proyectos } from "../db/models/proyectos.model.js";



const responseAPI = {
    msg: "",
    data: [],
    status: "ok"

}



//Obtener todos los proyectos
export const getAllProyectos = async (req, res, next) => {


    try {

        const proyectos = await Proyectos.find();
        responseAPI.data = proyectos;
        responseAPI.msg = "Proyectos encontrados con éxito"
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("Tuvimos un error ", e)
        next(e)
    }

}






//Obtener un proyecto
export const getProyecto = async (req, res, next) => {

    const { id } = req.params



    try {

        const proyecto = await Proyectos.findById(id);
        responseAPI.data = proyecto;
        responseAPI.msg = `Proyecto con id ${id} encontrado con éxito`
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }


}
