

class Carrito {

    constructor() {
        this.contador = 0
    }

    async agregarAlCarrito(productID) {
        //const cantidad = obtenerCantidad(productID);
        const cantidad = 1;
        const productos = await getProductByID(productID);
        let carrito = this.obtenerProductosLocalStorage();
        const producto = {
            id: productID,
            thumbnail: productos[0].thumbnail,
            title: productos[0].title,
            price: productos[0].price || productos[0].unit_price,
            cantidad,
            isML: productID.startsWith('MLM')
        };

        carrito.forEach( (productoLS) => {
            if(productoLS.id === producto.id){
                carrito = productoLS.id;
            }
        });

        if(carrito === producto.id){
            alert("El producto ya esta en el carrito");
        } else {
            this.insertarCarrito(producto);
            alert("Se agrego el producto al carrito");
        }
    }

    eliminarDelCarrito(productID) {
        let producto = document.getElementById(`carrito_${productID}`);
        while(producto.firstChild){
            producto.removeChild(producto.firstChild);
        }
        producto.remove();
        this.contador--;
        this.actualizarNumeroDeCarrito(this.contador);
        this.eliminarProductoLocalStorage(productID);
        alert("Se removio el producto del carrito");
    }

    eliminarProductoLocalStorage(productID){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productID){
                productosLS.splice(index, 1);
            }
        });
        localStorage.setItem('carrito', JSON.stringify(productosLS));
    }

    obtenerProductosLocalStorage() {
        return (localStorage.getItem('carrito') === null) ?
            [] :
            JSON.parse(localStorage.getItem('carrito'));
    }

    insertarCarrito(producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.thumbnail}" alt="${producto.title}" style="max-height: 50px; min-width: 50px">
            </td>
            <td>${producto.title}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.price}</td>
            <td>
                <a href="#" class="fas fa-times-circle" onclick="borrarProducto('${producto.id}')" id="borrar-${producto.id}"></a>
            </td>
        `;
        row.id = `carrito_${producto.id}`
        const listaProductosCarrito = document.querySelector('#items_carrito_nav tbody');
        listaProductosCarrito.appendChild(row);
        this.contador++;
        this.guardarProductosLocalStorage(producto);
        this.actualizarNumeroDeCarrito(this.contador);
    }

    actualizarNumeroDeCarrito(valor) {
        const numero = document.getElementById('items_nav');
        numero.innerHTML = valor;
    }

    guardarProductosLocalStorage(producto) {
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('carrito', JSON.stringify(productos))
    }

    vaciarLocalStorage() {
        localStorage.removeItem('carrito');
    }

    vaciarCarrito() {
        const listaProductosCarrito = document.querySelector('#items_carrito_nav tbody');
        while(listaProductosCarrito.firstChild){
            listaProductosCarrito.removeChild(listaProductosCarrito.firstChild);
        }
        this.vaciarLocalStorage();
        this.contador = 0;
        this.actualizarNumeroDeCarrito(this.contador);
        return false;
    }

    calcularTotal(){
        let productosLS;
        let total = 0, igv = 0, subtotal = 0;
        productosLS = this.obtenerProductosLocalStorage();
        for(let i = 0; i < productosLS.length; i++){
            let element = Number(productosLS[i].price * productosLS[i].cantidad);
            total = total + element;
        }

        igv = parseFloat(total * 0.18).toFixed(2);
        subtotal = parseFloat(total-igv).toFixed(2);

        document.getElementById('precio_total').innerHTML = `Total: ${total.toFixed(2)}`;

        //document.getElementById('subtotal').innerHTML = "S/. " + subtotal;
        //document.getElementById('igv').innerHTML = "S/. " + igv;
        //document.getElementById('total').value = "S/. " + total.toFixed(2);
    }

    leerLocalStorage () {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            //Construir plantilla
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>
                <img src="${producto.thumbnail}" alt="${producto.title}" style="max-height: 50px; min-width: 50px">
            </td>
            <td>${producto.title}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.price}</td>
            <td>
                <a href="#" class="fas fa-times-circle" onclick="borrarProducto('${producto.id}'); location.reload();" id="borrar-${producto.id}"></a>
            </td>
            `;
            row.id = `carrito_${producto.id}`
            const listaProductosCarrito = document.querySelector('#items_carrito_nav tbody');
            listaProductosCarrito.appendChild(row);
        });
        this.contador = productosLS.length;
        this.actualizarNumeroDeCarrito(this.contador);
    }

    actualizarCostos(productID) {
        const cantidad = document.getElementById(`cantidad-${productID}`).value
        const costo = document.getElementById(`precio-producto-${productID}`).innerHTML;

        const totalProducto = document.getElementById(`costo-producto-${productID}`);
        totalProducto.innerHTML = `$${(cantidad * costo).toFixed(2)}`;

        const carrito = compra.obtenerProductosLocalStorage();
        carrito.forEach( producto => {
            if(producto.id === productID){
                producto.cantidad = cantidad;
            }
        });
        localStorage.setItem('carrito', JSON.stringify(carrito));
        compra.calcularTotal();

    }

}


