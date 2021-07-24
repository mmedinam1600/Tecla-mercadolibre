const { sequelize, DataTypes } = require('../db/conexion');

const Rol = sequelize.define('Rol',{
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

async function CreateTable(){
    await Rol.sync(); //Crea la tabla con el modelo asignado si no existe
}

module.exports = {
    CreateTable
}
