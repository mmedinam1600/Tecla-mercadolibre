const express = require('express');
const router = express.Router();

const { CreateUser, SearchUser } = require('../models/users');

router.post('/', async(req, res) => {
    try {
        let user = { email: 'sam@hdez.com', first_name: 'sam', last_name: 'hdez', password: 'samHdz789bad' };
        const create = await CreateUser(user);
        console.log(create);
        res.status(200).json(create);
    } catch (error) {
        res.status(503).json('Error al crear un usuario: ' + error.message);
    }
});

module.exports = router;