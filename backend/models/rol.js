const { sequelize, DataTypes } = require('../db/conexion');

const Rol = sequelize.define('Rol', {
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
        await Rol.sync({ alter: true }); //Verifica el estado de la tabla y luego realiza los cambios para que coincida con el modelo
        let roles = await Rol.count();
        if (roles == 0) {
            const user = await Rol.create({ name: "user" });
            const seller = await Rol.create({ name: "seller" });
            const administrator = await Rol.create({ name: "administrator" });
            console.log('Roles de usuario creados correctamente.');
        } else {
            console.log('Roles de usuario existentes: ' + roles);
        }
    } catch (error) {
        console.log('Error en la creación de roles ' + error);
    }
}

module.exports = {
    Rol,
    CreateTable,
    LoadingRoles
}