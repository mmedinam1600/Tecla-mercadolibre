const { sequelize, DataTypes, Model } = require('../db/conexion');
//const { Rol } = require('./rol');

class Users extends Model {}

Users.init({
    //Atributos del modelo
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(320),
        allowNull: false
    },
    encrypted_password: {
        //STRING de 255 por default
        type: DataTypes.STRING,
        allowNull: false
    },
    country_code: {
        type: DataTypes.SMALLINT,
    },
    mobile_number: {
        type: DataTypes.STRING(10),
    },
    rol_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        references: {
            // Modelo de referencia
            model: 'Rols',
            // Nombre de la columna de referencia
            key: 'rol_id',
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
}, {
    // Otras opciones del modelo
    sequelize, // Es necesario pasar la conexión como parametro
    modelName: 'Users', // Escoger el nombre del modelo
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});