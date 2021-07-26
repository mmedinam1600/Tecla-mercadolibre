const express = require('express');
const router = express.Router();

const { UserCreate, ListUsers, checkUser, deleteUser, Userupdate } = require('../controllers/users.controller');
const { generarToken, jwt } = require('../services/jwt.service');

const { LevelAdmin, UserInSession } = require('../middleware/midd.users');
const { corsOption } = require('../middleware/index');
const cors = require('cors');


router.post('/register', async(req, res) => {
    try {
        let userBody = JSON.parse(req.body.json);
        //console.log(userBody)
        let user = { email: userBody.email, first_name: userBody.nombre, last_name: userBody.apellido, password: userBody.password };
        const createResult = await UserCreate(user);
        //console.log('Dentro de register');
        //console.log(createResult);
        res.status(200).json({ user: 'Usuario creado ' + createResult.dataValues.email });
    } catch (error) {
        res.status(409).json({ message: 'Error al crear un usuario: ' + error.message }); //409 Conflict
    }
});

router.get('/list-users', cors(corsOption), LevelAdmin, UserInSession, async(req, res) => { //Revisar que inicio sesion y revisar que es admin
    try {
        const listUser = await ListUsers();
        const UserList = [];
        for (let index = 0; index < listUser.length; index++) {
            const element = listUser[index];
            UserList.push({
                user_id: element.dataValues.user_id,
                first_name: element.dataValues.first_name,
                last_name: element.dataValues.last_name,
                email: element.dataValues.email,
                rol_id: element.dataValues.rol_id,
                active: element.dataValues.active,
            });
        }
        res.status(200).json(UserList);
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
        //console.log('Entrando a checkSession');
        let token = jwt.decode(req.headers.authorization.split(' ')[1]);
        //console.log(token.data.rol_id)
        let valido = { status: true, message: 'Bienvenido', type: token.data.rol_id, user: { id: token.data.user_id, name: token.data.first_name} };
        res.status(200).json(valido);
    } catch (error) {
        res.status(400).json('Usuario no autenticado, redirigir a Login: ' + error.message);
    }
});

router.post('/delete/:id', cors(corsOption), LevelAdmin, UserInSession, async(req, res) => {
    try {
        let user = req.params.id;
        const result = await deleteUser(user);
        if (result[0]) {
            res.status(200).json({ status: 'Usuario eliminado' });
        }
    } catch (error) {
        res.status(412).json('Error al listar todos los usuarios: ' + error.message); //412 Precondition Failed  
    }
});

router.post('/editUser/:id', cors(corsOption), LevelAdmin, UserInSession, async(req, res) => {
    try {
        console.log(JSON.parse(req.body.json));
        let user = req.params.id;
        let toChange = JSON.parse(req.body.json);
        console.log(user);
        const result = await Userupdate(user, toChange);
        console.log(result);
        if (result[0]) {
            res.status(200).json({ status: 'Usuario actualizado' });
        }
    } catch (error) {
        res.status(412).json('Error al listar todos los usuarios: ' + error.message); //412 Precondition Failed  
    }
});

module.exports = router;