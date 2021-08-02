const express = require('express');
const router = express.Router();

const { AddressCreate } = require('../controllers/adresses.controller');
const { jwt } = require('../services/jwt.service');

const { corsOption } = require('../middleware/index');
const cors = require('cors');


router.post('/create', cors(corsOption), async(req, res) => {
    try {
        console.log('Dentro de Create Address');
        let AddressBody = JSON.parse(req.body.json);

        let token = jwt.decode(req.headers.authorization.split(' ')[1]);
        let user = token.data.user_id;

        console.log(AddressBody);

        const createResult = await AddressCreate(AddressBody, user);
        let result = {
            status: 'Dirección creada ' + createResult.dataValues.id,
        }

        res.status(200).json({ address: 'Dirección creada ' + result.status });
    } catch (error) {
        res.status(409).json({ message: 'Error al crear la dirección: ' + error.message }); //409 Conflict
    }
});

module.exports = router;