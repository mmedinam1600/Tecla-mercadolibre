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

/* Ejemplo de uso */
//let user = new Usuario("Marco", "Polo", "micky@hotmail.com", "patito");
//user.getUser(); //Revisamos los datos del usuario
//user.editUser({nombre: 'Marco Antonio', apellido: 'Flores'}); //Editamos algunos campos
//user.getUser() //Verificamos que se editen los nuevos cambios