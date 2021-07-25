
const { sequelize, DataTypes } = require('../db/conexion');

const Addresses = sequelize.define('Addresses',{
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    fullname: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    postal_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    city_hall: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    colony: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    street: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    number: {
        type: DataTypes.SMALLINT,
        allowNull: true,
    },
    inner_number: {
        type: DataTypes.SMALLINT,
        allowNull: true,
    },
    street1: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    street2: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    is_office: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    mobile_number: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    additional_info: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});