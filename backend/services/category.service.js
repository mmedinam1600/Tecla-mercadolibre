
const { arrayOfCategories } = require('../db/CategoriesClass');

/**
 *
 * Description.
 *
 * @param {String | Number} id - Identificador de la categoría
 * @returns {boolean} - Nos indica si una categoria ya existe en la BD.
 */
const findCategory = (id) => {
  if (arrayOfCategories.length > 0) {
    return arrayOfCategories.some( category => category.id == id);
  }
  return false;
}

/**
 *
 * Description. Función que consulta la BD y nos devuelve las categorias
 *
 * @returns {Promise<[]>} Consulta en la BD el array de categorias
 */
const getCategoriesApp = async () => {
  return arrayOfCategories;
}


module.exports = {
  findCategory,
  getCategoriesApp
}