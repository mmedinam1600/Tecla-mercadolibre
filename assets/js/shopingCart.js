document.cookie = "idProducto_0=MLM908140304; max-age=3600; path=/";
document.cookie = "idProducto_1=MLM929354154; max-age=3600; path=/";
document.cookie = "idProducto_2=MLM921994310; max-age=3600; path=/";
document.cookie = "idProducto_3=MLM940356481; max-age=3600; path=/";

document.cookie = "cantidad_0=1; max-age=3600; path=/";
document.cookie = "cantidad_1=1; max-age=3600; path=/";
document.cookie = "cantidad_2=1; max-age=3600; path=/";
document.cookie = "cantidad_3=4; max-age=3600; path=/";


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



function getCookieValueByName(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0)===' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent( c.substring(nameEQ.length,c.length) );
    }
  }
  return null;
}

const getCartFromCookies =  () => {
  let id;
  let idString = "";
  //Buscamos en las cookies los primeros 10 articulos en el carrito
  for( let i = 0; i < 10 ; i++){
    id = getCookieValueByName( `idProducto_${i}`);
    if(!id) continue; //Si no existe un articulo con esa id continuamos a la siguiente
    idString += `${id},`
  }
  let item = new MercadoService(url, idString);
  item.searchItems()
    .then( (items) =>{
      document.getElementById('totalItems').innerHTML = items.length;
      renderItems(items);
    });
}

const renderItems = (items) =>{
  let i = 0;
  let total = 0;
  items.forEach(item => {
    let cantidad = getCookieValueByName( `cantidad_${i}`);
    total += item.body.price * cantidad;
    let itemHtml = `
    <li class="list-group-item d-flex justify-content-between lh-sm">
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

  let totalHtml = `
  <li class="list-group-item d-flex justify-content-between">
              <span>Total (MXN)</span>
            <strong>$${total}</strong>
          </li>`
  let element = document.createElement('div');
  element.innerHTML = totalHtml;
  carritoDiv.appendChild(element);
  console.log(total);
}


//var miCookie = getCookieValueByName( "cookie1" );

//console.log(miCookie);

getCartFromCookies();
