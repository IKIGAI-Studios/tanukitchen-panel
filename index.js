import express, { urlencoded } from "express"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import cors from "cors"
import http from "http"
// rimport connectMongoDB from './connection'
import main_routes from "./routes/main_routes.js"
// import bin_routes from './routes/bin_routes'
// import bd_modules_routes from './routes/bd_modules_routes'
import dotenv from "dotenv"
import session from "express-session"
import cookieParser from "cookie-parser"
import { Server } from "socket.io"
import listenMQTT from "./mqtt.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()


// connectMongoDB()
dotenv.config()

const port = 3000
const httpServer = http.createServer(app) // Crea un servidor HTTP con Express
const io = new Server(httpServer)

listenMQTT(io)

httpServer.listen(port, () => {
  console.log(`Servidor en el puerto ${port}`)
})

app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  session({
    secret: process.env.SECRET_KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }, // En producción debería ser true para usar HTTPS
  })
)

app.use("/", express.static(join(__dirname, "/public")))
app.use("/", main_routes)
// app.use('/api/bin/', bin_routes)
// app.use('/api/modules/', bd_modules_routes)
app.use("/img", express.static(join(__dirname, "src/img")))
app.use("/fonts", express.static(join(__dirname, "src/fonts")))
app.use("/js", express.static(join(__dirname, "src/js")))
app.set("view engine", "ejs")
app.use("/scss", express.static(join(__dirname, "src/assets/scss")))
