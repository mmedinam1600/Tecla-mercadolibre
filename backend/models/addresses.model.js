const { sequelize, DataTypes } = require('../db/conexion');

const Addresses = sequelize.define('Addresses', {
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    fullname: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    postal_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    city_hall: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    colony: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    street: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    number: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    inner_number: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    street1: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    street2: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    is_office: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    mobile_number: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    additional_info: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

async function CreateAdress(address) {
    try {
        //console.log('Dentro de createAddress');
        //console.log(address);
        //Creación de Dirección
        let creacionStatus = await Addresses.create({
            fullname: address.fullname,
            postal_code: address.postal_code,
            state: address.state,
            city_hall: address.city_hall,
            colony: address.colony,
            street: address.street,
            number: address.number,
            inner_number: address.inner_number,
            street1: address.street1,
            street2: address.street2,
            mobile_number: address.mobile_number,
            additional_info: address.additional_info,
            is_office: 0
        });

        return creacionStatus;
    } catch (error) {
        throw new Error('Error en la función CreateAdress: ' + error.message);
    }
}

async function getAddress(addressID) {
    let address = await Addresses.findAll({
        where: {
            address_id: addressID
        }
    });
    return address;
}

module.exports = {
    CreateAdress,
    getAddress
}