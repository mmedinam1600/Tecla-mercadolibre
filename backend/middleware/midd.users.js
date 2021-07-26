const { isAdminStatus } = require('../controllers/users.controller');
const { descubrirToken } = require('../services/jwt.service');

const LevelAdmin = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let verificado = await descubrirToken(token);
        console.log(verificado.data.email);
        const email = await verificado.data.email;
        const result = await isAdminStatus(email);
        if (result) {
            return res.status(200).json({ isadmin: true, email: result });
        }
        next();
    } catch (e) {
        throw new Error('Ocurrio un error al buscar función LevelAdmin: ' + e.message);
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