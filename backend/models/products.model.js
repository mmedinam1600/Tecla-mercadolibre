
const { sequelize, DataTypes } = require('../db/conexion');

const Products = sequelize.define('Products',{
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    thumbnail: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    unit_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    condition: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    quantity_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Categories',
            key: 'category_id',
        }
    },
    users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'user_id',
        }
    },
    active: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
    }
}, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

class Product {
    constructor(product) {
        this.title = product.title;
        this.thumbnail = product.thumbnail;
        this.unit_price = product.unit_price;
        this.condition = product.condition;
        this.quantity_stock = product.quantity_stock;
        this.category_id = product.category_id;
    }

    async getProducts() {

    }

    async getProductById(productId) {

    }

    async editProductById(productoID) {

    }

    async addProduct(user_id) {
        const createProduct = Products.create({
            title: this.title,
            thumbnail: this.thumbnail,
            unit_price: this.unit_price,
            condition: this.condition,
            quantity_stock: this.quantity_stock,
            category_id: this.category_id,
            users_id: user_id
        });
        return createProduct;
    }

    async removeProductById(productId) {

    }

}


module.exports = {
    Product
}