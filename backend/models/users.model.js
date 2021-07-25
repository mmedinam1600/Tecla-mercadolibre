const { sequelize, DataTypes, Model } = require('../db/conexion');
const { Rols } = require('./rols.model');

const bcrypt = require('bcrypt'); //bcrypt para hashear contraseña
const saltRounds = 10; //rondas salt entre más hay más seguridad pero tarda más la respuesta

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
            model: Rols,
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

class User {
    constructor(data) {
        this.first_name = data.first_name,
            this.last_name = data.last_name,
            this.email = data.email,
            this.password = data.password
    }
}

async function CreateTableUsers() {
    await Users.sync();
}

async function SearchUser(data) {
    try {
        let userResultado = await Users.findOne({ where: { email: data.email } });
        if (userResultado) {
            let user = {
                user_id: userResultado.dataValues.user_id,
                first_name: userResultado.dataValues.first_name,
                last_name: userResultado.dataValues.last_name,
                email: userResultado.dataValues.email,
                password: userResultado.dataValues.encrypted_password,
                country_code: userResultado.dataValues.country_code,
                mobile_number: userResultado.dataValues.mobile_number,
                rol_id: userResultado.dataValues.rol_id,
                active: userResultado.dataValues.active,
            }
            return user;
        } else {
            throw new Error('El usuario no existe');
        }
    } catch (error) {
        throw new Error('Error en la función SearchUser: ' + error.message);
    }
}

async function ValidateUser(user) {
    try {
        let user_status = await Users.findOne({ where: { email: user.email } });
        //console.log(user_status);
        if (user_status == null) {
            return ({ message: 'Correo electrónico válido', status: true });
        } else {
            return ({ message: 'Correo electrónico en existencia', status: false });
        }
    } catch (error) {
        throw new Error('Error en la función ValidateUser: ' + error.message);
    }
}

async function CreateUser(user) {
    try {
        let userFind = await ValidateUser(user);
        if (userFind.status) {
            //Creación de usuario
            //Se une la pass con el email para una longitud más larga de caracteres y hacerla unica con ayuda del email
            let creacionStatus = await Users.create({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                encrypted_password: await bcrypt.hashSync(user.password + user.email, saltRounds)
            });
            return creacionStatus;
        } else {
            throw new Error('Error en la creación de usuario: ' + userFind.message);
        }
    } catch (error) {
        throw new Error('Error en la función CreateUser: ' + error.message);
    }
}

async function ListAllUsers() {
    try {
        let listUser = await Users.findAll();
        return listUser;
    } catch (error) {
        throw new Error('Error en la función ListAllUsers: ' + error.message);
    }
}

async function UpdateUser(data) {
    try {

    } catch (error) {

    }
}

async function DeleteUser(data) {
    try {
        let user_status = await Users.findOne({ where: { email: user.email } });
        user_status.active = 0;
        user_status.save();
        return user_status;
    } catch (error) {
        throw new Error('Error en la función DeleteUser: ' + error.message);
    }
}

async function isAdmin(data) {
    try {
        let user_status = await Users.findOne({ where: { email: data } });
        console.log(user_status.rol_id);
        if (user_status.rol_id == 3) {
            return ({ message: 'Usuario administrador', status: true });
        } else {
            return ({ message: 'Nivel de usuario no válido', status: false });;
        }
    } catch (error) {
        throw new Error('Error en la función isAdmin: ' + error.message);
    }
}

module.exports = {
    User,
    CreateTableUsers,
    ValidateUser,
    CreateUser,
    ListAllUsers,
    isAdmin,
    DeleteUser,
    UpdateUser,
    SearchUser
}