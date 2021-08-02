/*
    Live server no permite cargar el recurso nav.html

*/
/* PETICION AJAX */
var xhr = new XMLHttpRequest();
xhr.open('GET', 'nav.html');
xhr.setRequestHeader('Content-Type', 'text/plain');
xhr.send();
xhr.onload = function(data) {
    document.querySelector("#nav").innerHTML = data.currentTarget.response;
};
/* PETICION AJAX */

/* CERRAR SESIÓN */
function CerrarSession() {
    if (localStorage.getItem('datosUsuario')) {
        console.log('Cerrando sesion')
        localStorage.removeItem('datosUsuario')
        location.href = "index.html";
    } else {
        alert('No ha iniciado sesión');
    }
}
/* CERRAR SESIÓN */

async function load() {
    //Durante el tiempo que el JWT este activo login redireccionará a index.
    console.log('Revisión del status de sesión y carga de elementos adicionales.');
    let status_session = await ConfirmLogin();
    console.log(status_session);
    if (status_session.status != undefined) { //Si tiene una sesion iniciada
        document.getElementById('imgProfile').setAttribute('src', 'https://mdbootstrap.com/img/new/avatars/2.jpg');
    } else { //Si no ha iniciado sesión
        document.getElementById('profile').innerHTML = `
            <li><span class="dropdown-item text-muted">Anónimo</span></li>
            <li><a class="dropdown-item" href="register.html">Registrarse</a></li>
            <li><a class="dropdown-item" href="login.html">Iniciar Sesión</a></li>
            `
        document.getElementById('imgProfile').setAttribute('src', './assets/brand/noAuthentication.jpg');
    }

    console.log(status_session)

    if (status_session.type != undefined && status_session.type == 3) {
        const nombre = document.createElement('li');
        nombre.innerHTML = `<div class="dropdown-item text-muted"><span>${status_session.user.name}#</span><span id="user_id">${status_session.user.id}</span></div>`;
        document.getElementById('profile').append(nombre);
        document.getElementById('ListUsers').innerHTML = '' +
            `<a class="nav-link" id="listUsers" href="list_users.html">Lista Usuarios</a>`;
        document.getElementById('ListProducts').innerHTML = `
            <a class="nav-link" id="listProducts" href="products.html">Lista Productos</a>`;
    }

    if (status_session.type != undefined && status_session.type != 3) {
        const nombre = document.createElement('li');
        nombre.innerHTML = `<div class="dropdown-item text-muted"><span>${status_session.user.name}#</span><span id="user_id">${status_session.user.id}</span></div>`;
        document.getElementById('profile').append(nombre);
        document.getElementById('ListProducts').innerHTML = `
            <a class="nav-link" id="listProducts" href="products.html">Lista Productos</a>`;
    }

}

const changeIconHamburger = () => {
    const hamburger = document.getElementById('hamburger');
    hamburger.classList.toggle("is-active");
}

window.onload = load;