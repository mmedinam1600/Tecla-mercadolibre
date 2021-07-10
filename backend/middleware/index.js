
const { findCategory } = require('../services/category.service')

const existCategory = (req, res, next) => {
  try {
    const { id } = req.body;
    const result = findCategory(id);
    if (result) {
      return res.status(409).json('El contacto ya existe');
    }
    next();
  } catch (e){
    throw new Error('Ocurrio un error al buscar');
  }
}