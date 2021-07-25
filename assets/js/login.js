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
    const apiCall = await fetch("http://localhost:3000/user/login", {
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
    return response.token;
}

async function validateForm(event) {
    event.preventDefault();
    const email = document.getElementById('inputEmail').value;
    const pass = document.getElementById('inputPassword').value;
    Login.guardarUsuario(new Login(email, pass));
    const resultado = await login(email, pass);
    console.log('resultado->', resultado);
    Login.guardarUsuario(resultado);
}