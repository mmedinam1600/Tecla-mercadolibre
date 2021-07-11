const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const { firstUpdateCategoriesFromMercadoLibre } = require("./services/mercado.service");

const searchRoutes = require("./routes/search");
const categoryRoutes = require("./routes/category");
const productsRoutes = require("./routes/products");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
app.use('/search', searchRoutes); //Todas las rutas aqui tendran el prefijo /search
app.use('/category', categoryRoutes); //Todas las rutas aqui tendran el prefijo /category
app.use('/products', productsRoutes); //Todas las rutas aqui tendran el prefijo /products


// Llamado único para cargar las categorias de Mercado Libre
try {
    firstUpdateCategoriesFromMercadoLibre().then(() => {
        console.log(`Categorias cargadas en el arreglo`)
    });
} catch (e) {
    console.log(e.message);
}

/*
Las categorias de momento solo se crean o se borran.
GET /category - devuelve el array de categorias de la APP, suma de elementos de categorias de mercado libre + las de la APP
POST /category - Crear nueva categoria. Necesiario un id y un name.
DELETE /category - Borrar una categoria por su id.

Productos (index_app.js)
https://api.mercadolibre.com/sites/MLM/search?category=MLM1747
https://api.mercadolibre.com/sites/MLM/search?q=celular
NOTA: Solo se consultan los productos, no se instancian.
GET - /products - Devuelve la lista de productos
POST - /products - Agrega nuevos productos
DELETE - /products - Elimina productos por su id
PUT - /products - Edita un producto por su id

Tendencias (product_list.html)
GET - /trends - Devuelve la lista de tendencias de Mercado libre
GET - /trends/{categoryID} - Devuelve la lista de tendencias de Mercado libre (Solo id de mercado libre)

 */

app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${process.env.PORT}`);
});