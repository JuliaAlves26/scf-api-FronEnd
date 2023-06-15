$(document).ready(function() {
    totalDepartamentos();
  });
  
  function totalDepartamentos() {
    $.ajax({
      beforeSend: function (xhr){ 
        xhr.setRequestHeader("Authorization", "Basic "+btoa("kate:12345")); 
    },
      url: 'http://localhost:8080/api/funcionario/list',
      type: 'GET',
      dataType: 'json',
      success: function(result) {
        var departamentos = [];
        $.each(result, function(i, data) {
          if (!departamentos.includes(data.departamento)) {
            departamentos.push(data.departamento);
          }
        });
        var total = departamentos.length;
        if (total > 0) {
          $("#total-departamentos").text(total);
          
          var listaDepartamentos = '<ul>';
          $.each(departamentos, function(i, departamento) {
            listaDepartamentos += '<li>' + departamento + '</li>';
          });
          listaDepartamentos += '</ul>';
          $("#lista-departamentos").html(listaDepartamentos);
        } else {
          $("#total-departamentos").text('Nenhum departamento encontrado.');
          $("#lista-departamentos").text('Nenhum departamento encontrado.');
        }
      },
      error: function() {
        $("#total-departamentos").text('Erro ao obter a lista de departamentos.');
        $("#lista-departamentos").text('Erro ao obter a lista de departamentos.');
      }
    });
  }
  