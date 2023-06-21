$(document).ready(function() {
  //console.log(btoa("kate:12345"));
  let usuario = sessionStorage.getItem("usuario");
  let senha = sessionStorage.getItem("senha");

  if ((usuario == null) || (senha == null) || (usuario == undefined) || (senha == undefined)) {
    alert("Usuário não autenticado");
    location.href = "/login.html";
}

  $.ajax({
      beforeSend: function (xhr){ 
          xhr.setRequestHeader("Authorization", "Basic "+btoa(usuario+":"+senha)); 
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
 