const { sequelize, DataTypes } = require('../db/conexion');

const Rols = sequelize.define('Rols', {
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
}, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

async function CreateTable() {
    await Rol.sync(); //Crea la tabla con el modelo asignado si no existe
}

async function LoadingRoles() {
    try {
        await Rols.sync({ alter: true }); //Verifica el estado de la tabla y luego realiza los cambios para que coincida con el modelo
        let roles = await Rols.count();
        if (roles == 0) {
            const user = await Rols.create({ name: "user" });
            const seller = await Rols.create({ name: "seller" });
            const administrator = await Rols.create({ name: "administrator" });
            console.log('Roles de usuario creados correctamente.');
        } else {
            console.log('Roles de usuario existentes: ' + roles);
        }
    } catch (error) {
        console.log('Error en la creación de roles ' + error);
    }
}

module.exports = {
    Rols,
    CreateTable,
    LoadingRoles,
}