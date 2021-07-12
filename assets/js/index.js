let host = 'http://localhost';
let port = 3000;

const categorias = document.getElementById('categorias');
const items = document.getElementById('categoria');

function removeOldItems(div) {
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

async function renderItems(data) {
    let i = 1;
    removeOldItems(items);
    data.forEach((item) => {
        let button = document.createElement('a');
        button.textContent = `${i}. ${item.keyword}`;
        button.classList.add("box");
        button.onclick = () => window.open(`${item.url}`);
        items.appendChild(button);
        i++;
    });
}

let changeCategory = async(element) => {
    try {
        let nuevaCategoria = element.value;
        let data = await fetch(`${host}:${port}/trends/${nuevaCategoria}`);
        let item = await data.json();
        renderItems(item);
    } catch (error) {
        console.error("Error durante la carga de productos, por favor, seleccione otra categoría.");
    }
}

/* Consulara la API por primera vez y obtendra el top items en cualquier categoría*/
async function tendenciasGeneral() {
    try {
        let data = await fetch(`${host}:${port}/trends`);
        let tendencias = await data.json();
        renderItems(tendencias)
    } catch (error) {
        console.error('Error al cargar las tendencias iniciales');
    }
}

try {
    tendenciasGeneral();
} catch (error) {
    console.error("Error en la carga inicial de tendencias");
}