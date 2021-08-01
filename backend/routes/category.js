const express = require('express');
const router = express.Router();

const { getCategoriesML } = require("../services/category.service");
const { getCategories } = require("../controllers/categories.controller");

/**
 * Route GET http://localhost:3000/category
 * Description. Devuelve las categorias de mercado libre
 */
router.get('/', async (req, res) => {
    try {
        const categories = await getCategoriesML();
        res.status(200).json(categories);
    } catch (e) {
        console.error(`Error al traer las categorias: ${e.message}`);
        res.status(404).json({
            message: "Error 404"
        });
        throw new Error(`Error al traer las categorias: ${e.message}`);
    }
});

/**
 * Route GET http://localhost:3000/category/ours
 * Description. Devuelve las categorias nuestras
 */
router.get('/ours', async (req, res) => {
    try {
        const categories = await getCategories();
        res.status(200).json(categories);
    } catch (e) {
        console.error(`Error al traer las categorias: ${e.message}`);
        res.status(404).json({
            message: "Error 404"
        });
        throw new Error(`Error al traer las categorias: ${e.message}`);
    }
});


module.exports = router;