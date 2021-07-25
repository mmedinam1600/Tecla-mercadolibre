
const { Product } = require('../models/products.model');

const addProduct = async (product, user_id) => {
    try {
        const newProduct = new Product(product);
        await newProduct.addProduct(user_id);
        return newProduct;
    } catch (e) {
        throw new Error("ERROR al agregar un producto en la BD: " + e.message);
    }
}


module.exports = {
    addProduct
}