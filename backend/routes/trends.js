const express = require('express');
const router = express.Router();

const { validateParamInUrl } = require('../middleware/index');
const { getTrendsByCategory, getTrends } = require("../services/trends.service");

/**
 * Route http://localhost:3000/trends
 * Description. Obtiene las tendencias generales en mercado libre
 */
router.get('/', async(req, res) => {
    try {
        const trends = await getTrends();
        res.status(200).json(trends);
    } catch (error) {
        res.status(503).json('Servicio no disponible: ' + error.message);
    }
});

/**
 * Route http://localhost:3000/trends/MLM1384
 * Description. Regresa las tendencias por el id de la categoría
 */
router.get('/:category', validateParamInUrl, async(req, res) => {
    try {
        //console.log(req.params.category)
        const trendsByCategory = await getTrendsByCategory(`${req.params.category}`);
        res.status(200).json(trendsByCategory);
    } catch (error) {
        res.status(500).json("Error interno de servidor: " + error.message);
    }
});

module.exports = router;