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
    //console.log(status_session);
    if (status_session.status != undefined) {
        document.getElementById('imgProfile').setAttribute('src', 'https://mdbootstrap.com/img/new/avatars/2.jpg')
    } else {
        document.getElementById('imgProfile').setAttribute('src', './assets/brand/noAuthentication.jpg')
    }
    if (status_session.type != undefined && status_session.type == 3) {
        document.getElementById('ListUsers').innerHTML = '<a class="nav-link" id="listUsers" href="list_users.html">Lista Usuarios</a>';
    }
}
window.onload = load;