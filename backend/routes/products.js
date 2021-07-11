const express = require('express');
const router = express.Router();

const { validateId  } = require('../middleware/index');
const {  getProductsByIds } = require("../services/product.service");

/**
 * Route GET http://localhost:3000/products
 * Description. Devolvemos un arreglo de productos por su ID
 */
router.get('/', validateId, async (req, res) => {
    try {
        const { id } = req.query; //Obtenemos las ids que nos manden por parametros
        const products = await getProductsByIds(id); //Obtenemos un arreglo de productos encontrados
        res.status(200).json(products); //Devolvemos este arreglo y una respuesta exitosa
    } catch (e){
        console.error(`Ocurrio un error al procesar la ruta GET /products Error: ${e.message}`);
        res.status(400).json({ 'error': `${e.message}` }); // El servidor no entendio su petición y devolvemos un mensaje de error
        throw new Error(`Ocurrio un error al procesar la ruta GET /products. Error: ${e.message}`);
    }
});

/**
 * Route POST http://localhost:3000/products
 * Description. Agrega nuevos productos
 */
//AGREGAR NUEVOS PRODUCTOS
router.post('/', async (req, res) => {
    try {
        const { id } = req.body;
        res.status(200).json({
            message: "OK"
        });
    } catch (e) {

    }
});

module.exports = router;