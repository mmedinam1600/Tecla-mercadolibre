
class MercadoService {
  constructor(url, categoria) {
    this.url = url + categoria;
    console.log(this.url)
  }

  async getTendryItems() {
    let mercadoUrl = await fetch(this.url);
    return mercadoUrl.json();
  }
}

const categorias = document.getElementById('categorias');
const items = document.getElementById('categoria');

const getRequest = async (mercadoService) => mercadoService.getTendryItems();

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

function removeOldItems(div) {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}

async function renderItems(data) {
  let i = 1;
  removeOldItems(items);
  data.forEach( (item) => {
    let button = document.createElement('a');
    button.textContent = `${i}. ${item.keyword}`;
    button.classList.add("box");
    button.onclick = () => window.open(`${item.url}`);
    items.appendChild(button);
    i++;
  });
}

let changeCategory = (element) => {
  let nuevaCategoria = element.value;
  newItem = new MercadoService(`https://api.mercadolibre.com/trends/MLM/`, nuevaCategoria);
  getRequest(newItem)
    .then( (item) => renderItems(item))
    .catch( (err) => console.error("Error al cargar los items"));
}

/* Consulara la API por primera vez y obtendra el top items en cualquier categoría*/
let newItem = new MercadoService(`https://api.mercadolibre.com/trends/MLM/`, "");
getRequest(newItem)
  .then( (item) => renderItems(item))
  .catch( (err) => console.error("Error al cargar los items"));