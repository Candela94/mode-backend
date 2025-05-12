
import { Usuario } from "../db/models/usuario.model.js"
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config/config.js";






// Admin

export const AdminMiddleware = async (req, res, next) => {
    console.log('🛡️ Entrando a AdminMiddleware');

    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, token requerido' })
    }


    try {

        //1.Verificamos token 
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Token decodificado:', decoded);
        req.userId = decoded.userId;


        //2.Buscar usuario y verificar su rol
        const usuario = await Usuario.findById(decoded.userId)
        console.log('Usuario encontrado:', usuario); 

        if (!usuario || usuario.role !== 'admin') {

            return res.status(403).json({ message: 'Acceso denegado, no eres administradorx' })

        }


        next();



    } catch (e) {
        console.error('Error al verificar token:', e);
        res.status(401).json({ message: 'Acceso denegado, token expirado o inválido' })
    }

}







export const authMiddleWare = (req, res, next) => {

    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, token requerido' })
    }


    try {

        //Verificamos token
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId;
        console.log("Usuario autenticado con ID:", req.userId);
        next();
    } catch (e) {

        res.status(401).json({ message: 'Acceso denegado, token expirado' })
    }


}
