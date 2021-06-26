
class mercadoService {
  constructor(url, categoria) {
    this.url = url + categoria;
    console.log(this.url)
  }

  async getTendryItems() {
    let mercadoUrl = await fetch(this.url);
    let response = await mercadoUrl.json();
    return response;
  }
}

async function getCategories(MercadoService){
  const itemsResultado = await MercadoService.getTendryItems();
  console.log("categorias");
  console.log(itemsResultado);
}

async function getMercadoService(MercadoService) {
  const itemsResultado = await MercadoService.getTendryItems();
  //console.log(itemsResultado);

  //Se crea un div para que tome el style #pokeDiv div

  let divPokemon = document.createElement('div');
  divPokemon.setAttribute('id', 'divPokemon');
  pokeDiv.appendChild(divPokemon);

  //Se obtienen los datos de nombre y id para mostrar
  let namePokemon = document.createElement('h1');
  namePokemon.textContent = `${pokemonResultado.name} #${pokemonResultado.id}`;

  //Se obtiene la imagen del pokemon, los sprites son usados en videojuegos para crear los gráficos.
  let photoPokemon = document.createElement('img');
  photoPokemon.setAttribute('src', pokemonResultado.sprites.front_default);
  photoPokemon.style.width = '200px';

  //Se añaden los elementos al div divPokemon
  divPokemon.appendChild(namePokemon)
  divPokemon.appendChild(photoPokemon)

}

//let categoria = document.getElementById('categoria');


const newItem = new mercadoService(`https://api.mercadolibre.com/trends/MLM/`, "MLM1747");
const categories = new mercadoService(`https://api.mercadolibre.com/trends/MLM/`, "");
getMercadoService(newItem);
getCategories(categories);