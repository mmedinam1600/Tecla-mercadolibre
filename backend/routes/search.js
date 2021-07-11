const express = require('express');
const router = express.Router();

const { validateSearch } = require('../middleware/index');
const { searchProducts } = require("../services/product.service");


router.get('/', validateSearch, async (req, res) => {
    try{
        const { q, page = 1, limit = 10, category = "" } = req.query;
        const products = await searchProducts(q, page, limit, category);
        res.status(200).json(products);
    } catch (e) {
        console.error(`Ocurrio un error al procesar la ruta GET /search Error: ${e.message}`);
        res.status(400).json({ 'error': `${e.message}`});
        throw new Error(`Ocurrio un error al procesar la ruta GET /search. Error: ${e.message}`);
    }
});

module.exports = router;