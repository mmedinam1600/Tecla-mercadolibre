const { firstUpdateCategoriesFromMercadoLibre } = require('./mercado.service');
const { Category, arrayOfCategories } = require('../db/CategoriesClass');

const findCategory = (id) => {
  if (arrayOfCategories.length > 0) {
    const categoryExists = arrayOfCategories.some((category) => {
      return category.id == id;
    });
    return categoryExists;
  }
  return false;
}

const getCategoriesApp = async () => {
  return arrayOfCategories;
}


module.exports = {
  findCategory,
  getCategoriesApp
}