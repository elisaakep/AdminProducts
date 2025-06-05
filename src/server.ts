import express from "express"
import router from "./router"
import db from './config/db'

async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        console.log('Conexion exitosa')
    } catch (error){
        console.log(error)
        console.log('Hubo un error al conectar')
    }
}
connectDB()

const server = express()

server.use('/api/products', router)    

export default server   

