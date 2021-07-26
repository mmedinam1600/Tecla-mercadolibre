
const { Product, findAll, findBySeller, findByIds, removeProductById } = require('../models/products.model');

const addProduct = async (product, user_id) => {
    try {
        const newProduct = new Product(product);
        return newProduct.addProduct(user_id);
    } catch (e) {
        throw new Error("ERROR al agregar un producto en la BD: " + e.message);
    }
}

const editProduct = async (data, user_id) => {
    try{
        const product = new Product(data);
        const product_id = data.product_id;
        return product.editProduct(user_id, product_id);
    } catch (e) {
        throw new Error("ERROR al modificar un producto en la BD: " + e.message);
    }
}

//limit[number] | category[number] | query[string] seller_id[number]
const getProducts = async (params) => {
    try{
        const limit = parseInt(params.limit) || 50;
        const offset = parseInt(params.offset) || 0;
        const seller_id = parseInt(params.seller_id);
        if(seller_id){
            return await findBySeller(seller_id, limit, offset);
        }
        const product_id = params.product_id;
        if(product_id){
            return await findByIds(product_id);
        }
        const category = params.category;
        const query = params.query;
        return findAll(limit, offset, category, query);
    } catch (e) {
        throw new Error("ERROR al obtener los productos de la DB: " + e.message);
    }
}

const removeProduct = async (productId) => {
    return removeProductById(parseInt(productId));
}


module.exports = {
    addProduct,
    getProducts,
    removeProduct,
    editProduct
}