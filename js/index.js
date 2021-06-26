
class MercadoService {
  constructor(url, categoria) {
    this.url = url + categoria;
    console.log(this.url)
  }

  async getTendryItems() {
    let mercadoUrl = await fetch(this.url);
    return await mercadoUrl.json();
  }
}

const categorias = document.getElementById('categorias');
const items = document.getElementById('categoria');

/* Carga todas las categorias que hay en la etiqueta select */
const getRequest = async (mercadoService) => await mercadoService.getTendryItems();

async function renderCategories(data){
  if(data.categories){
    data.categories.forEach((category) =>{
      let option = document.createElement('option');
      option.setAttribute('id', `${category.id}`);
      option.setAttribute('nombre', `${category.id}`);
      option.setAttribute('value', `${category.id}`);
      option.textContent = `${category.name}`;
      categorias.appendChild(option);
    });
  } else{
    console.error("El objeto no es el adecuado");
  }
}

const categories = new MercadoService(`https://api.mercadolibre.com/sites/MLM`, "");
getRequest(categories)
  .then( (categorias) => renderCategories(categorias))
  .catch( (err) => console.error("Error al cargar las categorias"));


function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

async function renderItems(data) {
  let i = 1;
  removeAllChildNodes(items);
  data.forEach( (item) => {
    let button = document.createElement('a');
    button.textContent = `${i}. ${item.keyword}`;
    button.classList.add("box");
    button.onclick = () => window.open(`${item.url}`);
    items.appendChild(button);
    i++;
  });
}


let newItem = new MercadoService(`https://api.mercadolibre.com/trends/MLM/`, "");
getRequest(newItem)
  .then( (item) => renderItems(item))
  .catch( (err) => console.error("Error al cargar los items"));


let changeCategory = (element) => {
  let nuevaCategoria = element.value;
  newItem = new MercadoService(`https://api.mercadolibre.com/trends/MLM/`, nuevaCategoria);
  getRequest(newItem)
    .then( (item) => renderItems(item))
    .catch( (err) => console.error("Error al cargar los items"));
}