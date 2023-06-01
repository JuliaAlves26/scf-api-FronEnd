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

function acionarEventosBotaoEditar() {
    visualizarFuncionario();
    esconderAlertaBotaoEditar();
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
            preencherCamposFuncionario(data);
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

function esconderAlertaBotaoEditar(event) {
    $(document).ready(function() {
        $("#button-editar").click(function() {
            $("#div-alert-message").hide();
        });
    });
}


function preencherCamposFuncionario(data) {

    console.log(data);
    
    $("#input-matricula").val(data.matricula);
    $("#input-nome").val(data.nome);
    $("#select-sexo").val(data.sexo);
    $("#input-cpf").val(data.cpf);
    $("#select-departamento").val(data.departamento);
    $("#select-departamento").change();
    $("#select-cargo").val(data.cargo);
    $("#input-salario").val(data.salario);
    $("#input-nascimento").val(formatDate(data.nascimento));
}

$(document).ready(function () {
    var id_funcionario = GetURLParameter("id");

    if (id_funcionario) {
        $('#input-id').val(id_funcionario);
        visualizarFuncionario();
    }
});

$('#form-editar-funcionario').submit(function (event) {
    event.preventDefault();

    var id = $('#input-id').val();
    if (!id) {
        alert('Por favor, preencha o campo ID');
        return;
    }

    var formData = {
        'id': id,
        'matricula': $('#input-matricula').val(),
        'nome': $('#input-nome').val(),
        'sexo': $('#select-sexo').val(),
        'cpf': $('#input-cpf').val(),
        'departamento': $('#select-departamento').val(),
        'cargo': $('#select-cargo').val(),
        'salario': $('#input-salario').val(),
        'nascimento': $('#input-nascimento').val(),
        'dataHoraCadastro': new Date().toISOString()
    };

    console.log(JSON.stringify(formData));

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'PUT',
        url: 'http://localhost:8080/api/funcionario/edit',
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (data) {
            location.href = 'listar-funcionarios.html';
        },
        error: function (data) {
            $('#div-alert-message').html(data.responseText+'<a class="close" onclick="esconderAlert(event)">×</a>');
            $('#div-alert-message').fadeIn();
   
        }
    });
});

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

$(document).ready(function () {
    var cargosPorDepartamento = {
        "TI": ["Engenheiro(a) de Software", "Engenheiro(a) de Dados", "UX Designer", "Estagiário(a)"],
        "Jurídico": ["Advogado(a)", "Estagiário(a)"],
        "Marketing": ["Analista", "Estagiário(a)"],
        "RH": ["Recruiter", "Diretor(a)", "Estagiário(a)"],
        "Financeiro": ["Contador(a)", "Economista", "Estagiário(a)"]
    };

    $('#select-departamento').change(function () {
        var departamentoSelecionado = $(this).val();
        var selectCargo = $('#select-cargo');

        selectCargo.empty();

        var cargos = cargosPorDepartamento[departamentoSelecionado];
        if (cargos) {
            cargos.forEach(function (cargo) {
                selectCargo.append($('<option>').val(cargo).text(cargo));
            });
        }
    });
});
