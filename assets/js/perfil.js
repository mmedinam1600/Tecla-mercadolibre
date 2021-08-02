async function checkPerfil() {
    let status_session = await ConfirmLogin();
    if (status_session.error != undefined) {
        console.log(status_session.error)
        document.getElementsByClassName('content-to-charge')[0].innerHTML = `<main class="px-3">` +
            `<h1>No puede acceder a esta sección</h1>` +
            `<p class="lead">${status_session.error}</p>` +
            `<p class="lead"><a href="login.html">Inicie Sesión</a></p>` +
            `</main>`;
    }
}

async function renderData() {
    const token = await Login.recuperarUsuario();
    const apiCall = await fetch(`${host}:${port}/user/profile`, {
        method: 'get',
        headers: {
            "Accept": "*/*",
            "Content-type": 'application/x-www-form-urlencoded',
            "Authorization": `Bearer ${token}`
        }
    });
    const response = await apiCall.json();
    console.log(response)
    return response;
}

function addDomicilio() {
    let domicilio = document.createElement('div');
    domicilio.setAttribute('class', 'row p-4');
    domicilio.innerHTML = '<form id="CreateAddressForm" onsubmit="return SubmitAddress(event)"><div class="row"><div class="col-sm-12">' +
        '<label for="fullNametoRecive" class="form-label">Autorizado para recibir, nombre(s) completo(s)</label>' +
        '<input type="text" class="form-control" id="fullNametoRecive" placeholder="" value="" required>' +
        '<div class="invalid-feedback">' +
        'Valid last name is required.' +
        '</div>' +
        '</div>' +

        '<div class="col-sm-6">' +
        '<label for="colonia" class="form-label">Colonia</label>' +
        '<input type="text" class="form-control" id="colonia" placeholder="" value="" required>' +
        '<div class="invalid-feedback">' +
        'Valid last name is required.' +
        '</div>' +
        '</div>' +

        '<div class="col-sm-6">' +
        '<label for="calle" class="form-label">Calle</label>' +
        '<input type="text" class="form-control" id="calle" placeholder="" value="" required>' +
        '<div class="invalid-feedback">' +
        'Valid last name is required.' +
        '</div>' +
        '</div>' +

        '<div class="col-sm-6">' +
        '<label for="numeroInterior" class="form-label">Número Interior</label>' +
        '<input type="text" class="form-control" id="numeroInterior" placeholder="Puede colocar S/N" value="" required>' +
        '<div class="invalid-feedback">' +
        'Valid last name is required.' +
        '</div>' +
        '</div>' +

        '<div class="col-sm-6">' +
        '<label for="numeroExterior" class="form-label">Número Exterior</label>' +
        '<input type="text" class="form-control" id="numeroExterior" placeholder="Puede colocar S/N" value="" required>' +
        '<div class="invalid-feedback">' +
        'Valid last name is required.' +
        '</div>' +
        '</div>' +

        '<div class="col-sm-6">' +
        '<label for="calleReferenciaUno" class="form-label">Calle de Referencia 1</label>' +
        '<input type="text" class="form-control" id="calleReferenciaUno" placeholder="" value="">' +
        '<div class="invalid-feedback">' +
        'Valid last name is required.' +
        '</div>' +
        '</div>' +

        '<div class="col-sm-6">' +
        '<label for="calleReferenciaDos" class="form-label">Calle de Referencia 2</label>' +
        '<input type="text" class="form-control" id="calleReferenciaDos" placeholder="" value="">' +
        '<div class="invalid-feedback">' +
        'Valid last name is required.' +
        '</div>' +
        '</div>' +

        '<div class="col-sm-6">' +
        '<label for="telefonoDomicilio" class="form-label">Teléfono en Domicilio</label>' +
        '<input type="tel" class="form-control" id="telefonoDomicilio" placeholder="" value="">' +
        '<div class="invalid-feedback">' +
        'Valid first name is required.' +
        '</div>' +
        '</div>' +

        '<div class="col-sm-6">' +
        '<label for="indicacionesAdicionales" class="form-label">Indicaciones Adicionales</label>' +
        '<input type="tel" class="form-control" id="indicacionesAdicionales" placeholder="" value="">' +
        '<div class="invalid-feedback">' +
        'Valid first name is required.' +
        '</div>' +
        '</div>' +

        '<div class="col-md-4">' +
        '<label for="state" class="form-label">Estado</label>' +
        '<input type="text" class="form-control" id="state" required>' +
        '<div class="invalid-feedback">' +
        'Valid Estado is required.' +
        '</div>' +
        '</div>' +

        '<div class="col-md-5">' +
        '<label for="country" class="form-label">Delegación o Municipio</label>' +
        '<input type="text" class="form-control" id="country" required>' +
        '<div class="invalid-feedback">' +
        'Valid Delegación is required.' +
        '</div>' +
        '</div>' +

        '<div class="col-md-3">' +
        '<label for="zip" class="form-label">Código Postal</label>' +
        '<input type="text" class="form-control" id="zip" placeholder="" required>' +
        '<div class="invalid-feedback">' +
        'Zip code required.' +
        '</div>' +
        '</div>' +
        '<div class="row p-4">' +
        '<div class="col"><input type="submit" id="btGuardarDomicilio" value="Guardar" class="btn btn-success"/>  ' +
        '  <input type="button" id="btRemoveDomicilio" value="Cancelar" class="btn btn-secondary" onclick="removeDomicilio();" />' +
        '</div>' +
        '</div></div></form>';
    document.getElementById('domicilios').append(domicilio)
}

