if (localStorage.getItem("login_token") !== "funcionario_autenticado") {
    alert("Acesso negado! Esta página é exclusiva para funcionários autorizados.");
    window.location.href = "../index.html"; 
}
function fazerLogout() {
    localStorage.removeItem("login_token"); 
    window.location.href = "../index.html"; 
}


const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbzVzIuiR3-Lj1Fcyf38d23GtpZ-gTsa0oo9nQVfLaG4HCFYNun-05mkpmOx2R4rSGPd/exec";

document.addEventListener("DOMContentLoaded", () => {
    buscarUsuariosDaPlanilha();
});

// Função auxiliar para formatar a data recebida da planilha
function formatarDataCadastro(dataString) {
    if (!dataString) return "Não informada";
    try {
        const data = new Date(dataString);
        // Verifica se a data é válida
        if (isNaN(data.getTime())) return dataString; 
        
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        
        return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
    } catch (e) {
        return dataString;
    }
}

// Busca de usuário
async function buscarUsuariosDaPlanilha() {
    const conteinerLista = document.getElementById("lista-usuarios-conteiner");
    const elementoCarregando = document.getElementById("carregando");

    try {
        const resposta = await fetch(URL_APPS_SCRIPT);
        const usuarios = await resposta.json();

        if (elementoCarregando) elementoCarregando.style.display = "none";

        if (!usuarios || usuarios.length === 0) {
            conteinerLista.innerHTML = `<li class="status-mensagem">Nenhum usuário cadastrado até o momento.</li>`;
            return;
        }

        conteinerLista.innerHTML = "";

        usuarios.forEach(usuario => {
            const itemLi = document.createElement("li");
            itemLi.className = "item-usuario";

            // Injeta o nome, email e a nova propriedade de data recebida do Apps Script
            itemLi.innerHTML = `
                <div class="info-esquerda">
                    <span class="usuario-nome">${usuario.nome}</span>
                    <span class="usuario-email">${usuario.email}</span>
                </div>
                <div class="info-direita" style="text-align: right; font-size: 0.85em; color: #666;">
                    <span style="display: block; font-weight: bold; color: var(--marrom-ouro, #8B5A2B);">Cadastrado em:</span>
                    <span>${usuario.dataCadastro}</span>
                </div>
            `;

            conteinerLista.appendChild(itemLi);
        });

    } catch (erro) {
        console.error("Erro ao importar dados da planilha:", erro);
        if (elementoCarregando) {
            elementoCarregando.textContent = "Falha ao carregar usuários. Verifique sua conexão ou a implantação do script.";
            elementoCarregando.style.color = "var(--marrom-ouro)";
        }
    }
}
