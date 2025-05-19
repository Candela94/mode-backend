



import express from 'express'


import { PORT, BACKEND_URL} from './config/config.js'
import router from './routes/index.routes.js'
import { conectarDB } from './db/mongoose.js'

import cors from 'cors'



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const whitelist = ['http://localhost:5173', 'https://tu-app.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('No permitido por CORS'))
    }
  },
  credentials: true
}));

  



//Contenido estático
app.use('/uploads', express.static('public/uploads'))
app.use('/web', express.static('public'))

// app.get("/", (req,res,next) => {
//     res.setHeader("Content-Type", "text/html")

//     const pageHTML = `
    
//     <h1> Bienvenidx a SOUNDsLIKE :) </h1>
    

    
//     `

//     res.send(pageHTML)
// })






app.get("/", (req, res, next) => {
    res.send("Bienvenido a MODE :)")
})


conectarDB();

app.use("/api/v1", router)


app.listen( PORT , () => {
    console.log(`Servidor funcionando en ${BACKEND_URL}`)
})