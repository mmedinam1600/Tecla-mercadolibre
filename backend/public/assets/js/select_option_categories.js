async function categories() {
    try {
        let data = await fetch(`http://localhost:3000/category`);
        let local_categories = await data.json();
        renderCategories(local_categories);
    } catch (error) {
        console.error('Error al cargar las categorías en select');
    }
}

async function renderCategories(data) {
    if (data) {
        data.forEach((category) => {
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

try {
    categories();
} catch (error) {
    console.error("Error durante la carga inicial para select option");
}