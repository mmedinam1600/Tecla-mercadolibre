const express = require('express');
const router = express.Router();

const { UserCreate, ListUsers } = require('../controllers/users.controller');

router.post('/', async(req, res) => {
    try {
        let user = { email: req.body.email, first_name: req.body.first_name, last_name: req.body.last_name, password: req.body.password };
        const createResult = await UserCreate(user);
        console.log(createResult);
        res.status(200).json(createResult);
    } catch (error) {
        res.status(409).json('Error al crear un usuario: ' + error.message); //409 Conflict
    }
});

router.get('/', async(req, res) => {
    try {
        const listUser = await ListUsers();
        res.status(200).json(listUser);
    } catch (error) {
        res.status(412).json('Error al listar todos los usuarios: ' + error.message); //412 Precondition Failed  
    }
});

module.exports = router;