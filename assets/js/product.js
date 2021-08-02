class Producto {
    constructor(title, thumbnail, unit_price, condition, quantity_stock, category_id) {
        this.title = title;
        this.thumbnail = thumbnail;
        this.unit_price = unit_price;
        this.condition = condition;
        this.quantity_stock = quantity_stock;
        this.category_id = category_id;
    }

    editProduct(properties) {
        let keys = Object.keys(properties);
        keys.forEach((property) => {
            try {
                this[property] = properties[property];
                console.log(`Se edito con éxito el ${property}`);
            } catch (e) {
                console.log(`Error al editar la propiedad ${property}`);
            }
        })
    }

    getProduct = () => {
        return {
            "titulo": this.title,
            "miniatura": this.thumbnail,
            "precio/u": this.unit_price,
            "condicion": this.condition,
            "stock": this.quantity_stock,
            "categoria": this.category_id,
        }
    };
}

async function SubmitProduct(event) {
    event.preventDefault();
    console.log('Formulario de registro activado');
    const title = document.getElementById('title').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const unit_price = document.getElementById('unit_price').value;
    const condition = document.getElementById('condition').value;
    const quantity_stock = document.getElementById('quantity_stock').value;
    const category_id = document.getElementById('category_id').value;
    //console.log(title, thumbnail, unit_price, condition, quantity_stock, category_id);
    const productMessage = await CreateProduct(title, thumbnail, unit_price, condition, quantity_stock, category_id);

    document.getElementById('messagesInicio').innerHTML = '<div class="text-center">' + productMessage.message + '</div>';
    await renderProduct(productMessage.product);
}

async function SubmitEditProduct(event) {
    event.preventDefault();
    console.log("Editando producto");
    const title = document.getElementById('title_edit').value;
    const thumbnail = document.getElementById('thumbnail_edit').value;
    const unit_price = document.getElementById('unit_price_edit').value;
    const condition = document.getElementById('condition_edit').value;
    const quantity_stock = document.getElementById('quantity_stock_edit').value;
    const category_id = document.getElementById('category_id_edit').value;
    const product_id = document.getElementById('product_id_edit').value;
    console.log(product_id);

    const productMessage = await editProduct(title, thumbnail, unit_price, condition, quantity_stock, category_id, product_id);
    console.log(productMessage);
    location.href = "products.html";
}

