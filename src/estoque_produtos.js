// =================================================
// LISTA DE PRODUTOS SALVOS 
// =================================================
const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbzVzIuiR3-Lj1Fcyf38d23GtpZ-gTsa0oo9nQVfLaG4HCFYNun-05mkpmOx2R4rSGPd/exec";

window.addEventListener("DOMContentLoaded", () => {
    listarProdutosAdmin();
    configurarBotaoSair();
});

// Lista dos produtos
async function listarProdutosAdmin() {
    const grid = document.getElementById("listaAdminProdutos");
    if (!grid) return;
    grid.innerHTML = "<p>Buscando itens atualizados da planilha...</p>";

    try {
        const resposta = await fetch(`${URL_APPS_SCRIPT}?acao=produtos`);
        const produtos = await resposta.json();
        grid.innerHTML = "";

        if (produtos.length === 0) {
            grid.innerHTML = "<p>Nenhum produto cadastrado na planilha ainda.</p>";
            return;
        }

        produtos.forEach(prod => {
            const card = document.createElement("div");
            card.className = "card-estoque-admin";
            
            card.innerHTML = `
                <div>
                    <img src="${prod.imagem}" alt="">
                    <h4>${prod.titulo}</h4>
                    <p class="preco-estoque-admin">R$ ${parseFloat(prod.preco).toFixed(2).replace('.',',')}</p>
                    <p style="font-size:12px; color:#777; margin:4px 0;">Categoria: ${prod.categoria}</p>
                </div>
                <div class="container-botoes-card">
                    <button class="botao-sair btn-excluir-card btn-excluir-acao" data-id="${prod.id}">Excluir Item</button>
                </div>
            `;
            grid.appendChild(card);
        });

        configurarCliquesExcluir();

    } catch (e) {
        grid.innerHTML = "<p>Erro ao ler dados do banco de dados. Verifique a implantação.</p>";
    }
}

// Excluir produtos do estoque
function configurarCliquesExcluir() {
    document.querySelectorAll(".btn-excluir-acao").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const id = e.target.getAttribute("data-id");
            if (!confirm("Tem certeza que deseja apagar permanentemente este produto da planilha?")) return;

            const params = new URLSearchParams();
            params.append("acao", "excluir_produto");
            params.append("id", id);

            try {
                const res = await fetch(URL_APPS_SCRIPT, { method: "POST", body: params });
                const texto = await res.text();
                if (texto.includes("Sucesso")) {
                    alert("Produto removido com sucesso!");
                    listarProdutosAdmin(); 
                } else {
                    alert(texto);
                }
            } catch (e) {
                alert("Falha de conexão ao tentar deletar.");
            }
        });
    });
}

// Botão de voltar à página inicial do administrador
function configurarBotaoSair() {
    const btnSair = document.getElementById("btnSairAdmin");
    if (btnSair) {
        btnSair.addEventListener("click", () => {
            alert("Voltar ao painel administrativo");
            window.location.href = "./cadastro.html";
        });
    }
}
