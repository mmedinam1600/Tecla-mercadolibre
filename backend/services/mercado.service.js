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

const getProductById = () => {

}

const getProductsByCategory = async(category, page, products_per_page) => {
    //El Middleware de la llamada debe considerar que se incluyan page y products_per_page por defecto
    const offset = parseInt((page - 1) * products_per_page);
    const limit = products_per_page;
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

const searchProducts = () => {

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
        return dataTrends;
    } catch (error) {
        throw new Error("Error al obtener las tendencias de mercado libre");
    }
}



module.exports = {
    getCategories,
    getTrends,
    getTrendsByCategory,
    getProductsByCategory
}