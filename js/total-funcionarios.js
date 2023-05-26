$(document).ready(function() {
    $.ajax({
      url: "http://localhost:8080/api/funcionario/total",
      success: function(result) {
        $("#total-funcionarios").text(result);
      },
      error: function() {
        $("#total-funcionarios").text("Erro ao obter o número de funcionários.");
      }
    });
  });
 