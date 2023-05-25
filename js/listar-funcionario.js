$(document).ready(listarFuncionarios);

function listarFuncionarios() {
    $.ajax({
        url: 'http://localhost:8080/api/funcionario/list',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            console.log(result);
            var html = '';
            $.each(result, function (i, data) {
                html += `<tr><td>` + data.id + `</td>`;
                html += `<td>` + data.matricula + `</td>`;
                html += `<td>` + data.nome + `</td>`;
                html += `<td>` + data.sexo + `</td>`;
                html += `<td>` + data.cpf + `</td>`;
                html += `<td>` + data.departamento + `</td>`;
                html += `<td>` + data.cargo + `</td>`;
                html += `<td>` + data.salario + `</td>`;
                html += `<td>` + data.nascimento + `</td>`;
                html += `<td>` + data.dataHoraCadastro + `</td>`;
                html += `<td><a href="editar-funcionario.html?id=` + data.id + `"><i class="bi bi-pencil-fill"></i></a>`;
                html += ` <a href="visualizar-funcionario.html?id=` + data.id + `"><i class="bi bi-search"></i></a>`;
                html += ` <a href="#" onclick="removerFuncionario(` + data.id + `)"><i class="bi bi-archive-fill"></i></a></td></tr>`;

                $("#tbListarFuncionariosBody").html(html);
            });

            let table = new DataTable('#tbListarFuncionarios');
        }
    });
}

function removerFuncionario(id) {
    var respostaPergunta = confirm("Confirma a exclusão?");
    if (respostaPergunta == true) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/api/funcionario/remove/' + id,
            dataType: 'json',
            success: function (result) {
                location.reload();
            },
            error: function (result) {
                alert(result);
            }
        });
    }
}