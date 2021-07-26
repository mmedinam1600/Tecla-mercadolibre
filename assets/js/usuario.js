class Usuario {
    constructor(nombre, apellido, email, password) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.telefono = "";
        this.domicilio = [{
            "nombreCompleto": "",
            "codigoPostal": "",
            "estado": "",
            "municipio": "",
            "colonia": "",
            "calle": "",
            "numeroExterior": "",
            "numeroInterior": "",
            "entreCalle1": "",
            "entreCalle2": "",
            "telefonoContacto": "",
            "indicacionesAdicionales": "",
        }];
    }

    agregarDomicilio(properties) {
        this.domicilio.push(properties);
    }

    removerDomicilio(position) {
        this.domicilio.splice(position, 1);
    }

    editUser(properties) {
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

    delete() {

    }

    getUser = () => {
        return {
            "nombre": this.nombre,
            "apellido": this.apellido,
            "fullName": this.nombre + " " + this.apellido,
            "email": this.email,
            "password": this.password,
            "telefono": this.telefono,
            "domicilio": this.domicilio
        }
    };

}

async function CreateUser(first_name, last_name, email, password) {
    let usuario = new Usuario(first_name, last_name, email, password);
    //console.log(usuario)
    const apiCall = await fetch(`${host}:${port}/user/register`, {
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

    //console.log(response)

    if (response.user != undefined) {
        document.getElementById('CreateForm').reset();
        document.getElementById('email').removeAttribute('style');
        return '<h5 class="p-4" style="color:green;">' + response.user + ' <a href="login.html">iniciar sesión<a> </h5>';
    } else {
        document.getElementById('email').setAttribute("style", "border-color:red !important; background-image:none !important");
        return '<p style="color:red">' + response.message + '</p>';
    }
}

async function SubmitUser(event) {
    event.preventDefault();
    //console.log('Formulario de registro activado')
    const first_name = document.getElementById('firstName').value;
    const last_name = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('password-confirm').value;

    //console.log(confirm_password != password);
    if (confirm_password != password) {
        document.getElementById('password').setAttribute("style", "border-color:red !important; background-image:none !important");
        document.getElementById('password-confirm').setAttribute("style", "border-color:red !important; background-image:none !important");
    } else {
        document.getElementById('password').removeAttribute('style');
        document.getElementById('password-confirm').removeAttribute('style');

        const userMessage = await CreateUser(first_name, last_name, email, password);
        document.getElementById('messagesInicio').innerHTML = '<div class="text-center">' + userMessage + '</div>';
    }
}