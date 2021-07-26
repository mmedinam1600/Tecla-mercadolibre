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

    document.getElementById('messagesInicio').innerHTML = '<div class="text-center">' + productMessage + '</div>';
}


async function CreateProduct(title, thumbnail, unit_price, condition, quantity_stock, category_id) {
    let producto = new Producto(title, thumbnail, unit_price, condition, quantity_stock, category_id);
    const apiCall = await fetch(`http://localhost:3000/products/ours`, {
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
        return '<h5 class="p-4" style="color:green;"> Producto con la ID ' + response.product_id + ' creado satisfactoriamente</h5>';
    } else {
        document.getElementById('email').setAttribute("style", "border-color:red !important; background-image:none !important");
        return '<p style="color:red">' + response.message + '</p>';
    }
}


const table = document.getElementById('table_body');

async function loadProducts() {
    const apiCall = await fetch(`http://localhost:3000/products/ours`);
    const response = await apiCall.json();
    console.log(response);
    response.products.forEach( product => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${product.product_id}</td>
        <td><img src="${product.thumbnail}" alt="${product.title}" style="max-height: 50px; max-width: 50px"/></td>
        <td>${product.title}</td>
        <td>$${product.unit_price}</td>
        <td>${product.condition}</td>
        <td>${product.users_id}</td>
        <td>
            <form action="">
                <button class="button"><i class="fa fa-pencil-alt"></i></button>
                <button class="button"><i class="fa fa-trash"></i></button>
            </form>
        </td>`
        table.appendChild(row);
    });

    console.log(response);
}

loadProducts();