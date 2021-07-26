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
