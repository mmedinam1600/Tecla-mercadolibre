const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('tecla_mercadolibre', null, null, {
    dialect: 'mssql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: {
        authentication: {
            type: 'default',
            options: {
                encrypt: true,
                userName: process.env.DB_USR,
                password: process.env.DB_PASS
            }
        },
    }
});


module.exports = {
    sequelize,
    DataTypes
}
