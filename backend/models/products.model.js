
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

async function CreateTable(){
    await Products.sync(); //Crea la tabla con el modelo asignado si no existe
}



module.exports = {
    CreateTable
}