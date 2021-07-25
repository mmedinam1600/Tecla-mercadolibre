const { CreateUser, SearchUser, ListAllUsers } = require('../models/users.model');

const UserCreate = async(data) => {
    try {
        let user = { email: data.email, first_name: data.first_name, last_name: data.last_name, password: data.password };
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

module.exports = {
    UserCreate,
    ListUsers
}