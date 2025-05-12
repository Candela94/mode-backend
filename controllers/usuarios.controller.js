

//Crear un usuario

export const createUsuario = async (req, res, next) => {


    const {  email,  password, repeatPassword, role } = req.body;

    if (password !== repeatPassword) {
        return res.status(400).json({
            message: 'Las contraseñas no coinciden'
        })
    }


    try {

        const nuevoUsuario = await Usuario.create({  email, username, password, role: role || 'admin' });
        responseAPI.data = nuevoUsuario;
        responseAPI.msg = `Admin con email ${email} ha sido creado con éxito :)`
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }

}
