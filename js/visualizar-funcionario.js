function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getUTCMonth() + 1),
        day = '' + d.getUTCDate(),
        year = d.getUTCFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function acionarEventosBotaoVisualizar() {
    visualizarFuncionario();
    esconderAlertBotaoVisualizar();
}

function visualizarFuncionario() {
    var id = $('#input-id').val(); 

    if (id === '') {
        alert('Por favor, preencha o campo ID');
        return;
    }

    $.ajax({
        url: 'http://localhost:8080/api/funcionario/getById/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#input-matricula").val(data.matricula);
            $("#input-nome").val(data.nome);
            $("#input-sexo").val(data.sexo);
            $("#input-nascimento").val(formatDate(new Date(data.nascimento)));
            $("#input-cpf").val(data.cpf);
            $("#input-departamento").val(data.departamento);
            $("#input-cargo").val(data.cargo);
            $("#input-salario").val(data.salario);
        },
        error: function (data) {
            $('#div-alert-message').html(data.responseText+'<a class="close" onclick="esconderAlertaIcone(event)">×</a>');
            $('#div-alert-message').fadeIn();
            
        }
    });
}

function esconderAlertaIcone() {
    $('#div-alert-message').html("<a class='close' onclick='esconderAlert()'>×</a>");
    $('#div-alert-message').hide();
}

function esconderAlertBotaoVisualizar(event) {
    $(document).ready(function() {
        $("#button-visualizar").click(function() {
            $("#div-alert-message").hide();
        });
    });
}

$(document).ready(function () {
    var id_funcionario = GetURLParameter("id");

    if (id_funcionario) {
        $('#input-id').val(id_funcionario);
        visualizarFuncionario();
    }
});


