/* De los argumentos de la URL obtenemos el valor del parámetro q */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get('q') || 'celulares';
const page = urlParams.get('page') || 1;

const baseURL = 'https://api.mercadolibre.com/sites/MLM/search?q=';
const numberOfResultsDiv = document.getElementById('numberOfResults');
const tarjetasDiv = document.getElementById('tarjetas');

const main = async () =>{
  if(query === null) return console.log('Hola mundo xd');
  const service = new MercadoService(baseURL, query);
  const request = await service.searchItems();
  console.log(request);
  renderResult(request);
}

let renderResult = (requestMercadoService) =>{
  /* renderizamos el número de resultados */
  const results = document.createElement('h2');
  results.textContent = `${requestMercadoService.paging.total} resultados de ${query}`
  numberOfResultsDiv.appendChild(results);

  /* renderizamos lar tarjetas con los primeros 10 resultados (Dependiendo la página) */
  const maxPage = (page*10);
  const minPage = (page*10)-10;
  for(let i = minPage ; i < maxPage ; i++){
    if(requestMercadoService.results[i] === undefined) break;
    let { id, title, condition, price, thumbnail, permalink } = requestMercadoService.results[i];
    let card = `<div class="prod-info-main prod-wrap clearfix">
      <div class="row">
        <div class="col-md-5 col-sm-12 col-xs-12">
          <div class="product-image">
            <img src="${thumbnail}" class="img-responsive" style="width: 260px; height: 230px;">
          </div>
        </div>
        <div class="col-md-7 col-sm-12 col-xs-12">
          <div class="product-deatil">
            <h5 class="name">
              <a href="${permalink}">
                ${id}/${title}
              </a>
              <a href="#">
                <span>${condition}</span>
              </a>
            </h5>
            <p class="price-container">
              <span>$${price} mxn</span>
            </p>
            <span class="tag1"></span>
          </div>
          <div class="product-info smart-form" style="margin-top: 1rem;">
            <div class="row">
              <div class="col-md-12">
                <a href="#" class="btn btn-danger">Add to cart</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`
    let element = document.createElement('div');
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