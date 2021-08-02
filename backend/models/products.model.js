const {sequelize, DataTypes, Op} = require('../db/conexion');

const Products = sequelize.define('Products', {
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

    async editProduct(user_id, product_id) {
        console.log(user_id, product_id)
        const updateProduct = await Products.update({
            title: this.title,
            thumbnail: this.thumbnail,
            unit_price: this.unit_price,
            condition: this.condition,
            quantity_stock: this.quantity_stock,
            category_id: this.category_id,
            users_id: user_id
        }, {
            where: {
                product_id: product_id,
            }
        });
        return updateProduct;
    }
}

/**
 *
 * Description. Función para buscar algun producto dependiendo los parametros.
 *
 * @param limit
 * @param offset
 * @param category
 * @param query
 * @returns {Promise<{results: *, products: Model<TModelAttributes, TCreationAttributes>[]}>}
 */
async function findAll(limit, offset ,category, query) {
    try{
        let options = {
            offset,
            limit,
        };
        if (category && query) {
            options['where'] = {
                title: {
                    [Op.substring]: `${query}`,
                },
                category_id: category,
                active: 1
            }
        } else if (category) {
            options['where'] = {
                category_id: category,
                active: 1
            }
        } else if (query) {
            options['where'] = {
                title: {
                    [Op.substring]: `${query}`
                },
                active: 1
            }
        } else {
            options['where'] = {
                active: 1
            }
        }
        const products = await Products.findAll(options);
        const results = await Products.count(options);
        return {
            results,
            products
        };
    } catch (e) {
        throw new Error("Error al obtener ejecutar la funcion FindAll: " + e.message);
    }
}

async function findBySeller(id, limit, offset) {
    try {
        const options = {
            offset,
            limit,
            where: {
                users_id: id,
                active: true
            }
        }
        const products = await Products.findAll(options);
        const results = await Products.count(options);
        return {
            results,
            products
        };
    } catch (e) {
        throw new Error("Error al encontrar el producto por el vendedor: " + e.message);
    }
}

async function findByIds(ids) {
    try {
        const arrayID = ids.split(',');
        const options = {
            where: {
                product_id: arrayID,
                active: 1
            }
        }
        const products = await Products.findAll(options);
        const results = await Products.count(options);
        return {
            results,
            products
        };
    } catch (e) {
        throw new Error("Error al buscar productos por su ID");
    }
}

async function removeProductById(productId) {
    try {
        return await Products.update({
            active: 0
        }, {
            where: {
                product_id: productId
            }
        });
    } catch (e) {
        console.log("ERROR al hacer la consulta removeProductById: " + e.message);
        throw new Error("ERROR al hacer la consulta removeProductById: " + e.message)
    }
}


module.exports = {
    Product,
    findAll,
    findBySeller,
    findByIds,
    removeProductById
}