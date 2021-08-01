
const { MercadoClass } = require('../db/MercadoClass');

/**
 *
 * Description. Busca en nuestra DB si ya existe la categoria con el id
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
const getCategoriesML = async () => {
  const mercadoService = new MercadoClass(`sites/${process.env.SITE_ID}`);
  const data = await mercadoService.makeFech();
  return data.categories;
}


module.exports = {
  findCategory,
  getCategoriesML
}