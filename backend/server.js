const express = require('express'),
    cors = require('cors'),
    rateLimit = require("express-rate-limit"),
    helmet = require("helmet"),
    logger = require('morgan'),
    path = require('path'),
    { sequelize } = require('./db/conexion'),
    { limiter } = require('./middleware/midd.limiter');
require('dotenv').config();

// GLOBAL APP
const app = express();

// MIDDLEWARES GLOBALES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(logger('dev'));

// ROUTES
const searchRoutes = require("./routes/search");
const categoryRoutes = require("./routes/category");
const productsRoutes = require("./routes/products");
const trendsRoutes = require("./routes/trends");
const userRoutes = require("./routes/users");
const adressRoutes = require("./routes/adresses");

app.use('/search', searchRoutes); //Todas las rutas aqui tendran el prefijo /search
app.use('/category', categoryRoutes); //Todas las rutas aqui tendran el prefijo /category
app.use('/products', productsRoutes); //Todas las rutas aqui tendran el prefijo /products
app.use('/trends', trendsRoutes); //Todas las rutas aqui tendran el prefijo /trends
app.use('/user', userRoutes); //Todas las rutas aqui tendran el prefijo /user
app.use('/address', adressRoutes); //Todas las rutas aqui tendran el prefijo /address

const { createModels } = require('./db/createModels');

//--------------Public------------------\\
app.use(express.static(path.join(__dirname, 'public')));
//---------------------------------------\\

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Conexión EXITOSA.');

        const server = app.listen(process.env.PORT || 3001, () => {
            console.log(`Servidor iniciado en http://localhost:${server.address().port}`);
        });

        await createModels();

        //const { firstUpdateCategoriesFromMercadoLibre } = require("./services/mercado.service");
        //await firstUpdateCategoriesFromMercadoLibre();
    } catch (e) {
        console.error('ERROR al iniciar el servidor: \n' + e);
        console.log('No se pudo iniciar correctamente\n' + e.message);
    }
}

startServer();