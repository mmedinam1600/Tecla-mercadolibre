const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');


const { getCategories, getProductsByIds, searchProducts, getProductsByCategory } = require("./services/mercado.service");
const { getCategoriesApp } = require("./services/category.service");
const { validateId, validateSearch,  } = require('./middleware/index');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



// Llamado único para cargar las categorias de Mercado Libre
try {
    getCategories().then(() => {
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

app.get('/category', async (req, res) => {
    try {
        const categories = await getCategoriesApp();
        res.status(200).json(categories);
    } catch (e) {
        console.error(`Error al traer las categorias: ${e.message}`);
        res.status(404).json({
            message: "Error 404"
        });
        throw new Error(`Error al traer las categorias: ${e.message}`);
    }
});

app.get('/products', validateId, async (req, res) => {
    try {
        const { id } = req.query; //Obtenemos las ids que nos manden por parametros
        const products = await getProductsByIds(id); //Obtenemos un arreglo de productos encontrados
        res.status(200).json(products); //Devolvemos este arreglo y una respuesta exitosa
    } catch (e){
        console.error(`Ocurrio un error al procesar la ruta GET /products Error: ${e.message}`);
        res.status(400).json({ 'error': `${e.message}` }); // El servidor no entendio su petición y devolvemos un mensaje de error
        throw new Error(`Ocurrio un error al procesar la ruta GET /products. Error: ${e.message}`);
    }
});

//Validar que page sea un numero al igual que limit (limit solo puede ser 50)
app.get('/search', validateSearch, async (req, res) => {
    try{
        const { q, page = 1, limit = 10, category = "" } = req.query;
        const products = await searchProducts(q, page, limit, category);
        res.status(200).json({products});
    } catch (e) {
        console.error(`Ocurrio un error al procesar la ruta GET /search Error: ${e.message}`);
        res.status(400).json({ 'error': `${e.message}`});
        throw new Error(`Ocurrio un error al procesar la ruta GET /search. Error: ${e.message}`);
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${process.env.PORT}`);
});