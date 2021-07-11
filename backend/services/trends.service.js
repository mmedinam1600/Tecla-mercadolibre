
const { MercadoClass } = require('../db/MercadoClass');


/**
 *
 * Description. Función que obtiene las tendencias por categoria.
 *
 * @param {String} category - Nombre de la categoria.
 * @returns {Promise<Object>} - Regresa un objeto con las tendencias de Mercado Libre por su categoría.
 */
const getTrendsByCategory = async (category) => {
    //Tendencias por categoria en mismo formato de ML
    try {
        const trendsByCategoryURL = new MercadoClass(`trends/${process.env.SITE_ID}/${category}`);
        return trendsByCategoryURL.makeFech();
    } catch (error) {
        throw new Error(`Error al obtener las tendencias de la categoria con id: ${category} de mercado libre`);
    }
}

/**
 *
 * Description. Función para obtener las tendencias generales en Mercado Libre.
 *
 * @returns {Promise<*>} - Regresa un objeto con las tendencias de Mercado Libre en general.
 */
const getTrends = async() => {
    //Tendencias de ML en mismo formato de MLs
    try {
        const trendsURL = new MercadoClass(`trends/${process.env.SITE_ID}`);
        return trendsURL.makeFech();
    } catch (error) {
        throw new Error("Error al obtener las tendencias de mercado libre");
    }
}

module.exports = {
    getTrendsByCategory,
    getTrends
}