export function renderizarCardapioCompleto(cardapioPrincipal, mapeamentoCategorias, itens, callbackAdicionarCarrinho) {
    if (!cardapioPrincipal) return;
    cardapioPrincipal.innerHTML = ""; 
    
    Object.keys(mapeamentoCategorias).forEach((chaveCategoria) => {
        const produtosDaCategoria = itens.filter(item => item.categoria === chaveCategoria);
        if (produtosDaCategoria.length === 0) return;

        const secaoDivisao = document.createElement("div");
        secaoDivisao.classList.add("paoDeQueijos");

        const dadosCategoria = mapeamentoCategorias[chaveCategoria];
        secaoDivisao.innerHTML = `
            <h2 id="${dadosCategoria.id}" class="tituloDaSecao">${dadosCategoria.titulo}</h2>
            <div class="grade-produtos"></div>
        `;

        const gradeProdutos = secaoDivisao.querySelector(".grade-produtos");
        produtosDaCategoria.forEach((item) => {
            const card = document.createElement("div");
            card.classList.add("paoQ");

            card.innerHTML = `
                <div class="paoQ-clicavel" data-id="${item.id}">
                    <img src="${item.imagem}" alt="${item.titulo}">
                    <div class="paoQContent">
                        <p class="NomeProdutoCardapio">${item.titulo}</p>
                        <p class="precoProduto">${item.preco}</p>
                    </div>
                </div>
                <div class="paoQContent">
                    <div class="complementosCardapio">
                        <p class="tempoDePreparo">${item.tempoDePreparo}</p>
                        <button class="adiciona1AoCarrinho">Adicionar</button>
                    </div>
                </div>
            `;

            const botaoAdicionar = card.querySelector(".adiciona1AoCarrinho");
            botaoAdicionar.addEventListener("click", () => {
    
                callbackAdicionarCarrinho(item.id, item.titulo, item.preco, item.imagem);
            });
            gradeProdutos.appendChild(card);
        });

        cardapioPrincipal.appendChild(secaoDivisao);
    });
}
