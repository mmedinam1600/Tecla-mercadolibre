const { getCategories } = require('./mercado.service');
const { Category, categories } = require('../db/Categories');

const findCategory = (id) => {
  if (categories.length > 0) {
    const categoryExists = categories.some((category) => {
      return category.id == id;
    });
    return categoryExists;
  }
  return false;
}

const getCategoriesApp = async () => {
  return categories;
}


module.exports = {
  findCategory,
  getCategoriesApp
}