async function editProduct(title, thumbnail, unit_price, condition, quantity_stock, category_id, product_id) {
    let producto = new Producto(title, thumbnail, unit_price, condition, quantity_stock, category_id);
    const token = await Login.recuperarUsuario();
    const apiCall = await fetch(`${host}:${port}/products/ours/${product_id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(producto)
    });
    const response = await apiCall.json();
    console.log(response);
    return response;
}


async function CreateProduct(title, thumbnail, unit_price, condition, quantity_stock, category_id) {
    let producto = new Producto(title, thumbnail, unit_price, condition, quantity_stock, category_id);
    const apiCall = await fetch(`${host}:${port}/products/ours`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    });
    const response = await apiCall.json();
    console.log(response)
    if (response.product != undefined) {
        document.getElementById('CreateForm').reset();
        //document.getElementById('email').removeAttribute('style');
        return {
            message: '<h5 class="p-4" style="color:green;"> Producto con la ID ' + response.product.product_id + ' creado satisfactoriamente</h5>',
            product: response.product
        };
    } else {
        document.getElementById('email').setAttribute("style", "border-color:red !important; background-image:none !important");
        return '<p style="color:red">' + response.message + '</p>';
    }
}


const table = document.getElementById('table_body');

async function loadProducts() {
    //let ArrayUser = await accessPage();
    //console.log(ArrayUser)
    /*if (ArrayUser.error != undefined) {
        alert('Acceso no autorizado');
        location.href = "login.html";
    }*/
    const token = await Login.recuperarUsuario();
    const apiCall = await fetch(`${host}:${port}/products/ours`, {
        method: 'get',
        headers: {
            "Accept": "*/*",
            "Content-type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    });
    const response = await apiCall.json();
    console.log(response);
    response.products.forEach(product => {
        renderProduct(product);
    });
}

async function loadCategories() {
    //TODO Hacer el endpoint para obtener las categorias
    //const token = await Login.recuperarUsuario();
    //const apiCall = await fetch(`${host}:${port}/products/ours`, {
    //    method: 'get',
    //    headers: {
    //        "Accept": "*/*",
    //        "Content-type": 'application/json',
    //        "Authorization": `Bearer ${token}`
    //    }
    //});
}

async function renderProduct(product) {
    const row = document.createElement('tr');
    let productString = escape(JSON.stringify(product));
    row.innerHTML = `
        <td>${product.product_id}</td>
        <td><img src="${product.thumbnail}" alt="${product.title}" style="max-height: 50px; max-width: 50px"/></td>
        <td>${product.title}</td>
        <td>$${product.unit_price}</td>
        <td>${product.condition}</td>
        <td>${product.users_id}</td>
        <td>
            <button class="button" data-bs-toggle="modal" data-bs-target="#modalEditProduct" data-bs-product="${productString}"><i class="fa fa-pencil-alt"></i></button>
            <button onclick="deleteProduct(${product.product_id})" class="button"><i class="fa fa-trash"></i></button>
        </td>`
    row.id = product.product_id;
    table.appendChild(row);
}

async function deleteProduct(id) {
    const token = await Login.recuperarUsuario();
    const apiCall = await fetch(`${host}:${port}/products/ours/${id}`, {
        method: 'DELETE',
        headers: {
            "Accept": "*/*",
            "Content-type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    });
    const response = await apiCall.json();
    alert(`${response.message}`);
    const row = document.getElementById(`${id}`);
    row.innerHTML = "";
}

const accessPage = async() => {
    //const token = await Login.recuperarUsuario();
    //const apiCall = await fetch(`${host}:${port}/user/list-users`, {
    //    method: 'get',
    //    headers: {
    //        "Accept": "*/*",
    //        "Content-type": 'application/json',
    //        "Authorization": `Bearer ${token}`
    //    }
    //});
    //const response = await apiCall.json();
    //return response;
}

var modalEditProduct = document.getElementById('modalEditProduct')
modalEditProduct.addEventListener('show.bs.modal', function(event) {
    //console.log('Dentro de edit');
    var button = event.relatedTarget;
    var recipient = JSON.parse(unescape(button.getAttribute('data-bs-product')));
    //console.log(recipient);
    var title = modalEditProduct.querySelector('.modal-body input[id=title_edit]');
    var thumbnail = modalEditProduct.querySelector('.modal-body input[id=thumbnail_edit]');
    var unit_price = modalEditProduct.querySelector('.modal-body input[id=unit_price_edit]');
    var condition = modalEditProduct.querySelector('.modal-body select[id=condition_edit]');
    var quantity_stock = modalEditProduct.querySelector('.modal-body input[id=quantity_stock_edit]');
    var category_id = modalEditProduct.querySelector('.modal-body select[id=category_id_edit]');
    var product_id = modalEditProduct.querySelector('.modal-body input[id=product_id_edit]');

    //modalTitle.textContent = 'New message to ' + recipient
    title.value = recipient.title;
    thumbnail.value = recipient.thumbnail;
    unit_price.value = recipient.unit_price;
    quantity_stock.value = recipient.quantity_stock;
    product_id.value = recipient.product_id;
    console.log(condition.options);
    let idCondicion;
    if (recipient.condition === "Nuevo") idCondicion = 1;
    else idCondicion = 2;
    condition.options[idCondicion].setAttribute('selected', true);
    category_id.options[recipient.category_id - 1].setAttribute('selected', true);
})


loadProducts();
loadCategories();