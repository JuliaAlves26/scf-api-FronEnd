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

function esconderAlert() {
    $('#div-alert-message').html("<a class='close' onclick='esconderAlert()'>×</a>");
    $('#div-alert-message').hide();
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

function visualizarFuncionario() {
    var id = $('#input-id').val(); 

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
        error: function (error) {
            $('#div-alert-message').text('Erro ao obter os dados do funcionário').addClass('show');
        }
    });
}

$(document).ready(function () {
    var id_funcionario = GetURLParameter("id");

    if (id_funcionario !== null && id_funcionario !== undefined && id_funcionario !== '') {
        $('#input-id').val(id_funcionario);
        visualizarFuncionario();
    } else {
        $('#div-alert-message').text('ID do funcionário inválido').addClass('show');
    }
});
