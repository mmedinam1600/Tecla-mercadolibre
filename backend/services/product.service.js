
const { MercadoClass } = require('../db/MercadoClass');

/**
 *
 * Description. Función que nos devuelve un arreglo de items por su ID
 *
 * @param {String} ids - String indicando las id de los items separados por comas. Ejemplo: MLM554316484,MLM919078004,MLM920473147
 * @returns {Promise<*[]>} - Regresa un arreglo con los productos encontrados por su ID.
 */
const getProductsByIds = async (ids) => {
    try{
        //En este arreglo se guardaran los productos encontrados satisfactoriamente con sus propiedades
        const arrayOfProducts = [];
        const productsURL = new MercadoClass(`items?ids=${ids}`); //Se intancia nuestro servicio
        const data = await productsURL.makeFech(); //Hacemos el llamado a la API de mercado libre
        data.forEach( (product) => {
            if(product.code === 200){ //Si el ID es correcta y nos entrego información, entonces lo agregamos al array
                arrayOfProducts.push({
                    'id': product.body.id,
                    'title': product.body.title,
                    'thumbnail': product.body.thumbnail,
                    'price': product.body.price,
                    'condition': product.body.condition,
                    'permalink': product.body.permalink
                });
            }
        });
        return arrayOfProducts;
    } catch (e){
        throw new Error ("No se pudo procesar la solicitud getProductsByIds");
    }
}

/**
 *
 * Description. Función que busca productos especificos por su categoría o query.
 *
 * @param {String} query - Indica la palabra por la cual se realizará la busqueda.
 * @param {Number} [page] - Indica el número de página a mostrar.
 * @param {Number} [limit] - Indica el número de resultados a mostrar. (Máximo 50)
 * @param {String} [category] - Especifica la categoria a realizar la busqueda.
 * @returns {Promise<Object>} - Regresa los productos encontrados en la busqueda.
 */
const searchProducts = async (query, page , limit, category ) => {
    const offset = (page - 1) * limit;
    //En este arreglo se guardaran los productos encontrados satisfactoriamente con sus propiedades
    const arrayOfProducts = [];
    try{
        const productsURL = new MercadoClass(`sites/${process.env.SITE_ID}/search?q=${query}&offset=${offset}&limit=${limit}&category=${category}`); //Se intancia nuestro servicio
        const data = await productsURL.makeFech();
        data.results.forEach( productFound => {
            arrayOfProducts.push({
                'id': productFound.id,
                'title': productFound.title,
                'thumbnail': productFound.thumbnail,
                'price': productFound.price,
                'condition': productFound.condition,
                'permalink': productFound.permalink
            });
        });
        return {
            "total": data.paging.total,
            "products": arrayOfProducts
        };
    } catch (e) {
        throw new Error(`Error al obtener las tendencias de la categoria con id: ${category} de mercado libre para la página ${offset}.`);
    }
}

module.exports = {
    getProductsByIds,
    searchProducts
}