const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbzVzIuiR3-Lj1Fcyf38d23GtpZ-gTsa0oo9nQVfLaG4HCFYNun-05mkpmOx2R4rSGPd/exec";

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("login_token");
    const emailSalvo = localStorage.getItem("cliente_email");

    // Trava de segurança inicial
    if (token !== "usuario_autenticado" || !emailSalvo) {
        alert("Sessão expirada. Por favor, faça login novamente.");
        window.location.href = "./cadastro.html";
        return;
    }

    // Elementos da Interface (Visualização)
    const elNome = document.getElementById("exibirNome");
    const elEmail = document.getElementById("exibirEmail");
    const elWhats = document.getElementById("exibirWhats");
    const elEnd = document.getElementById("exibirEndereco");
    const elBairro = document.getElementById("exibirBairro");
    const elCidade = document.getElementById("exibirCidade");

    // Elementos da Interface (Formulário Oculto)
    const modoVis = document.getElementById("modoVisualizacao");
    const formEditar = document.getElementById("formEditarDados");
    const inpNome = document.getElementById("editarNome");
    const inpWhats = document.getElementById("editarWhats");
    const inpEnd = document.getElementById("editarEndereco");
    const inpBairro = document.getElementById("editarBairro");
    const inpCidade = document.getElementById("editarCidade");

    // Botões de Comando
    const btnAlterar = document.getElementById("btnAlterar");
    const btnCancelar = document.getElementById("btnCancelar");
    const btnSair = document.getElementById("btnSair");
    const btnSalvar = document.getElementById("btnSalvarDados");

    // Renderiza na tela os valores guardados no navegador do cliente
    function atualizarPainelVisual() {
        if (elNome) elNome.textContent = localStorage.getItem("cliente_nome") || "Não informado";
        if (elEmail) elEmail.textContent = emailSalvo;
        if (elWhats) elWhats.textContent = localStorage.getItem("cliente_whats") || "Não informado";
        if (elEnd) elEnd.textContent = localStorage.getItem("cliente_end") || "Não informado";
        if (elBairro) elBairro.textContent = localStorage.getItem("cliente_bairro") || "Não informado";
        if (elCidade) elCidade.textContent = localStorage.getItem("cliente_cidade") || "Não informado";
    }
    atualizarPainelVisual();

    // Evento: Clicar em "Alterar Dados" (Oculta texto, exibe Inputs)
    if (btnAlterar) {
        btnAlterar.addEventListener("click", () => {
            modoVis.style.display = "none";
            formEditar.style.display = "block";
            if (btnSair) btnSair.style.display = "none"; // Oculta o botão Sair para não quebrar o layout

            // Alimenta os inputs com o valor atual guardado no banco do navegador
            inpNome.value = localStorage.getItem("cliente_nome") || "";
            inpWhats.value = localStorage.getItem("cliente_whats") || "";
            inpEnd.value = localStorage.getItem("cliente_end") || "";
            inpBairro.value = localStorage.getItem("cliente_bairro") || "";
            inpCidade.value = localStorage.getItem("cliente_cidade") || "";
        });
    }

    // Evento: Clicar em "Cancelar" (Reverte a tela para o modo leitura)
    if (btnCancelar) {
        btnCancelar.addEventListener("click", () => {
            formEditar.style.display = "none";
            modoVis.style.display = "block";
            if (btnSair) btnSair.style.display = "block";
        });
    }

    // Evento: Submeter as alterações para a Planilha do Google Sheets
    if (formEditar) {
        formEditar.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            btnSalvar.disabled = true;
            btnSalvar.textContent = "Salvando no sistema...";

            const parametros = new URLSearchParams();
            parametros.append("acao", "editar");
            parametros.append("email", emailSalvo); // Identificador da linha na planilha
            parametros.append("nome", inpNome.value);
            parametros.append("whatsapp", inpWhats.value);
            parametros.append("endereco", inpEnd.value);
            parametros.append("bairro", inpBairro.value);
            parametros.append("cidade", inpCidade.value);

            try {
                const conexao = await fetch(URL_APPS_SCRIPT, {
                    method: "POST",
                    body: parametros
                });
                const respostaServidor = await conexao.text();

                if (respostaServidor.includes("Sucesso")) {
                    // Atualiza a memória local (LocalStorage)
                    localStorage.setItem("cliente_nome", inpNome.value);
                    localStorage.setItem("cliente_whats", inpWhats.value);
                    localStorage.setItem("cliente_end", inpEnd.value);
                    localStorage.setItem("cliente_bairro", inpBairro.value);
                    localStorage.setItem("cliente_cidade", inpCidade.value);

                    // Atualiza os spans na tela e fecha o formulário
                    atualizarPainelVisual();
                    alert("Informações atualizadas com sucesso na sua conta!");
                    
                    formEditar.style.display = "none";
                    modoVis.style.display = "block";
                    if (btnSair) btnSair.style.display = "block";
                } else {
                    alert("Erro retornado do servidor: " + respostaServidor);
                }
            } catch (erro) {
                console.error("Falha ao salvar dados:", erro);
                alert("Não foi possível conectar ao banco de dados. Tente novamente.");
            } finally {
                btnSalvar.disabled = false;
                btnSalvar.textContent = "Salvar Alterações";
            }
        });
    }

    // Evento: Clicar em "Sair da Conta" (Efetua o logout total)
    if (btnSair) {
        btnSair.addEventListener("click", () => {
            localStorage.clear(); // Limpa as credenciais do sistema de forma limpa
            alert("Sessão finalizada. Até logo!");
            window.location.href = "../index.html"; // Retorna à Home
        });
    }
});