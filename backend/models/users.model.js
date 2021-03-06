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
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.email = data.email;
        this.password = data.password;
    }
}

async function CreateTableUsers() {
    await Users.sync();
}

async function LoadingOneAdmin() {
    try {
        await Users.sync(); //Crea la tabla si no existe y si existe no hace nada
        let userAdmin = await Users.count({ where: { rol_id: 3 } });
        if (userAdmin == 0) {
            const administrator = await Users.create({
                first_name: 'Admin',
                last_name: 'System',
                email: 'admin@system.com',
                rol_id: 3,
                encrypted_password: await bcrypt.hashSync('password123' + 'admin@system.com', saltRounds)
            });
            console.log('Usuario administrador inicial creado de forma correcta: pass:password123, email: admin@system.com');
        } else {
            console.log('Ya existen ' + userAdmin + ' usuarios administradores, no es necesario uno extra.');
        }
    } catch (error) {
        console.log('Error en la creación de usuario Administrador Inicial: ' + error);
    }
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
        let listUser = await Users.findAll({ where: { active: 1 } });
        return listUser;
    } catch (error) {
        throw new Error('Error en la función ListAllUsers: ' + error.message);
    }
}

async function UpdateUser(data, change) {
    try {
        let user_status = await Users.update({
            first_name: change.first_name,
            last_name: change.last_name,
            rol_id: change.rol,
        }, {
            where: {
                user_id: data
            }
        });
        return user_status;
    } catch (error) {
        throw new Error('Error en la función UpdateUser: ' + error.message);
    }
}

async function DeleteUser(data) {
    try {
        //console.log('dentro de DeleteUser modelo');
        //console.log(data);
        let user_status = await Users.update({
            active: 0,
            email: '' //Se manda el email a cero porque no hay solicitud de reactivación por el momento
        }, {
            where: {
                user_id: data
            }
        });
        return user_status;
    } catch (error) {
        throw new Error('Error en la función DeleteUser: ' + error.message);
    }
}

async function isAdmin(data) {
    try {
        //console.log('dentro de funcion is Admin');
        //console.log(data);
        let user_status = await Users.findOne({ where: { email: data } });
        //console.log(user_status.rol_id);
        if (user_status.rol_id == 3) {
            return ({ message: 'Usuario administrador', status: true });
        } else {
            throw new Error('Nivel de usuario no válido');
        }
    } catch (error) {
        throw new Error('Error en la función isAdmin: ' + error.message);
    }
}

async function userProfile(id) {
    try {
        let user = {};
        let user_get = await sequelize.query(`SELECT Users.*, AddressUsers.*, Addresses.* FROM Users FULL OUTER JOIN AddressUsers ON AddressUsers.user_id = Users.user_id  INNER JOIN Addresses ON  AddressUsers.address_id = Addresses.address_id WHERE AddressUsers.active = 1 AND Users.user_id=${id}`);
        if (!user_get[0].length) {
            console.log('UserProfile')
            user_get = await Users.findByPk(id);
            user = {
                user_id: user_get.dataValues.user_id,
                first_name: user_get.dataValues.first_name,
                last_name: user_get.dataValues.last_name,
                email: user_get.dataValues.email,
                country_code: user_get.dataValues.country_code,
                mobile_number: user_get.dataValues.mobile_number,
                domicilios: []
            }
        } else {
            user = {
                user_id: user_get[0][0].user_id,
                first_name: user_get[0][0].first_name,
                last_name: user_get[0][0].last_name,
                email: user_get[0][0].email,
                country_code: user_get[0][0].country_code,
                mobile_number: user_get[0][0].mobile_number,
                domicilios: []
            }

            const domicilios_user = [];
            for (let index = 0; index < user_get[0].length; index++) {
                const direccion = user_get[0][index];
                domicilios_user.push({
                    relacion_id: direccion.id,
                    fullname: direccion.fullname,
                    postal_code: direccion.postal_code,
                    state: direccion.state,
                    city_hall: direccion.city_hall,
                    colony: direccion.colony,
                    street: direccion.street,
                    number: direccion.number,
                    inner_number: direccion.inner_number,
                    street1: direccion.street1,
                    street2: direccion.street2,
                    mobile_number: direccion.mobile_number,
                    additional_info: direccion.additional_info,
                    postal_code: direccion.postal_code,
                });
            }
            user.domicilios = domicilios_user;
        }
        return user;
    } catch (error) {
        throw new Error('Error en la función userProfile: ' + error.message);
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
    SearchUser,
    LoadingOneAdmin,
    userProfile
}