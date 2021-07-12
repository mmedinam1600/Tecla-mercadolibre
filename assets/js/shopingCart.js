const URL = 'http://localhost:3000/';

const carritoDiv = document.getElementById('items');


class MercadoService {
    constructor(URI) {
        this.url = `${URL}${URI}`;
    }

    async searchItems() {
        let mercadoUrl = await fetch(this.url);
        return mercadoUrl.json();
    }
}


const desplegarCarrito = async() => {
    const carrito = Object.entries(localStorage)
    if(carrito.length < 0){
        //Decirle que el carrito esta vacio
        return;
    }
    let ids = "";
    carrito.forEach( (array) => {
        ids = ids + array[0] + ",";
    });
    const productSearch = new MercadoService(`products?id=${ids}`);
    const data = await productSearch.searchItems();
    renderItems(data);
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