document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("login_token");
    const nomeSalvo = localStorage.getItem("cliente_nome");
    const emailSalvo = localStorage.getItem("cliente_email");

    const elementoNome = document.getElementById("exibirNome");
    const elementoEmail = document.getElementById("exibirEmail");
    const btnSair = document.getElementById("btnSair");

    // CORREÇÃO: Caminho corrigido para ./cadastro.html (mesma pasta)
    if (token !== "usuario_autenticado" || !emailSalvo) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "./cadastro.html";
        return;
    }

    elementoNome.textContent = nomeSalvo ? nomeSalvo : "Cliente Cadastrado";
    elementoEmail.textContent = emailSalvo;

    btnSair.addEventListener("click", () => {
        localStorage.removeItem("login_token");
        localStorage.removeItem("cliente_nome");
        localStorage.removeItem("cliente_email");

        alert("Você saiu da sua conta com sucesso!");
        window.location.href = "../index.html"; 
    });
});
