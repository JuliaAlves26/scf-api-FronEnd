//Processar formulário

function esconderAlert() {
    $('#div-alert-message').html("<a class='close' onclick='esconderAlert()'>×</a>");
    $('#div-alert-message').hide();
}

$('#form-inserir-funcionario').submit(function (event) {

    event.preventDefault();

    nascimento = new Date($('#input-nascimento').val());

    //Criar formData
    var formData = {
        'matricula': $('#input-matricula').val(),
        'nome': $('#input-nome').val(),
        'sexo': $('#select-sexo').val(),
        'cpf': $('#input-cpf').val(),
        'departamento': $('#select-departamento').val(),
        'cargo': $('#select-cargo').val(),
        'salario': $('#input-salario').val(),
        'nascimento': nascimento.toISOString(),
        'dataHoraCadastro': new Date().toISOString()
    };

    console.log(JSON.stringify(formData));

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'POST',
        url: 'http://localhost:8080/api/funcionario/create',
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (data) {
            //console.log(data);
            location.href = 'listar-funcionarios.html';
        },
        error: function (data) {
            // $('#div-alert-message').prepend(data.responseText);
            $('#div-alert-message').html(data.responseText+'<a class="close" onclick="esconderAlert(event)">×</a>');
            $('#div-alert-message').fadeIn();
        }
    });
 });

//  function esconderAlert(event) {
//     event.stopPropagation();
//     $('#div-alert-message').html("<a class='close' onclick='esconderAlert(event)'>×</a>");
//     $('#div-alert-message').hide();
// }


 $(document).ready(function() {
    var cargosPorDepartamento = {
        "TI": ["Engenheiro(a) de Software", "Engenheiro(a) de Dados", "UX Designer", "Estagiário(a)"],
        "Jurídico": ["Advogado(a)", "Estagiário(a)"],
        "Marketing": ["Analista", "Estagiário(a)"],
        "RH": ["Recruiter", "Diretor(a)", "Estagiário(a)"],
        "Financeiro": ["Contador(a)", "Economista", "Estagiário(a)"]
    };

    $('#select-departamento').change(function() {
        var departamentoSelecionado = $(this).val();
        var selectCargo = $('#select-cargo');

        selectCargo.empty();

        var cargos = cargosPorDepartamento[departamentoSelecionado];
        if (cargos) {
            cargos.forEach(function(cargo) {
                selectCargo.append($('<option>').val(cargo).text(cargo));
            });
        }
    });
});