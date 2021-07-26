const express = require('express');
const router = express.Router();

const { validateId  } = require('../middleware/index');
const {  getProductsByIds } = require("../services/product.service");
const { verifyProduct } = require('../middleware/midd.product');
const { LevelAdmin, UserInSession } = require('../middleware/midd.users');
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
 * Params. limit[number] | category[number] | query[string] seller_id[number] | product_id[number]
 * Description. Devuelve todos los productos de nuestra DB
 */
router.get('/ours', LevelAdmin, UserInSession, async (req, res) => {
    try {
        const params = req.query;
        const products = await product.getProducts(params);
        res.status(200).json(products);
    } catch (e) {
        console.log("Error al obtener los productos :(" + e.message);
        res.status(400).json({
            message: e.message
        });
    }
});

/**
 * Route POST http://localhost:3000/products/ours
 * Description. Agrega un nuevo producto a la BD
 */
router.post('/ours', verifyProduct, async (req, res) => {
    try {
        const data = req.body;
        const user_id = 1; //Ahorita todos los productos se agregaran con el usuario 1.
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

/**
 * Route PUT http://localhost:3000/products/ours
 * Description. Modifica un producto de la BD
 */
router.put('/ours/:id', verifyProduct, async (req, res) => {
    try {
        const data = req.body;
        data['product_id'] = req.params.id;
        const user_id = 1; //Ahorita todos los productos se agregaran con el usuario 1.
        const newProduct = await product.editProduct(data, user_id);
        res.status(200).json({
            message: `Producto con el ID: ${data.product_id} modificado correctamente`,
        });
    } catch (e) {
        console.log("Error al agregar el producto :( " + e.message);
        res.status(400).json({
            message: e.message
        });
    }
});


/**
 * Route DELETE http://localhost:3000/products/ours/:id
 * Params. limit[number] | category[number] | query[string] seller_id[number] | product_id[number]
 * Description. Devuelve todos los productos de nuestra DB
 */
router.delete('/ours/:id', LevelAdmin, UserInSession, async (req, res) => {
    try {
        const id = req.params.id;
        const products = await product.removeProduct(id);
        res.status(200).json({
            message: `Se removio el producto con el ID: ${id} correctamente.`,
        });
    } catch (e) {
        console.log("Error al obtener los productos :(" + e.message);
        res.status(400).json({
            message: e.message
        });
    }
});

module.exports = router;