const compra = new Carrito();

console.log(compra.obtenerProductosLocalStorage());


if(!CheckBrowser()){
    alert("Tu navegador no soporta nuestro carrito de compras");
}

/*
const updateCart = async () => {
    if(localStorage.getItem('carrito') === null){
        localStorage.setItem('carrito', '[]');
    }
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    if(carrito === null || carrito.length === 0) {
        document.getElementById('noItems').style.display = "block";
        return;
    }
    refreshCart(carrito);
    document.getElementById('noItems').style.display = "none";
}*/

//updateCart();


const obtenerCantidad = (ProductID) => {
    const cantidad = parseInt(document.getElementById(ProductID).value);
    if( isNaN(cantidad) || cantidad <= 0) alert("El número de productos a agregar es inválido");
    return cantidad;
}

const getProductByID = async (ProductID) => {
    if(ProductID.startsWith('MLM')){
        return getData(`products?id=${ProductID}`);
    }
    const data = await getData(`products/ours?product_id=${ProductID}`);
    return data.products;
}



/*
const refreshCart = (carrito) => {
    if(carrito.length > 0) {
        const nav_carrito = document.getElementById('items_carrito_nav');
        nav_carrito.innerHTML = "";
        let total = 0;
        carrito.forEach( (producto) => {
            const lista = document.createElement('li');
            lista.innerHTML = `
            <div> 
                <img src="${producto.thumbnail}" alt="${producto.title}" style="max-height: 50px; min-width: 50px"/>
                <span>Cant: ${producto.cantidad} $${producto.price} = ${producto.cantidad * producto.price}</span>
            </div>`;
            total += producto.cantidad * producto.price;
            nav_carrito.appendChild(lista);
        });
        document.getElementById("total_nav").innerHTML = `Total: ${total}`;
    }
    document.getElementById('items_nav').innerHTML = `${carrito.length}`;
}
 */

/*
const removeCart = (idProducto) => {
    const cantidad = document.getElementById(idProducto).value;
    if( isNaN(cantidad) || cantidad <= 0) return alert("El número de productos a remover es inválido");
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    if(carrito !== null){
        const ifExist = carrito.find( (product, index) => {
            if(product.id === idProducto){ //Si ya existe el producto actualzar la cantidad
                product.cantidad -= cantidad;
                alert("Producto actualizado");
                if(product.cantidad <= 0){
                    carrito.splice(index, 1);
                }
            }
            return product.id === idProducto;
        });
        if(!ifExist) alert("No tienes este artículo en tu carrito.");
        localStorage.setItem('carrito', JSON.stringify(carrito));
    } else {
        document.getElementById('noItems').style.display = "block";
        alert("Tu carrito esta vacio");
    }
    if(carrito.length === 0) document.getElementById('noItems').style.display = "block";
}
 */

const clearCart = () => {
    localStorage.removeItem('carrito');
}

function CheckBrowser() {
    return 'localStorage' in window && window['localStorage'] !== null;
}

async function addToCart(ProductID) {
    await compra.agregarAlCarrito(ProductID);
}

function vaciarCarrito() {
    compra.vaciarCarrito();
}

function borrarProducto(ProductID){
    compra.eliminarDelCarrito(ProductID);
}

function loadCart() {
    setTimeout( () => {
        compra.leerLocalStorage();
    },400)
}

loadCart();
