export function inicializarBarraPesquisa() {
    const barraPesquisa = document.getElementById("input-busca") || document.querySelector(".search-bar");
    
    if (!barraPesquisa) return;

    // Função auxiliar para remover acentos e deixar o texto limpo
    const removerAcentos = (texto) => {
        return texto
            .normalize("NFD") // Separa as letras dos seus acentos
            .replace(/[\u0300-\u036f]/g, ""); // Remove todos os acentos
    };

    barraPesquisa.addEventListener("input", () => {
        const termoBusca = removerAcentos(barraPesquisa.value.toLowerCase().trim());
        const secoesCategorias = document.querySelectorAll(".paoDeQueijos");

        secoesCategorias.forEach((secao) => {
            const cardsProdutos = secao.querySelectorAll(".paoQ");
            let temProdutoVisivelNaSecao = false;

            cardsProdutos.forEach((card) => {
                const nomeProdutoOriginal = card.querySelector(".NomeProdutoCardapio").textContent;
                const nomeProdutoLimpo = removerAcentos(nomeProdutoOriginal.toLowerCase());

                // Compara os dois textos sem acentos (compatível com os dados vindos do Sheets)
                if (nomeProdutoLimpo.includes(termoBusca)) {
                    card.style.display = ""; 
                    temProdutoVisivelNaSecao = true; 
                } else {
                    card.style.display = "none"; 
                }
            });

            // Se a seção contiver algum produto correspondente à busca, ela continua na tela
            if (temProdutoVisivelNaSecao) {
                secao.style.display = "";
            } else {
                secao.style.display = "none";
            }
        });
    });
}

// =======================================================
// CONTROLE DO BOTÃO VOLTAR AO TOPO (AJUSTE DE SEGURANÇA)
// =======================================================
const botao = document.getElementById("btnTopo");

// CORREÇÃO: Executa a lógica de rolagem apenas se o botão de fato existir no HTML atual
if (botao) {
    window.addEventListener("scroll", () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            botao.style.display = "block";
        } else {
            botao.style.display = "none";
        }
    });

    botao.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
