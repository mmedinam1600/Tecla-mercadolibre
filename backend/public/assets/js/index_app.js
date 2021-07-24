let host = 'http://localhost';
let port = 3000;

async function renderCarousel(data, divToWrite) {
    if (data) {
        for (let index = 0; index < divToWrite.length; index++) {
            const carouselItem = divToWrite[index];
            const valorRandomId = Math.floor(Math.random() * data.length); //Random para elementos de carousel

            const element = data[valorRandomId];

            let option = document.createElement('div');
            option.setAttribute('id', `carousel_${element.id}`);
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
            buttonProduct.innerHTML = `
                <form name="ShoppingList">
                        <label for="${element.id}" class="visually-hidden">Cantidad</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <input type="button" value="+" class="btn btn-primary me-1" onclick="addCart('${element.id}');"/>
                                <input type="button" value="-" class="btn btn-danger" onclick="removeCart('${element.id}');"/>
                            </div>
                            <input type="number" class="form-control" id="${element.id}" placeholder="Cantidad" value="1">
                        </div>
                    </form>
            `;

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
                divCard.setAttribute('id', `Card_${product.id}`);
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
                buttonCard.innerHTML = `
                    <form name="ShoppingList">
                        <label for="${product.id}" class="visually-hidden">Cantidad</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <input type="button" value="+" class="btn btn-primary me-1" onclick="addCart('${product.id}');"/>
                                <input type="button" value="-" class="btn btn-danger" onclick="removeCart('${product.id}');"/>
                            </div>
                            <input type="number" class="form-control" id="${product.id}" placeholder="Cantidad" value="1">
                        </div>
                    </form>
                `;

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

async function carouselElements() {
    try {
        let data = await fetch(`${host}:${port}/search?category=MLM1648&limit=50`);
        let slide = await data.json();
        await renderCarousel(slide.products, elementsCarousel);
        document.getElementById("loader").style.display = "none";
        document.getElementById("myDiv").style.display = "block";
    } catch (error) {
        console.error("Error en la carga de elementos en la sección carrusel");
    }
}

async function cardsProducts() {
    try {
        let data = await fetch(`${host}:${port}/search?category=MLM1648&limit=50`);
        let items = await data.json();
        await renderCardsProducts(items.products, elementsCarousel);
    } catch (error) {
        console.error("Error de productos durante la carga inicial");
    }
}

let changeCategory = async(element) => {
    try {
        let nuevaCategoria = element.value;
        let data = await fetch(`${host}:${port}/search?category=${nuevaCategoria}&limit=50`);
        let newItem = await data.json();
        renderCardsProducts(newItem.products, elementsCarousel);
    } catch (error) {
        console.error("Error durante la carga de productos, por favor, seleccione otra categoría.");
    }
}

const elementsCarousel = document.getElementsByClassName('carousel-item');
const divListProducts = document.getElementById('listProducts');

try {
    carouselElements();
    cardsProducts();
    //categories();
} catch (error) {
    alert("Error al cargar la página: " + error.message);
    console.error("Error durante la carga inicial");
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
    console.log("dataElement: ");
    console.log(dataElement);
    let productoID = dataElement; //Obtiene una colecciónHTML y accedemos al elemento 1 console.log(dataElement);
    let contadorSum = parseInt(readCookie("contador"), 10) + 1;
    console.log(productoID);
    document.cookie = "contador=" + contadorSum
    document.cookie = "idProducto_" + contadorSum + "=" + productoID + "; max-age=3600; path=/";
    document.cookie = "cantidad_" + contadorSum + "=" + cantidad + "; max-age=3600; path=/";
    alert('Producto añadido');
}

function createCookieCero() {
    document.cookie = "contador=0; max-age=86400; path=/"; //Crear cookie contador
}

//console.log(document.cookie);
createCookieCero();
//console.log(document.cookie);


// Look for .hamburger
const hamburger = document.querySelector(".hamburger");
// On click
hamburger.addEventListener("click", function() {
    // Toggle class "is-active"
    hamburger.classList.toggle("is-active");
    // Do something else, like open/close menu
});