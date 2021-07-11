const { MercadoClass } = require('../db/MercadoClass');
const { Category, categories } = require('../db/Categories');
require('dotenv').config();

const getCategories = async() => {
    try {
        const categoriesURL = new MercadoClass(`sites/${process.env.SITE_ID}`);
        const data = await categoriesURL.makeFech();
        //console.log(data.categories);
        data.categories.forEach((category) => {
            categories.push(new Category(category.id, category.name));
        });
        return categories;
    } catch (e) {
        throw new Error("Error al obtener las categorias de mercado libre");
    }
}

const getProductsByIds = async(ids) => {
    try {
        //En este arreglo se guardaran los productos encontrados satisfactoriamente con sus propiedades
        const arrayOfProducts = [];
        const productsURL = new MercadoClass(`items?ids=${ids}`); //Se intancia nuestro servicio
        const data = await productsURL.makeFech(); //Hacemos el llamado a la API de mercado libre
        data.forEach((product) => {
            if (product.code === 200) { //Si el ID es correcta y nos entrego información, entonces lo agregamos al array
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
    } catch (e) {
        throw new Error("No se pudo procesar la solicitud getProductsByIds");
    }
}

const getProductsByCategory = async(category, page, products_per_page) => {
    //El Middleware de la llamada debe considerar que se incluyan page y products_per_page por defecto
    const offset = (parseInt(page) - 1) * parseInt(products_per_page);
    const limit = parseInt(products_per_page);
    const listOfProducts = [];
    //Listado de productos por categoria, solamente traemos las propiedades que utilizamos en la app
    try {
        const productsByCategoryURL = new MercadoClass(`sites/${process.env.SITE_ID}/search?category=${category}&offset=${offset}&limit=${limit}`);
        const dataProductsByCategory = await productsByCategoryURL.makeFech();
        //atributos utilizados por nuestra app: id, title, thumbnail, price, condition, permalink
        dataProductsByCategory.results.forEach(product => {
            listOfProducts.push({
                'id': product.id,
                'title': product.title,
                'thumbnail': product.thumbnail,
                'price': product.price,
                'condition': product.condition,
                'permalink': product.permalink
            });
        });
        //console.log(listOfProducts);
        return listOfProducts;
    } catch (error) {
        throw new Error(`Error al obtener las tendencias de la categoria con id: ${category} de mercado libre para la página ${offset}.`);
    }
}

const searchProducts = async(query, page, limit, category) => {
    const offset = (page - 1) * limit;
    //En este arreglo se guardaran los productos encontrados satisfactoriamente con sus propiedades
    const arrayOfProducts = [];
    const productsURL = new MercadoClass(`sites/${process.env.SITE_ID}/search?q=${query}&offset=${offset}&limit=${limit}&category=${category}`); //Se intancia nuestro servicio
    const data = await productsURL.makeFech();
    return data;
}

const getTrendsByCategory = async(category) => {
    //Tendencias por categoria en mismo formato de ML
    try {
        const trendsByCategoryURL = new MercadoClass(`trends/${process.env.SITE_ID}/${category}`);
        const dataTrendsByCategory = await trendsByCategoryURL.makeFech();
        //console.log(dataTrendsByCategory);
        return dataTrendsByCategory;
    } catch (error) {
        throw new Error(`Error al obtener las tendencias de la categoria con id: ${category} de mercado libre`);
    }
}

const getTrends = async() => {
    //Tendencias de ML en mismo formato de ML
    try {
        const trendsURL = new MercadoClass(`trends/${process.env.SITE_ID}`);
        const dataTrends = await trendsURL.makeFech();
        //console.log(dataTrends);
        //console.log(data); //Al descomentar esta línea entra el error.
        return dataTrends;
    } catch (error) {
        throw new Error("Error al obtener las tendencias de mercado libre");
    }
}



module.exports = {
    getCategories,
    getTrends,
    getTrendsByCategory,
    getProductsByCategory,
    getProductsByIds,
    searchProducts
}