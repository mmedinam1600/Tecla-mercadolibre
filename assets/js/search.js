/* De los argumentos de la URL obtenemos el valor del parámetro q */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get('q') || '';
const page = urlParams.get('page') || 1;
const limit = urlParams.get('limit') || 12;
const category = urlParams.get('category') || "";

//const baseURL = 'https://api.mercadolibre.com/sites/MLM/search?q=';
const URL = `http://localhost:3000/`;
const numberOfResultsDiv = document.getElementById('numberOfResults');
const tarjetasDiv = document.getElementById('tarjetas');

const main = async() => {
    const service = new MercadoService(`search?q=${query}&page=${page}&limit=${limit}&category=${category}`);
    const request = await service.searchItems();
    console.log(request);
    renderResult(request);
}


let renderResult = (requestMercadoService) => {
    /* renderizamos el número de resultados */
    const results = document.createElement('h1');
    results.setAttribute('class', 'display-4');
    results.textContent = `${requestMercadoService.total} resultados de ${query}`
    numberOfResultsDiv.appendChild(results);

    /* renderizamos lar tarjetas con los primeros 10 resultados (Dependiendo la página) */
    const maxPage = (page * limit);
    const minPage = (page * limit) - limit;
    for (let i = 0; i < requestMercadoService.products.length; i++) {
        if (requestMercadoService.products[i] === undefined) break;
        let { id, title, condition, price, thumbnail, permalink } = requestMercadoService.products[i];
        let card = `
            <div class="card" style="width: 100%">
                <img src="${thumbnail}" class="card-img-top" alt="${title}" style="max-height: 300px; min-height:300px ">
                <div class="card-header">
                    <b>$${price} MXN</b>
                </div>
                <div class="card-body">
                    <h5 class="card-title"><a href="${permalink}">${title}<span style="color: gray; font-size: 0.7rem"> (${id})</span></a> <span style="color: red; font-size: 0.7rem">${condition}</span></h5>
                    <form name="ShoppingList">
                        <label for="${id}" class="visually-hidden">Cantidad</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <input type="button" value="+" class="btn btn-primary me-1" onclick="addCart('${id}');"/>
                                <input type="button" value="-" class="btn btn-danger" onclick="removeCart('${id}','1');"/>
                            </div>
                            <input type="number" class="form-control" id="${id}" placeholder="Cantidad" value="1">
                        </div>
                    </form>
                </div>
            </div>
        `;
        let element = document.createElement('div');
        element.setAttribute('class', 'col-md-3 d-flex align-items-stretch my-3');
        element.innerHTML = card;
        tarjetasDiv.appendChild(element);
    }
}

class MercadoService {
    constructor(URI) {
        this.url = `${URL}${URI}`;
    }

    async searchItems() {
        let mercadoUrl = await fetch(this.url);
        return mercadoUrl.json();
    }
}

main();













/*


function createCookie(dataElement, cantidad) {
    let productoID = dataElement; //Obtiene una colecciónHTML y accedemos al elemento 1 console.log(dataElement);
    let contadorSum = parseInt(readCookie("contador"), 10) + 1;
    document.cookie = "contador=" + contadorSum
    document.cookie = "idProducto_" + contadorSum + "=" + productoID + "; max-age=3600; path=/";
    document.cookie = "cantidad_" + contadorSum + "=" + cantidad + "; max-age=3600; path=/";
    alert('Producto añadido');
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






 */