const { sequelize, DataTypes, Model } = require('../db/conexion');
const { Rol } = require('./rol');

const bcrypt = require('bcrypt'); //bcrypt para hashear contraseña
const saltRounds = 10; //No de bits aleatorios entre más hay más seguridad pero tarda más la respuesta

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
            model: Rol,
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

async function CreateTableUsers() {
    await Users.sync();
}

async function SearchUser(user) {
    try {
        let user_status = await Users.findOne({ where: { email: user.email } });
        //console.log(user_status);
        if (user_status == null) {
            return ({ message: 'Correo electrónico válido', status: true });
        } else {
            return ({ message: 'Correo electrónico en existencia', status: false });;
        }
    } catch (error) {
        throw new Error('Error en la función SearchUser: ' + error.message);
    }
}

async function CreateUser(user) {
    try {
        console.log(user);
        console.log(user.password + user.email);
        let userFind = await SearchUser(user);
        console.log('estatus user find');
        console.log(userFind.status);
        if (userFind.status) {
            //Creación de usuario
            //Se une la pass con el email para una longitud más larga de caracteres y hacerla unica con ayuda del email
            let creacionStatus = await Users.create({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                encrypted_password: await bcrypt.hashSync(user.password + user.email, saltRounds)
            });
            console.log(creacionStatus);
            return creacionStatus;
        } else {
            throw new Error('Error en la creación de usuario: ' + userFind.message);
        }
    } catch (error) {
        console.log(error.message);
        throw new Error('Error en la función CreateUser: ' + error.message);
    }
}

module.exports = {
    CreateTableUsers,
    SearchUser,
    CreateUser
}