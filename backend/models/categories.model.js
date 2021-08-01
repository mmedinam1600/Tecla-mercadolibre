
const { sequelize, DataTypes } = require('../db/conexion');


const Categories = sequelize.define('Categories',{
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    name_category: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'user_id',
        }
    },
    active: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
    }
}, {
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

async function CreateDefaultCategories() {
    try {
        //await Categories.sync({ alter: true }); //Verifica el estado de la tabla y luego realiza los cambios para que coincida con el modelo
        let categories = await Categories.count();
        if (categories == 0) {
            const vehiculos = await Categories.create({ name_category: "Accesorios para Vehículos", users_id: 1,});
            const agro = await Categories.create({ name_category: "Agro", users_id: 1,});
            const alimentos = await Categories.create({ name_category: "Alimentos y Bebidas", users_id: 1,});
            const animales = await Categories.create({ name_category: "Animales y Mascotas", users_id: 1,});
            const colecciones = await Categories.create({ name_category: "Antigüedades y Colecciones", users_id: 1,});
            const arte = await Categories.create({ name_category: "Arte, Papelería y Mercería", users_id: 1,});
            const autos = await Categories.create({ name_category: "Autos, Motos y Otros", users_id: 1,});
            const belleza = await Categories.create({ name_category: "Belleza y Cuidado Personal", users_id: 1,});
            const camaras = await Categories.create({ name_category: "Cámaras y Accesorios", users_id: 1,});
            const celulares = await Categories.create({ name_category: "Celulares y Telefonía", users_id: 1,});
            const computacion = await Categories.create({ name_category: "Computación", users_id: 1,});
            const consolas = await Categories.create({ name_category: "Consolas y Videojuegos", users_id: 1,});
            const construccion = await Categories.create({ name_category: "Construcción", users_id: 1,});
            const deportes = await Categories.create({ name_category: "Deportes y Fitness", users_id: 1,});
            const electrodomesticos = await Categories.create({ name_category: "Electrodomésticos", users_id: 1,});
            const electronica = await Categories.create({ name_category: "Electrónica, Audio y Video", users_id: 1,});
            const herramientas = await Categories.create({ name_category: "Herramientas", users_id: 1,});
            const hogar = await Categories.create({ name_category: "Hogar, Muebles y Jardín", users_id: 1,});
            const industrias = await Categories.create({ name_category: "Industrias y Oficinas", users_id: 1,});
            const inmuebles = await Categories.create({ name_category: "Inmuebles", users_id: 1,});
            const instrumentos = await Categories.create({ name_category: "Instrumentos Musicales", users_id: 1,});
            const juegos = await Categories.create({ name_category: "Juegos y Juguetes", users_id: 1,});
            const libros = await Categories.create({ name_category: "Libros, Revistas y Comics", users_id: 1,});
            const musica = await Categories.create({ name_category: "Música, Películas y Series", users_id: 1,});
            const recuerdos = await Categories.create({ name_category: "Recuerdos, Cotillón y Fiestas", users_id: 1,});
            const ropa = await Categories.create({ name_category: "Ropa, Bolsas y Calzado", users_id: 1,});
            const salud = await Categories.create({ name_category: "Salud y Equipamiento Médico", users_id: 1,});
            const servicios = await Categories.create({ name_category: "Servicios", users_id: 1,});
            const otras = await Categories.create({ name_category: "Otras Categorías", users_id: 1,});
            console.log('Categorias default cargadas correctamente.');
        } else {
            console.log('Categorias existentes: ' + categories);
        }
    } catch (error) {
        console.log('Error en la creación de categorias ' + error);
    }
}

const findAll = async () => {
    try {
        const options = {
            where: {
                active: 1
            }
        }
        const categories = await Categories.findAll(options);
        const results = await Categories.count(options);
        return {
            results,
            categories
        };
    } catch (e) {
        throw new Error("Error al encontrar las categorias: " + e.message);
    }
}


module.exports = {
    CreateDefaultCategories,
    findAll
}