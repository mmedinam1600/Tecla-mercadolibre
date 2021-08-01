
const carritoDiv = document.getElementById('items');

const desplegarCarrito = async() => {
    const carrito = compra.obtenerProductosLocalStorage();
    if(carrito.length < 0){
        //Decirle que el carrito esta vacio
        return;
    }
    let ids = "";
    carrito.forEach( (producto) => {
        let itemHtml = `<li class="list-group-item d-flex justify-content-between lh-sm">
                            <div id="carrito_${producto.id}">
                                <h6 class="my-0">${producto.title}</h6>
                                <img src="${producto.thumbnail}" alt="imagen">
                                <label for="cantidad">Cantidad: </label>
                                <input type="number" id="cantidad-${producto.id}" value="${producto.cantidad}" style="max-width: 55px" onchange="compra.actualizarCostos('${producto.id}')">
                                <span class="text-muted">Precio unitario $<span id="precio-producto-${producto.id}">${producto.price}</span></span>
                            </div>
                            <span id="costo-producto-${producto.id}" class="text-muted">$${(producto.price * producto.cantidad).toFixed(2)}</span>
                            <a href="#" class="fas fa-times-circle" onclick="borrarProducto('${producto.id}'); location.reload();" id="borrar-${producto.id}"></a>
                        </li>`
        let element = document.createElement('div');
        element.innerHTML = itemHtml;
        carritoDiv.appendChild(element);
    });
    compra.calcularTotal();
    document.getElementById('totalItems').innerHTML = `${carrito.length}`;
    //const productSearch = await getData(`products?id=${ids}`);
    //renderItems(productSearch);
}

desplegarCarrito();

const renderItems = (items) => {
    let i = 1;
    let total = 0;
    if(items.length > 1){
        document.getElementById('totalItems').innerHTML = items.length;
    }
    items.forEach(item => {
        const cantidad = parseInt(localStorage.getItem(item.id));
        total += item.price * cantidad;
        let itemHtml = `<li class="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                            <h6 class="my-0">${item.title}</h6>
                            <img src="${item.thumbnail}" alt="imagen">
                            <span>Cantidad: ${cantidad}</span>
                            <span class="text-muted">Precio unitario $${item.price}</span>
                            </div>
                            <span class="text-muted">$${item.price * cantidad}</span>
                        </li>`
        let element = document.createElement('div');
        element.innerHTML = itemHtml;
        carritoDiv.appendChild(element);
        i++;
    });

    let totalHtml = `<li class="list-group-item d-flex justify-content-between">
                        <span>Total (MXN)</span>
                        <strong>$${total}</strong>
                    </li>`
    let element = document.createElement('div');
    element.innerHTML = totalHtml;
    carritoDiv.appendChild(element);
    console.log(total);
}