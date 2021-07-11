const { MercadoClass } = require('../db/MercadoClass');
const { Category, arrayOfCategories } = require('../db/CategoriesClass');
require('dotenv').config();


/**
 *
 * Description. Funcion que se encagará de cargar en un array las categorías de Mercado Libre
 *
 * @returns {Promise<void>}
 */
const firstUpdateCategoriesFromMercadoLibre = async() => {
    try {
        /* Obtenemos las categorías de Mercado Libre */
        const mercadoService = new MercadoClass(`sites/${process.env.SITE_ID}`);
        const data = await mercadoService.makeFech();

        /* Accedemos a la "DB" y guardamos en un arreglo las categorias encontradas */
        data.categories.forEach( category => arrayOfCategories.push(new Category(category.id, category.name)) );

    } catch (e) {
        throw new Error(`Error al cargar las categorias de Mercado Libre. Error: ${e.message}`);
    }
}


module.exports = {
    firstUpdateCategoriesFromMercadoLibre,
}