
const { findAll } = require('../models/categories.model');

const getCategories = async () => {
    try {
        return findAll();
    } catch (e) {
        throw new Error("ERROR al obtener las categorias de la DB: " + e.message);
    }
}

module.exports = {
    getCategories
}