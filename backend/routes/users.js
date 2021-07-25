const express = require('express');
const router = express.Router();

const { CreateUser, SearchUser } = require('../models/users.model');

router.post('/', async(req, res) => {
    try {
        let user = { email: req.body.email, first_name: req.body.first_name, last_name: req.body.last_name, password: req.body.password };
        const create = await CreateUser(user);
        console.log(create);
        res.status(200).json(create);
    } catch (error) {
        res.status(503).json('Error al crear un usuario: ' + error.message);
    }
});

module.exports = router;