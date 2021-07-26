
const verifyProduct = (req, res, next) => {
    try{
        const { title, thumbnail, unit_price, condition, quantity_stock, category_id } = req.body;
        let error = {};
        console.log(condition, title, unit_price);
        if(title.length < 2 || title.length > 256) error['title'] = "El título debe tener una longitud de 2 a 255 caracteres";
        if(thumbnail.length < 2 || thumbnail.length > 256) error['thumbnail'] = "El link de la imagen debe tener una longitud de 2 a 255 catacteres";
        if(isNaN(unit_price) || unit_price <= 0) error['unit_price'] = "El precio por unidad debe ser un número mayor a 0";
        if( !(condition === "Nuevo" || condition === "Usado") ) error['condition'] = "La condicion del producto no es correcta.";
        if(isNaN(unit_price) || quantity_stock < 0) error['quantity_stock'] = "La cantidad de stock debe un número mayor a 0";
        if(isNaN(category_id)) error['category_id'] = "La categoría debe ser un número";

        if( Object.keys(error).length > 0){
            res.status(400).json(error);
        } else {
            next();
        }
    } catch (e) {

    }
}

module.exports = {
    verifyProduct
}