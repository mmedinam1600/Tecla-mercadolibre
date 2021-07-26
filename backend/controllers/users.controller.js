const { User, CreateUser, SearchUser, ListAllUsers, isAdmin, DeleteUser, UpdateUser } = require('../models/users.model');
const bcrypt = require('bcrypt'); //bcrypt para hashear contraseña

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

module.exports = {
    UserCreate,
    ListUsers,
    isAdminStatus,
    checkUser
}