const elementsCarousel = document.getElementsByClassName('carousel-item');

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
                        <div class="input-group d-grid gap-2">
                            <!--<div class="input-group-text"> -->
                                <input type="button" value="Agregar al carrito" class="btn btn-primary me-1" onclick="addToCart('${element.id}');"/>
                                <!-- <input type="button" value="-" class="btn btn-danger" onclick="removeCart('${element.id}');"/>
                            </div>
                            <input type="number" class="form-control" id="${element.id}" placeholder="Cantidad" value="1">-->
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

async function carouselElements() {
    try {
        let data = await fetch(`${host}:${port}/search?category=MLM1648&limit=50`);
        let slide = await data.json();
        renderCarousel(slide.products, elementsCarousel);
    } catch (error) {
        console.error("Error en la carga de elementos en la sección carrusel");
    }
}

async function cardsProducts() {
    try {
        const products = await getData('search?category=MLM1648&limit=10');
        renderCardsProducts(products.products, "tarjetas_ml");
        const products_ours = await getData(`products/ours?limit=10`);
        renderCardsProducts(products_ours.products, "tarjetas_nuestras");
    } catch (error) {
        console.error("Error de productos durante la carga inicial");
    }
}

let changeCategory = async (element) => {
    try {
        const nuevaCategoria = element.value;
        if(nuevaCategoria.startsWith('MLM')){
            const newProductByCategory = await getData(`search?category=${nuevaCategoria}&limit=10`);
            renderCardsProducts(newProductByCategory.products, 'tarjetas_ml');
        } else {
            const newProductsByCategory = await getData(`products/ours?category=${nuevaCategoria}`);
            console.log(newProductsByCategory);
            renderCardsProducts(newProductsByCategory.products, 'tarjetas_nuestras');
        }
    } catch (error) {
        console.error("Error durante la carga de productos, por favor, seleccione otra categoría.");
    }
}

const renderCardsProducts = (products, tarjetasID) => {
    const cards = document.getElementById(tarjetasID);
    cards.innerHTML = "";
    if(products.length > 0) {
        products.forEach((product) => {
            let card = `
            <div class="card" style="width: 100%">
                <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" style="max-height: 300px; min-height:300px ">
                <div class="card-header">
                    <b>$${product.price || product.unit_price} MXN</b>
                </div>
                <div class="card-body">
                    <h5 class="card-title"><a href="${product.permalink || '#'}">${product.title}<span style="color: gray; font-size: 0.7rem"> (${product.id || product.product_id})</span></a> <span style="color: red; font-size: 0.7rem">${product.condition}</span></h5>
                    <label for="${product.id || product.product_id}" class="visually-hidden">Cantidad</label>
                    <div class="input-group d-grid gap-2">
                        <!--<div class="input-group-text">-->
                            <input type="button" value="Agregar al carrito" class="btn btn-primary me-1 " onclick="addToCart('${product.id || product.product_id}');"/>
                            <!--<input type="button" value="-" class="btn btn-danger" onclick="removeCart('${product.id || product.product_id}','1');"/>-->
                        <!--</div>-->
                        <!--<input type="number" class="form-control" id="${product.id || product.product_id}" placeholder="Cantidad" value="1">-->
                    </div>
                </div>
            </div>
            `;
            let element = document.createElement('div');
            element.setAttribute('class', 'col-md-3 d-flex align-items-stretch my-3');
            element.innerHTML = card;
            cards.appendChild(element);
        });
    } else {
        const noData = document.createElement('p');
        noData.innerHTML = "No hay resultados para esta categoría";
        cards.appendChild(noData);
    }
}

/* CARGAMOS LAS CATEGORIAS EN LA PÁGINA PRINCIPAL */
async function loadCategories(){
    try {
        const categoriesML = await getData('category/');
        await renderSelectCategories(categoriesML, 'categoriasML');
        const { categories } = await getData('category/ours/');
        await renderSelectCategories(categories, 'our_categories');
    } catch (e) {
        console.error(`Error al obtener/renderizar las categorias ML. ERROR: ${e.message}`);
        alert(`Error al cargar las categorias.`);
    }
}

try {
    carouselElements();
    cardsProducts();
    loadCategories();
} catch (error) {
    console.error("Error durante la carga inicial");
}
