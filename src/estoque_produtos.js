// =================================================
// LISTA DE PRODUTOS SALVOS 
// =================================================
const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbzVzIuiR3-Lj1Fcyf38d23GtpZ-gTsa0oo9nQVfLaG4HCFYNun-05mkpmOx2R4rSGPd/exec";

window.addEventListener("DOMContentLoaded", () => {
    listarProdutosAdmin();
    configurarBotaoSair();
    configurarCliqueContainerGeral(); // Nova abordagem de clique robusta
});

// Lista os produtos buscando direto do Google Sheets
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
                    <img src="${prod.imagem}" 
                        alt="${prod.titulo}" 
                        onerror="this.onerror=null; this.src='https://placehold.co';"
                        style="width:100%; max-width:150px; height:150px; object-fit:cover; border-radius:8px;">
                    <h4>${prod.titulo}</h4>
                    <p class="preco-estoque-admin">R$ ${parseFloat(prod.preco).toFixed(2).replace('.',',')}</p>
                    <p style="font-size:12px; color:#777; margin:4px 0;">Categoria: ${prod.categoria}</p>
                </div>
                <div class="container-botoes-card">
                    <!-- Mantido a classe identificadora e o data-id do produto -->
                    <button class="botao-sair btn-excluir-card btn-excluir-acao" data-id="${prod.id}">Excluir Item</button>
                </div>
            `;
            grid.appendChild(card);
        });

    } catch (e) {
        grid.innerHTML = "<p>Erro ao ler dados do banco de dados. Verifique a implantação.</p>";
    }
}

function configurarCliqueContainerGeral() {
    const grid = document.getElementById("listaAdminProdutos");
    if (!grid) return;

    grid.addEventListener("click", async (e) => {
        const botaoExcluir = e.target.closest(".btn-excluir-acao");
        
        if (!botaoExcluir) return;

        const id = botaoExcluir.getAttribute("data-id");
        if (!id) {
            alert("Erro: ID do produto não mapeado no botão.");
            return;
        }

        if (!confirm(`Tem certeza que deseja apagar permanentemente o produto ID ${id} da planilha?`)) return;

        botaoExcluir.disabled = true;
        botaoExcluir.textContent = "Excluindo...";

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
                alert("Erro ao excluir: " + texto);
                botaoExcluir.disabled = false;
                botaoExcluir.textContent = "Excluir Item";
            }
        } catch (erro) {
            alert("Falha de conexão com o Google Sheets ao tentar deletar.");
            botaoExcluir.disabled = false;
            botaoExcluir.textContent = "Excluir Item";
        }
    });
}

// Botão para retornar ao painel
function configurarBotaoSair() {
    const btnSair = document.getElementById("btnSairAdmin");
    if (btnSair) {
        btnSair.addEventListener("click", () => {
            window.location.href = "./cadastro.html";
        });
    }
}