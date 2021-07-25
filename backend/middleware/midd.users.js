const { isAdminStatus } = require('../controllers/users.controller');

const LevelAdmin = (req, res, next) => {
    try {
        const { email } = req.body.email;
        const result = isAdminStatus(email);
        if (result) {
            return res.status(409).json('Usuario Admin');
        }
        next();
    } catch (e) {
        throw new Error('Ocurrio un error al buscar');
    }
}

module.exports = {
    LevelAdmin
}