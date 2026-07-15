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

                // Compara os dois textos sem acentos
                if (nomeProdutoLimpo.includes(termoBusca)) {
                    card.style.display = ""; 
                    temProdutoVisivelNaSecao = true; 
                } else {
                    card.style.display = "none"; 
                }
            });

            if (temProdutoVisivelNaSecao) {
                secao.style.display = "";
            } else {
                secao.style.display = "none";
            }
        });
    });
}