function removeDomicilio() {
    let elementos_div_domicilios = document.getElementById('domicilios').children;
    if (elementos_div_domicilios.length > 1) {
        elementos_div_domicilios[elementos_div_domicilios.length - 1].remove();
    }
    console.log(elementos_div_domicilios.length)
    console.log(elementos_div_domicilios);
}

async function CreateAdress(adresses) {
    const token = await Login.recuperarUsuario();
    const apiCall = await fetch(`${host}:${port}/address/create`, {
        method: 'post',
        headers: {
            "Accept": "*/*",
            "Content-type": 'application/x-www-form-urlencoded',
            "Authorization": `Bearer ${token}`
        },
        body: `json=${JSON.stringify(adresses)}`,
    });
    const response = await apiCall.json();

    console.log(response)

    /*if (response.user != undefined) {
        document.getElementById('CreateForm').reset();
        document.getElementById('email').removeAttribute('style');
        return '<h5 class="p-4" style="color:green;">' + response.user + ' <a href="login.html">iniciar sesión<a> </h5>';
    } else {
        document.getElementById('email').setAttribute("style", "border-color:red !important; background-image:none !important");
        return '<p style="color:red">' + response.message + '</p>';
    }*/
}

async function SubmitAddress(event) {
    event.preventDefault();
    //console.log('Formulario de registro activado')
    const fullName = document.getElementById('fullNametoRecive').value;
    const colonia = document.getElementById('colonia').value;
    const calle = document.getElementById('calle').value;
    const numeroInterior = document.getElementById('numeroInterior').value;
    const numeroExterior = document.getElementById('numeroExterior').value;
    const calleReferenciaUno = document.getElementById('calleReferenciaUno').value;
    const calleReferenciaDos = document.getElementById('calleReferenciaDos').value;
    const telefonoDomicilio = document.getElementById('telefonoDomicilio').value;
    const indicacionesAdicionales = document.getElementById('indicacionesAdicionales').value;
    const state = document.getElementById('state').value;
    const country = document.getElementById('country').value;
    const zip = document.getElementById('zip').value;

    let Address = {
        fullname: fullName,
        postal_code: zip,
        state: state,
        city_hall: country,
        colony: colonia,
        street: calle,
        number: numeroExterior,
        inner_number: numeroInterior,
        street1: calleReferenciaUno,
        street2: calleReferenciaDos,
        mobile_number: telefonoDomicilio,
        additional_info: indicacionesAdicionales
    }

    const userMessage = await CreateAdress(Address);
}

checkPerfil();
renderData();