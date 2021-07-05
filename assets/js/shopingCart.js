/* 
CUANDO QUITO LOS PRODUCTOS DE PRUEBA HAY ERRORES
SEGUN YO ES POR EL CONTADOR, EN EL INDEX_APP
DEFINI UNA COOKIE DE NOMBRE contador ESA COOKIE SE DEBERA TRAER PARA QUE LISTE LOS PRODUCTOS 
EN EL CARRITO DE FORMA CORRECTA
*/

/*
document.cookie = "idProducto_0=MLM908140304; max-age=3600; path=/";
document.cookie = "idProducto_1=MLM929354154; max-age=3600; path=/";
document.cookie = "idProducto_2=MLM921994310; max-age=3600; path=/";
document.cookie = "idProducto_3=MLM940356481; max-age=3600; path=/";

document.cookie = "cantidad_0=1; max-age=3600; path=/";
document.cookie = "cantidad_1=1; max-age=3600; path=/";
document.cookie = "cantidad_2=1; max-age=3600; path=/";
document.cookie = "cantidad_3=4; max-age=3600; path=/";
 */


const cookies = document.cookie;

const url = 'https://api.mercadolibre.com/items?ids=';

const carritoDiv = document.getElementById('items');


class MercadoService {
    constructor(baseURL, idSearch) {
        this.url = `${baseURL}${idSearch}`;
    }

    async searchItems() {
        let mercadoUrl = await fetch(this.url);
        return mercadoUrl.json();
    }
}

function readCookie(name) {
    var nameCookie = name + "=";
    var arrCookie = document.cookie.split(';');
    for (var i = 0; i < arrCookie.length; i++) {
        var c = arrCookie[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameCookie) == 0) {
            return decodeURIComponent(c.substring(nameCookie.length, c.length));
        }
    }
    return null;
}

const getCartFromCookies = () => {
    let id;
    let idString = "";
    //Buscamos en las cookies los primeros 10 articulos en el carrito
    for (let i = 1; i < 10; i++) {
        id = readCookie(`idProducto_${i}`);
        if (!id) continue; //Si no existe un articulo con esa id continuamos a la siguiente
        idString += `${id},`
    }
    let item = new MercadoService(url, idString);
    item.searchItems()
        .then((items) => {
            document.getElementById('totalItems').innerHTML = items.length || '0';
            renderItems(items);
        });
}

const renderItems = (items) => {
    let i = 1;
    let total = 0;
    items.forEach(item => {
        let cantidad = readCookie(`cantidad_${i}`);
        total += item.body.price * cantidad;
        let itemHtml = `<li class="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                            <h6 class="my-0">${item.body.title}</h6>
                            <img src="${item.body.thumbnail}" alt="imagen">
                            <span>Cantidad: ${cantidad}</span>
                            </div>
                            <span class="text-muted">$${item.body.price * cantidad}</span>
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


//var miCookie = readCookie( "cookie1" );

//console.log(miCookie);

getCartFromCookies();