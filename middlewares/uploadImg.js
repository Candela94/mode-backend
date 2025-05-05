import multer from "multer";
import path from 'path';


// 1. Configuramos almacenamiento de Multer

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, 'public/uploads/imagenes')


        } else {
            cb(new Error('Tipo de archivo no permitido'), false)
        }

    },

    filename: (req, file, cb) => {

        const fileExt = path.extname(file.originalname);

        const date = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');

        //crear el nuevo nombre del archivo
        const filename = `${file.fieldname}-${date}${fileExt}`

        cb(null, filename)

    }
});


//2. Filtro para archivos
const fileFilter = (req, file, cb) => {
    //comprobar el tipo de archivo
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)


    } else {
        cb(new Error('El archivo debe ser una imagen o un audio válido'), false)
    }



}


export const uploadFiles = multer({

    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 15 * 1024 * 1024 
    }

});



