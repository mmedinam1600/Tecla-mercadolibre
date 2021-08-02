const carritoDiv = document.getElementById('items');

const direccion = document.getElementById('dirección');

let directionError = false;

const desplegarDireccion = async () => {
    try {
        let idUsuario = document.getElementById('user_id');
        idUsuario = idUsuario.innerHTML;
        const direccionUser = await getData(`address/${idUsuario}`);
        console.log(direccionUser);
        if (direccionUser.error) {
            directionError = true;
            const cardDireccion = document.createElement('div');
            cardDireccion.innerHTML = `
            <p>No tiene registrada una dirección:</p>
            <div id="domicilios" class="pt-4">
                <a type="button" id="btAddDomicilio" class="btn btn-success" href="perfil.html#btAddDomicilio">Agregar una dirección</a>
            </div>
            `;
            direccion.appendChild(cardDireccion);
            return;
        }
        console.log(direccionUser);
        const cardDireccion = document.createElement('div');
        cardDireccion.innerHTML = `
        <p>Dirección:</p>
        <p>Estado: ${direccionUser.state}</p>
        <p>Alcaldía: ${direccionUser.city_hall}</p>
        <p>Colonia: ${direccionUser.colony}</p>
        <p>Calle: ${direccionUser.street}</p>
        <p>Numero ext: ${direccionUser.number} Número int: ${direccionUser.inner_number}</p>
        <p>Código postal: ${direccionUser.postal_code}</p>
        <p>Entre calles: ${direccionUser.street1} y ${direccionUser.street2} </p>
        <p>Telefono: ${direccionUser.mobile_number}</p>
        <p>Información adicional: ${direccionUser.additional_info}</p>
    `;
        direccion.appendChild(cardDireccion);
    } catch (e) {
        directionError = true;
        console.error(e.message);
    }
}

setTimeout(async () => {
    await desplegarDireccion();
}, 2000);

const hacerPago = () => {
    if (compra.obtenerProductosLocalStorage().length < 0) {
        alert("Debes agregar productos a tu carrito");
    } else if (document.getElementById('user_id') === null) {
        alert("Debes iniciar sesión.");
        location.href = "login.html";
    } else if (directionError === true) {
        alert("Debes configurar la dirección a tu cuenta");
    } else {
        location.href = "thankyou.html";
        compra.vaciarCarrito();
    }
}

const desplegarCarrito = async () => {
    const carrito = compra.obtenerProductosLocalStorage();
    if (carrito.length < 0) {
        //Decirle que el carrito esta vacio
        return;
    }
    let ids = "";
    carrito.forEach((producto) => {
        let itemHtml = `<li class="list-group-item d-flex justify-content-between lh-sm">
                            <div id="carrito_${producto.id}">
                                <h6 class="my-0">${producto.title}</h6>
                                <img src="${producto.thumbnail}" alt="imagen" style="min-width: 50px; max-width: 100px">
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
    if (items.length > 1) {
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