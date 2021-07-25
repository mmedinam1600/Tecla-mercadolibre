const { Sequelize, DataTypes, Model } = require('sequelize');
require('dotenv').config();
const config = require('../config/config.json');

console.log(process.env.DB_HOST);

const sequelize = new Sequelize(config.database.name, null, null, {
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
    DataTypes,
    Model
}