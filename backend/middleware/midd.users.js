const { isAdminStatus } = require('../controllers/users.controller');
const { descubrirToken } = require('../services/jwt.service');

const LevelAdmin = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let verificado = await descubrirToken(token);
        //console.log('Dentro de Middleware LevelAdmin');
        //console.log(verificado.data.email);
        const email = await verificado.data.email;
        //console.log('email despues de data email');
        //console.log(email);
        const result = await isAdminStatus(email);
        //console.log(result)
        next();
    } catch (error) {
        res.status(403).json({ error: 'Ocurrio un error en la función LevelAdmin' + error.message }) //403 Forbidden El usuario no tiene acceso a ese contenido
    }
}

const UserInSession = async(req, res, next) => {
    try {
        if (req.headers.authorization != undefined) {
            const token = req.headers.authorization.split(' ')[1];
            let verificado = await descubrirToken(token);
            //console.log(verificado.data);
            //console.log(req.params);
            return next()
        } else {
            throw new Error('Este es un sistema seguro y requiere autorización')
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    LevelAdmin,
    UserInSession
}