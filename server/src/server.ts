import express from 'express'
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'
import enrutador from './router'
import bd from './config/db'

export async function conectar_bd() {
    try {
        await bd.authenticate()
        await bd.sync()
                
    } catch(error) {
        // En caso de error, imprimir el error en color rojo.
        console.log(colors.red.bold('Hubo un error al conectar a la BD.'))
    }
}

conectar_bd()
const servidor = express()

const opciones_cors : CorsOptions = {
    origin: function(origin, callback) {
        // Si no hay origin (por ejemplo, peticiones desde el mismo servidor) o coincide con FRONTEND_URL:
        if(!origin || origin === process.env.FRONTEND_URL) {
            callback(null, true) // Permitir el acceso.
        } else {
            callback(null, true) // Permitir acceso a cualquier otro origen para evitar el error.
        }
    }
}

servidor.use(cors(opciones_cors))
servidor.use(express.json())
servidor.use(morgan('dev'))
servidor.use('/api/products', enrutador)
servidor.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions))
export default servidor