if (localStorage.getItem("login_token") !== "funcionario_autenticado") {
    alert("Acesso negado! Esta página é exclusiva para funcionários autorizados.");
    window.location.href = "../index.html"; 
}

function fazerLogout() {
    localStorage.removeItem("login_token"); 
    window.location.href = "../index.html"; 
}