//Processar formulário
$('#form-login').submit(function (event) {

    event.preventDefault();

    //Criar formData
    let usuario = $('#input-usuario').val();
    let senha = $('#input-senha').val();

    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(usuario+":"+senha));
        },
        type: 'GET',
        url: 'http://localhost:8080/api/auth/',
        dataType: 'json',
        success: function (data) {
            console.log(1);
            sessionStorage.setItem("usuario", usuario);
            sessionStorage.setItem("senha", senha);
            location.href = 'index.html';
        },
        error: function (data) {
            console.log(2);
            alert("Usuário ou senha inválidos");
        }
    });
});

function sair() {
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("senha");
    location.href = '/login.html';
}

document.getElementById("login-btn").addEventListener("click", function() {
    window.location.href = "../funcionario/login.html";
});