import express from "express"
import colors from "colors"
import router from "./router"
import db from './config/db'

async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue('Conexion exitosa'))
    } catch (error){
        console.log(error)
        console.log(colors.red.bold('Hubo un error al conectar'))
    }
}
connectDB()

//Instancia de access esxpress
const server = express()


//Leer datos de formularios
server.use(express.json())

server.use('/api/products', router)    

export default server   

