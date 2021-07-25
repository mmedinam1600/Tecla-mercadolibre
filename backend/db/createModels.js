
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../db/conexion');
const { LoadingRoles } = require('../models/rols.model');
const { CreateDefaultUsers } = require('../models/users.model');
const { CreateDefaultCategories } = require('../models/categories.model');

async function createModels() {
    console.log("**************************************************");
    console.log("CARGANDO MODELOS...");
    console.log("**************************************************");
    const ruta = path.resolve() + "\\backend\\models";
    const modelFiles = fs.readdirSync(ruta).filter( (file) => file.endsWith('.model.js'));
    for (const file of modelFiles) {
        try {
            const model = require(`../models/${file}`);
            //await model.CreateTable();
            console.log(`Modelo ${file} cargado correctamente`);
        } catch (e) {
            console.error(`ERROR al cargar el modelo ${file}`);
            throw new Error(`Error al cargar el modelo ${file}`);
        }
    }
    console.log("--------------------------------------------------");
    //Una vez cargado los modelos, se crean los modelos en la base de datos
    try {
        console.log("**************************************************");
        console.log("GENERANDO MODELOS...");
        console.log("**************************************************");
        await sequelize.sync( );
        console.log("--------------------------------------------------");
        console.log("**************************************************");
        console.log("CARGANDO ROLES...");
        console.log("**************************************************");
        await LoadingRoles();
        await CreateDefaultUsers();
        await CreateDefaultCategories();
        console.log("--------------------------------------------------");
    } catch (e) {
        throw new Error("Error al generar los modelos en la base de datos. ERROR: " + e.message);
    }
}

module.exports = {
    createModels
}