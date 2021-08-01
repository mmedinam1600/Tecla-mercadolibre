const { User, CreateUser, SearchUser, ListAllUsers, isAdmin, DeleteUser, UpdateUser } = require('../models/users.model');
const bcrypt = require('bcrypt'); //bcrypt para hashear contraseña

//Estos controladores son llamados desde las rutas de nuestra API

const UserCreate = async(data) => {
    try {
        let user = await new User(data);
        const create = await CreateUser(user);
        return create;
    } catch (error) {
        throw new Error('Error en controlador UserCreate: ' + error.message);
    }
}

const ListUsers = async() => {
    try {
        const listUser = await ListAllUsers();
        return listUser;
    } catch (error) {
        throw new Error('Error en controlador ListUsers: ' + error.message);
    }
}

const isAdminStatus = async(data) => {
    try {
        //console.log('dentro de funcion is Admin Status');
        //console.log(data);
        const levelUser = await isAdmin(data);
        return levelUser;
    } catch (error) {
        throw new Error(error);
    }
}

const checkUser = async(user) => {
    try {
        //El usuario existe en DB
        const userFromDB = await SearchUser(user);
        //La contraseña es correcta
        if (!bcrypt.compareSync(user.password + user.email, userFromDB.password)) {
            throw new Error('Usuario o contraseña incorrectos');
        }
        return userFromDB;
    } catch (error) {
        throw new Error('Error en controller checkUser: ' + error.message);
    }
}

const deleteUser = async(data) => {
    try {
        //console.log('Elimitar Usuario');
        //console.log(data);
        const resultado = await DeleteUser(data);
        //console.log(resultado);
        return resultado;
    } catch (error) {
        throw new Error(error);
    }
}

const Userupdate = async(data, change) => {
    try {
        //console.log('Update');
        //console.log(data);
        //console.log(change);
        const resultado = await UpdateUser(data, change);
        //console.log(resultado);
        return resultado;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    UserCreate,
    ListUsers,
    isAdminStatus,
    checkUser,
    deleteUser,
    Userupdate
}