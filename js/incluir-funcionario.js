//Processar formulário
$('#form-inserir-funcionario').submit(function (event) {

    event.preventDefault();

    nascimento = new Date($('#input-nascimento').val());

    //Criar formData
    var formData = {
        'matricula': $('#input-matricula').val(),
        'nome': $('#input-nome').val(),
        'sexo': $('#input-sexo').val(),
        'cpf': $('#input-cpf').val(),
        'departamento': $('#input-departamento').val(),
        'cargo': $('#input-cargo').val(),
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
            $('#div-alert-message').prepend(data.responseText);
            $('#div-alert-message').fadeIn();
        }
    });
 });

 $(document).ready(function() {
    // Mapeamento dos cargos por departamento
    var cargosPorDepartamento = {
        "1": ["Engenheiro(a) de Software", "Engenheiro(a) de Dados", "UX Designer", "Estagiário(a)"],
        "2": ["Advogado(a)", "Estagiário(a)"],
        "3": ["Analista", "Diretor(a)", "Estagiário(a)"],
        "4": ["Analista de DP", "Diretor(a)", "Estagiário(a)"],
        "5": ["Contador(a)", "Economista", "Estagiário(a)"]
    };

    // Evento de mudança do campo "Departamento"
    $('#select-departamento').change(function() {
        var departamentoSelecionado = $(this).val();
        var selectCargo = $('#select-cargo');

        // Limpar as opções existentes
        selectCargo.empty();

        // Adicionar as opções de cargo do departamento selecionado
        var cargos = cargosPorDepartamento[departamentoSelecionado];
        if (cargos) {
            cargos.forEach(function(cargo) {
                selectCargo.append($('<option>').val(cargo).text(cargo));
            });
        }
    });
});