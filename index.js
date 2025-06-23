



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
    res.send("Bienvenido a MODE :)")
})


conectarDB();

app.use("/", router)


app.listen( PORT , () => {
    console.log(`Servidor funcionando en ${BACKEND_URL}`)
})

// app.listen( PORT , () => {
//     console.log(`Servidor funcionando en ${URL_LOCAL}`)
// })