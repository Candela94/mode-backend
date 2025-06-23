



import express from 'express'


import { PORT, BACKEND_URL, URL_LOCAL} from './config/config.js'
import router from './routes/index.routes.js'
import { conectarDB } from './db/mongoose.js'

import cors from 'cors'



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin: 'https://www.mode-studio.es',
    credentials: true
}))



//Contenido estático
app.use('/uploads', express.static('public/uploads'))
app.use('/web', express.static('public'))







app.get("/", (req, res, next) => {
    console.log("Ruta raíz llamada en Railway!")
    res.send("Bienvenido a MODE :)")
})


conectarDB();

app.use("/api/v1", router)


app.listen( PORT ,'0.0.0.0', () => {
    console.log(`Servidor funcionando en ${BACKEND_URL}`)
})

// app.listen( PORT , () => {
//     console.log(`Servidor funcionando en ${URL_LOCAL}`)
// })