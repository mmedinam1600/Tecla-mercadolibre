const ListUsers = async() => {
    const token = await Login.recuperarUsuario();
    const apiCall = await fetch(`${host}:${port}/user/list-users`, {
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

const UserDelete = async(data) => {
    const token = await Login.recuperarUsuario();
    const apiCall = await fetch(`${host}:${port}/user/delete/` + data, {
        method: 'delete',
        headers: {
            "Accept": "*/*",
            "Content-type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    });
    const response = await apiCall.json();
    console.log(response);
    return response;
}

const editUser = async(data, body) => {
    const token = await Login.recuperarUsuario();
    const apiCall = await fetch(`${host}:${port}/user/editUser/` + data, {
        method: 'put',
        headers: {
            "Accept": "*/*",
            "Content-type": 'application/x-www-form-urlencoded',
            "Authorization": `Bearer ${token}`
        },
        body: `json=${JSON.stringify(body)}`,
    });
    const response = await apiCall.json();
    return response;
}

async function loadList() {
    console.log('Entrando ListUsers');
    let ArrayUser = await ListUsers();
    console.log(ArrayUser)
    if (ArrayUser.error != undefined) {
        alert('Acceso no autorizado');
        location.href = "login.html";
    }
    let divToRender = document.getElementById('bodyTableUsers');
    let htmlUsers = '';
    ArrayUser.forEach(element => {
        let rol = '';
        if (element.rol_id == 3) {
            rol = 'admin';
        } else if (element.rol_id == 2) {
            rol = 'vendedor';
        } else {
            rol = 'usuario';
        }

        console.log(element);
        let userString = escape(JSON.stringify(element));
        console.log(userString);

        htmlUsers += '<tr>' +
            '<td>' + element.first_name + '</td>' +
            '<td>' + element.last_name + '</td>' +
            '<td>' + element.email + '</td>' +
            '<td>' + rol + '</td>' +
            '<td>' +
            '<button type="button" class="btn btn-default btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalEditUser" data-bs-user="' + userString + '">Editar</button> ' +
            '<a class="btn btn-default btn-outline-dark" href="javascript:DeleteUser(\'' + element.user_id + '\')">Borrar</a> ' +
            '</td>' +
            '</tr>'
    });
    divToRender.innerHTML = htmlUsers;
}

loadList();


var modalEditUser = document.getElementById('modalEditUser')
modalEditUser.addEventListener('show.bs.modal', function(event) {
    //console.log('Dentro de edit');
    var button = event.relatedTarget;
    var recipient = JSON.parse(unescape(button.getAttribute('data-bs-user')));
    //console.log(recipient);
    var inputName = modalEditUser.querySelector('.modal-body input[id=editfirstName]');
    var userUnic = modalEditUser.querySelector('.modal-body input[id=UserUnic]');
    var inputApellido = modalEditUser.querySelector('.modal-body input[id=editlastName]');
    var inputEmail = modalEditUser.querySelector('.modal-body input[id=editemail]');
    var selectRol = modalEditUser.querySelector('.modal-body select[id=editrol]')

    //modalTitle.textContent = 'New message to ' + recipient
    userUnic.value = recipient.user_id;
    inputName.value = recipient.first_name;
    inputApellido.value = recipient.last_name;
    inputEmail.value = recipient.email;
    selectRol.options[recipient.rol_id].setAttribute('selected', true);
})

async function DeleteUser(data) {
    const user = await UserDelete(data).status;
    location.href = "list_users.html";
}

async function SubmitEditUser(event) {
    event.preventDefault();
    const first_name = document.getElementById('editfirstName').value;
    const last_name = document.getElementById('editlastName').value;
    const rol = document.getElementById('editrol').value;
    const user = document.getElementById('UserUnic').value;
    const estructura = { "firs_name": first_name, "last_name": last_name, "rol": rol };
    //console.log(estructura);
    let status = await editUser(user, estructura);
    console.log(status);
    location.href = "list_users.html";
}