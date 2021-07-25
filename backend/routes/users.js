const express = require('express');
const router = express.Router();

const { UserCreate, ListUsers, checkUser } = require('../controllers/users.controller');
const { generarToken } = require('../services/jwt.service');

const { LevelAdmin, UserInSession } = require('../middleware/midd.users');
const { corsOption } = require('../middleware/index');
const cors = require('cors');

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

router.get('/', UserInSession, async(req, res) => { //Revisar que inicio sesion y revisar que es admin
    try {
        const listUser = await ListUsers();
        res.status(200).json(listUser);
    } catch (error) {
        res.status(412).json('Error al listar todos los usuarios: ' + error.message); //412 Precondition Failed  
    }
});

router.post('/login', cors(corsOption), async(req, res) => {
    try {
        let usuario = JSON.parse(req.body.json);
        const userFromDB = await checkUser(usuario);
        const token = await generarToken(userFromDB);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json('Sistema seguro, error en autenticación: ' + error.message);
    }
});

router.get('/checkSession', cors(corsOption), UserInSession, async(req, res) => {
    try {
        console.log('Entrando a checkSession');
        let valido = { status: true, message: 'Bienvenido' };
        res.status(200).json(valido);
    } catch (error) {
        res.status(400).json('Usuario no autenticado, redirigir a Login: ' + error.message);
    }
});

module.exports = router;