/* PETICION AJAX FOOTER*/
var xhr = new XMLHttpRequest();
xhr.open('GET', 'footer.html');
xhr.setRequestHeader('Content-Type', 'text/plain');
xhr.send();
xhr.onload = function(data) {
    document.querySelector("#footerGeneral").innerHTML = data.currentTarget.response;
};
/* PETICION AJAX FOOTER*/