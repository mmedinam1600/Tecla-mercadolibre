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

async function renderCarousel(data, divToWrite) {
    if (data) {
        for (let index = 0; index < divToWrite.length; index++) {
            const carouselItem = divToWrite[index];
            const valorRandomId = Math.floor(Math.random() * data.length); //Random para elementos de carousel

            const element = data[valorRandomId];

            let option = document.createElement('div');
            option.setAttribute('id', `${element.id}`);
            option.setAttribute('class', 'row');

            let option_col = document.createElement('div');
            option_col.setAttribute('class', 'col-xs-12 col-sm-12 col-md-6 pt-4');

            let imgProduct = document.createElement('img');
            imgProduct.setAttribute('src', element.thumbnail);
            imgProduct.setAttribute('width', '60%');

            let priceProduct = document.createElement('h4');
            priceProduct.innerHTML = 'Precio: $' + element.price;

            let option_col_2 = document.createElement('div');
            option_col_2.setAttribute('class', 'col-xs-12 col-sm-12 col-md-6 pt-4');

            let titleProduct = document.createElement('h4');
            titleProduct.innerHTML = element.title;

            let buttonProduct = document.createElement('p');
            buttonProduct.innerHTML = `<button id="${element.id}" class="btn btn-lg btn-primary" href="#" onclick="createCookie(${element.id},1)">Añadir a carrito</button>`;

            carouselItem.appendChild(option);
            option.appendChild(option_col);
            option.appendChild(option_col_2);
            option_col.appendChild(imgProduct);
            option_col_2.appendChild(titleProduct);
            option_col_2.appendChild(priceProduct);
            option_col_2.appendChild(buttonProduct);
        }
    } else {
        console.error("El objeto no es el adecuado");
    }
}

let changeCategory = (element) => {
    let nuevaCategoria = element.value;
    newItem = new MercadoService(`https://api.mercadolibre.com/sites/MLM/search?`, "category=" + nuevaCategoria);
    getRequest(newItem)
        .then((item) => {
            renderCardsProducts(item.results, elementsCarousel);
        })
        .catch((err) => console.error("Error al cargar los items"));
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

function createCookie(dataElement, cantidad) {
    let productoID = dataElement[1].id; //Obtiene una colecciónHTML y accedemos al elemento 1 console.log(dataElement);
    let contadorSum = parseInt(readCookie("contador"), 10) + 1;
    document.cookie = "contador=" + contadorSum
    document.cookie = "idProducto_" + contadorSum + "=" + productoID + "; max-age=3600; path=/";
    document.cookie = "cantidad_" + contadorSum + "=" + cantidad + "; max-age=3600; path=/";
    alert('Producto añadido');
}

function createCookieCero() {
    document.cookie = "contador=0; max-age=86400; path=/"; //Crear cookie contador
}

async function renderCategories(data) {
    if (data) {
        data.categories.forEach((category) => {
            let option = document.createElement('option');
            option.setAttribute('id', `${category.id}`);
            option.setAttribute('nombre', `${category.id}`);
            option.setAttribute('value', `${category.id}`);
            option.textContent = `${category.name}`;
            categorias.appendChild(option);
        });
    } else {
        console.error("El objeto no es el adecuado");
    }
}

async function renderCardsProducts(data) {
    if (data) {
        divListProducts.innerHTML = '';
        for (let index = 0; index < 5; index++) {

            let divRow = document.createElement('div');
            divRow.setAttribute('id', 'row-' + index);
            divRow.setAttribute('class', 'row');

            divListProducts.appendChild(divRow);

            for (let cardIndex = 0; cardIndex < 4; cardIndex++) {
                const valorRandomId = Math.floor(Math.random() * data.length); //Random para productos

                let divCol = document.createElement('div');
                divCol.setAttribute('class', 'col pt-3');
                divRow.appendChild(divCol);

                const product = data[valorRandomId];

                let divCard = document.createElement('div');
                divCard.setAttribute('class', 'card');
                divCard.setAttribute('id', `${product.id}`);
                divCard.setAttribute('style', 'width: 18rem;');
                divCol.appendChild(divCard);


                let imgProduct = document.createElement('img');
                imgProduct.setAttribute('src', product.thumbnail);
                imgProduct.setAttribute('class', 'card-img-top');
                imgProduct.setAttribute('width', '100px');

                let priceProduct = document.createElement('h5');
                priceProduct.innerHTML = 'Precio: $' + product.price;

                let cardBody = document.createElement('div');
                cardBody.setAttribute('class', 'card-body');

                let cardHead = document.createElement('h5');
                cardHead.innerHTML = product.title;
                cardHead.setAttribute('class', 'card-title');

                let buttonCard = document.createElement('p');
                buttonCard.innerHTML = `<button id="${product.id}" class="btn btn-lg btn-primary" href="#" onclick="createCookie(${product.id},1)">Añadir a carrito</button>`;

                divCard.appendChild(imgProduct);
                divCard.appendChild(cardBody);
                cardBody.appendChild(cardHead);
                cardBody.appendChild(priceProduct);
                cardBody.appendChild(buttonCard);

            }

        }
    } else {
        console.error("El objeto no es el adecuado");
    }
}

const getRequest = async(mercadoService) => mercadoService.getTendryItems();
const elementsCarousel = document.getElementsByClassName('carousel-item');
const divListProducts = document.getElementById('listProducts');
const carouselElements = new MercadoService(`https://api.mercadolibre.com/sites/MLM/search?`, "category=MLM1648");
const cardsProducts = new MercadoService(`https://api.mercadolibre.com/sites/MLM/search?`, "category=MLM1648");

getRequest(carouselElements)
    .then((categorias) => {
        //console.log(categorias.results);
        renderCarousel(categorias.results, elementsCarousel);
    })
    .catch((err) => console.error("Error al cargar las categorias"));

const categories = new MercadoService(`https://api.mercadolibre.com/sites/MLM/`, "");
getRequest(categories)
    .then((categorias) => renderCategories(categorias))
    .catch((err) => console.error("Error al cargar las categorias"));

getRequest(cardsProducts)
    .then((categorias) => {
        renderCardsProducts(categorias.results, elementsCarousel);
    })
    .catch((err) => console.error("Error al cargar las categorias"));

//console.log(document.cookie);
createCookieCero();
//console.log(document.cookie);