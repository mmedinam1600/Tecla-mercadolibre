/* De los argumentos de la URL obtenemos el valor del parámetro q */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get('q') || 'celulares';
const page = urlParams.get('page') || 1;

const baseURL = 'https://api.mercadolibre.com/sites/MLM/search?q=';
const numberOfResultsDiv = document.getElementById('numberOfResults');
const tarjetasDiv = document.getElementById('tarjetas');

const main = async() => {
    //if (query === null) return console.log('Hola mundo xd');
    const service = new MercadoService(baseURL, query);
    const request = await service.searchItems();
    console.log(request);
    renderResult(request);
}

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

let renderResult = (requestMercadoService) => {
    /* renderizamos el número de resultados */
    const results = document.createElement('h2');
    results.textContent = `${requestMercadoService.paging.total} resultados de ${query}`
    numberOfResultsDiv.appendChild(results);

    /* renderizamos lar tarjetas con los primeros 10 resultados (Dependiendo la página) */
    const maxPage = (page * 10);
    const minPage = (page * 10) - 10;
    for (let i = minPage; i < maxPage; i++) {
        if (requestMercadoService.results[i] === undefined) break;
        let { id, title, condition, price, thumbnail, permalink } = requestMercadoService.results[i];
        let card = `<div class="prod-info-main prod-wrap clearfix">
                      <div class="row">
                        <div class="card" id="${id}">
                          <img src="${thumbnail}" class="card-img-top" width="100px">
                          <div class="card-body">
                            <h5 class="card-title">
                              <a href="${permalink}">
                              ${id}/${title}
                              </a>
                            </h5>
                            <span>${condition}</span><br>
                            <span>Precio: ${price}</span>
                            <p>
                              <button id="${id}" class="btn btn-lg btn-primary" href="#" onclick="createCookie('${id}',1)">
                                Añadir a carrito
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>`
        let element = document.createElement('div');
        element.setAttribute('class', 'col-md-6');
        element.innerHTML = card;
        tarjetasDiv.appendChild(element);
    }
}

class MercadoService {
    constructor(baseURL, querySearch) {
        this.url = `${baseURL}${querySearch}`;
    }

    async searchItems() {
        let mercadoUrl = await fetch(this.url);
        return mercadoUrl.json();
    }
}

main();