const { MercadoClass } = require('../db/MercadoClass');
const { Category, categories } = require('../db/Categories');
require('dotenv').config();

const getCategories = async () => {
  try{
    const categoriesURL = new MercadoClass(`sites/${process.env.SITE_ID}`);
    const data = await categoriesURL.makeFech();
    console.log(data.categories);
    data.categories.forEach( (category) => {
      categories.push( new Category(category.id, category.name) );
    });
    return categories;
  } catch (e){
    throw new Error("Error al obtener las categorias de mercado libre");
  }
}

const getProductById = () => {

}

const getProductsByCategory = () => {

}

const searchProducts = () => {

}

const getTrendsByCategory = () => {

}

const getTrends = () => {

}



module.exports = {
  getCategories
}