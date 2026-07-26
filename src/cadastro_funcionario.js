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

            itemLi.innerHTML = `
                <div class="info-esquerda">
                    <span class="usuario-nome">${usuario.nome}</span>
                    <span class="usuario-email">${usuario.email}</span>
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
