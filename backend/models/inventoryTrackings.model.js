
const { sequelize, DataTypes } = require('../db/conexion');

const InventoryTrackings = sequelize.define('InventoryTrackings',{
    action_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    type_action: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'product_id',
        }
    },
    users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'user_id',
        }
    }
}, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});
