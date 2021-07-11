const express = require('express');
const router = express.Router();

const { validateParamInUrl } = require('../middleware/index');
const { getTrendsByCategory, getTrends } = require("../services/trends.service");


router.get('/', async(req, res) => {
    try {
        const trends = await getTrends();
        res.status(200).json(trends);
    } catch (error) {
        res.status(503).json(error.message);
    }
});

router.get('/:category', validateParamInUrl, async(req, res) => {
    try {
        //console.log(req.params.category)
        const trendsByCategory = await getTrendsByCategory(`${req.params.category}`);
        res.status(200).json(trendsByCategory);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;