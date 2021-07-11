
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

const validateId = (req, res, next) => {
  try{
    const { id } = req.query;
    if(id) { //Si el parámetro id es recibido continuamos
      next();
    } else {
      throw new Error(`Hace falta el parámetro id`);
    }
  } catch (e){
    console.error(`Error: ${e.message}`);
    res.status(400).json({
      'message': e.message
    });
  }
}

const validateSearch = (req, res, next) => {
  try{
    const { page = 1, limit = 10 } = req.query;
    if( isNaN(parseInt(page)) || isNaN(parseInt(limit)) ) throw new Error('El número de página o el límite deben ser valones numéricos');
    if( limit > 50) throw new Error(`El límite solicitado es superior al permitido. El máximo permitido es 50`);
    if( (limit * page) > 1001 ) throw new Error(`El máximo permitido de items sin access_token es 1000`);
    next(); //Si todo esta bien continuamos
  } catch (e) {
    console.error(`Error: ${e.message}`);
    res.status(400).json({
      'message': e.message
    });
  }

}

module.exports = {
  validateId,
  validateSearch
}