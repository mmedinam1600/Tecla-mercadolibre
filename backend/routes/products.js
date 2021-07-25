const express = require('express');
const router = express.Router();

const { validateId  } = require('../middleware/index');
const {  getProductsByIds } = require("../services/product.service");
const { verifyProduct } = require('../middleware/midd.product');
const product = require('../controllers/products.controller');

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
 * Route GET http://localhost:3000/products/ours
 * Description. Devuelve todos los productos de nuestra DB
 */
router.get('/ours', async (req, res) => {
    try {
        const products = await Product
        res.status(200).json({
            message: "OK"
        });
    } catch (e) {
    }
});

/**
 * Route POST http://localhost:3000/products/ours
 * Description. Agrega un nuevo producto a la BD
 */
//AGREGAR NUEVOS PRODUCTOS
router.post('/ours', verifyProduct, async (req, res) => {
    try {
        const data = req.body;
        const user_id = 1;
        const newProduct = await product.addProduct(data, user_id);
        res.status(200).json({
            message: "Producto insertado correctamente",
            product: newProduct
        });
    } catch (e) {
        console.log("Error al agregar el producto :(" + e.message);
        res.status(400).json({
            message: e.message
        });
    }
});

module.exports = router;