import { Router } from 'express'
import { body } from 'express-validator'
import { createProduct, getProducts } from './handlers/product'
import { handleInputErrors } from './middleware'
//import { ExpressValidator } from 'express-validator'
const router = Router()

//Routing
router.get('/', getProducts)

router.post('/',
    //validacion
    body('name')
        .notEmpty().withMessage('El nombre del producto esta vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('No Valido')
        .custom(value => value > 0).withMessage('Precio no valido'),
        handleInputErrors,
    createProduct
)

router.put('/', (req, res) => {
    res.json('Desde PUT')
})

router.patch('/', (req, res) => {
    res.json('Desde PATCH')
})

router.delete('/', (req, res) => {
    res.json('Desde DELETE')
})

export default router