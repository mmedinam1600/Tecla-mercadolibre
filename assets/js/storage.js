
if(!CheckBrowser()){
    alert("Tu navegador no soporta nuestro carrito de compras");
}

const addCart = (idProducto) => {
    console.log(document.getElementById(idProducto))
    const cantidad = parseInt(document.getElementById(idProducto).value);
    console.log(cantidad);
    if( isNaN(cantidad) || cantidad <= 0) return alert("El número de productos a agregar es inválido");
    if(existProduct(idProducto)){
        const cantidadAnterior = parseInt(localStorage.getItem(idProducto));
        const cantidadNueva = cantidadAnterior + cantidad;
        localStorage.setItem(idProducto, cantidadNueva.toString());
        return alert("Producto actualizado");
    }
    localStorage.setItem(idProducto, cantidad.toString());
    return alert("Producto agregado al carrito");
}

const removeCart = (idProducto) => {
    const cantidad = document.getElementById(idProducto).value;
    if( isNaN(cantidad) || cantidad <= 0) return alert("El número de productos a remover es inválido");
    if(existProduct(idProducto)){
        const cantidadAnterior = parseInt(localStorage.getItem(idProducto));
        const cantidadNueva = cantidadAnterior - parseInt(cantidad);
        if(cantidadNueva <= 0){
            localStorage.removeItem(idProducto);
        } else{
            localStorage.setItem(idProducto, cantidadNueva.toString());
        }
        return alert("Producto actualizado");
    }
    return alert("No tienes este articulo en el carrito");
}

const clearCart = () => {
    localStorage.clear();
}

function CheckBrowser() {
    return 'localStorage' in window && window['localStorage'] !== null;
}

const existProduct = (idProducto) => {
    return !!localStorage.getItem(idProducto);
};
