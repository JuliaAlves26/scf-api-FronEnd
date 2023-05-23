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

    // $.ajax({
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     type: 'POST',
    //     url: 'http://localhost:8080/api/funcionario/create',
    //     data: JSON.stringify(formData),
    //     dataType: 'json',
    //     success: function (data) {
    //         location.href = 'listar-funcionarios.html';
    //     },
    //     error: function (data) {
    //         $('#div-alert-message').prepend(data.responseText);
    //         $('#div-alert-message').fadeIn();
    //     }
    // });
 });