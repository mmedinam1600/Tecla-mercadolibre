
const { sequelize, DataTypes } = require('../db/conexion');


const AddressUsers = sequelize.define('AddressUsers',{
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
