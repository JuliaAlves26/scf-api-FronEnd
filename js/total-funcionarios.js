$(document).ready(function() {
  console.log(btoa("kate:12345"));
    $.ajax({
      beforeSend: function (xhr){ 
        xhr.setRequestHeader("Authorization", "Basic "+btoa("kate:12345")); 
    },
      url: "http://localhost:8080/api/funcionario/total",
      success: function(result) {
        $("#total-funcionarios").text(result);
      },
      error: function() {
        $("#total-funcionarios").text("Erro ao obter o número de funcionários.");
      }
    });
  });
 