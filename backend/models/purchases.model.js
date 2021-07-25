
const { sequelize, DataTypes } = require('../db/conexion');

const Purchases = sequelize.define('Purchases',{
    id_purchase: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'user_id',
        }
    },
    items: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status_purchase: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
}, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});