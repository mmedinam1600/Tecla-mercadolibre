const { CreateAdress } = require('../models/addresses.model');
const { CreateAddressUser } = require('../models/addressUsers.model');

//Estos controladores son llamados desde las rutas de nuestra API

const AddressCreate = async(data, user) => {
    try {
        //console.log('dentro de AddresCreate')
        //console.log(data)
        let address = await CreateAdress(data);
        let addressUser = await CreateAddressUser(address.dataValues.address_id, user);
        return addressUser;
    } catch (error) {
        throw new Error('Error en controlador AddressCreate: ' + error.message);
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
    AddressCreate,
}