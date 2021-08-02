class Login {
    constructor(name, password) {
        this.name = name;
        this.password = password;
        this.token = "";
    }

    static async guardarUsuario(usuario) {
        localStorage.setItem("datosUsuario", JSON.stringify(usuario));
    }

    static async recuperarUsuario() {
        let user = await JSON.parse(localStorage.getItem("datosUsuario"));
        return user;
    }
}

async function login(email, password) {
    let usuario = { email: email, password: password };
    console.log(usuario)
    const apiCall = await fetch(`${host}:${port}/user/login`, {
        method: 'post',
        //Se utiliza application/x-www-form-urlencoded para autorizar envíos CORS
        headers: {
            "Accept": "*/*",
            "Content-type": 'application/x-www-form-urlencoded',
        },
        //Los datos se envían como cadena en forma de asignacion foo=bar&foo2=bar2 al usar application/x-www-form-urlencoded
        body: `json=${JSON.stringify(usuario)}`,
    });
    const response = await apiCall.json();

    if (response.token == undefined) {
        console.log('error');
        console.log(await response)
        throw new Error(response);
    }

    return response.token;
}

const ConfirmLogin = async() => {
    const token = await Login.recuperarUsuario();
    //console.log('Token almacenado: ' + token);
    const apiCall = await fetch(`${host}:${port}/user/checkSession`, {
        method: 'get',
        headers: {
            "Accept": "*/*",
            "Content-type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    });
    const response = await apiCall.json();
    return response;
}

async function validateForm(event) {
    try {
        event.preventDefault();
        document.getElementById('message-login').innerHTML = ''
        const email = document.getElementById('inputEmail').value;
        const pass = document.getElementById('inputPassword').value;
        Login.guardarUsuario(new Login(email, pass));
        const resultado = await login(email, pass);
        console.log('Token generado en el login: ', resultado);
        Login.guardarUsuario(resultado);
        if (resultado) {
            location.href = "index.html";
        }
    } catch (error) {
        document.getElementById('message-login').innerHTML = `<div class="alert alert-warning alert-dismissible fade show text-sm-start" role="alert">` +
            `${error.message}` +
            `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>` +
            `</div>`;
    }
}

async function load() {
    //Durante el tiempo que el JWT este activo login redireccionará a index.
    console.log('Entrando durante ONLOAD');
    let status_session = await ConfirmLogin();
    if (status_session.status != undefined) {
        location.href = "index.html";
    }
}
window.onload = load;