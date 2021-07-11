const express = require('express');
const router = express.Router();

const { getCategoriesApp } = require("../services/category.service");

router.get('/', async (req, res) => {
    try {
        const categories = await getCategoriesApp();
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