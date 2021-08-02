const { sequelize, DataTypes } = require('../db/conexion');


const AddressUsers = sequelize.define('AddressUsers', {
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            // Modelo de referencia
            model: 'Addresses',
            // Nombre de la columna de referencia
            key: 'address_id',
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            // Modelo de referencia
            model: 'Users',
            // Nombre de la columna de referencia
            key: 'user_id',
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

async function CreateAddressUser(address, user) {
    try {
        //Asociar
        let creacionStatus = await AddressUsers.create({
            address_id: address,
            user_id: user,
            active: 1
        });
        return creacionStatus;
    } catch (error) {
        throw new Error('Error en la función CreateAddressUser: ' + error.message);
    }
}

module.exports = {
    CreateAddressUser,
}