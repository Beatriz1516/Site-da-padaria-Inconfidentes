window.onload = function() {
    renderizarCarrinho();
};

function renderizarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinhoTemporario')) || [];
    let container = document.getElementById('lista-carrinho');
    
    container.innerHTML = ""; 

    if (carrinho.length === 0) {
        container.innerHTML = "<p style='text-align:center; padding: 20px;'>Seu carrinho está vazio.</p>";
        atualizarTotais(0);
        return;
    }

    let subtotalGeral = 0;

    carrinho.forEach(item => {
        let valorTotalItem = item.preco * item.quantidade;
        subtotalGeral += valorTotalItem;

        // Cria a estrutura visual de cada linha de produto
        container.innerHTML += `
            <div class="card-item-carrinho" >
                <div class="cardImagem">
                    <img src="${item.imagem || 'placeholder.jpg'}" alt="${item.nome}" >
                    <div>
                        <h4>${item.nome}</h4>
                        <p>R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                    </div>
                </div>
                
                <div class="cardQuantidadeLixeira">
                    <!-- Botão de Lixeira para remover tudo -->
                    <button onclick="removerItemCompleto('${item.id}')">🗑️</button>
                    
                    <!-- Seletor de quantidade (- 1 +) -->
                    <div class="cardQuantidade">
                        <button onclick="alterarQuantidade('${item.id}', -1)" class="botao-quantidade">-</button>
                        <span class="quantidade">${item.quantidade}</span>
                        <button onclick="alterarQuantidade('${item.id}', 1)" class="botao-quantidade">+</button>
                    </div>
                </div>
            </div>
        `;
    });

    atualizarTotais(subtotalGeral);
}

function alterarQuantidade(id, modificador) {
    let carrinho = JSON.parse(localStorage.getItem('carrinhoTemporario')) || [];
    let item = carrinho.find(produto => produto.id == id);

    if (item) {
        item.quantidade += modificador;

        if (item.quantidade <= 0) {
            carrinho = carrinho.filter(produto => produto.id != id);
        }

        localStorage.setItem('carrinhoTemporario', JSON.stringify(carrinho));
        renderizarCarrinho(); 
    }
}

// Função para o botão da lixeira (remover o item direto)
function removerItemCompleto(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinhoTemporario')) || [];
    carrinho = carrinho.filter(produto => produto.id != id);
    
    localStorage.setItem('carrinhoTemporario', JSON.stringify(carrinho));
    renderizarCarrinho();
}

// Calcula os valores da entrega e faz a soma final do botão vermelho
function atualizarTotais(subtotal) {
    let taxaEntrega = subtotal > 0 ? 5.00 : 0.00; // Cobra 5 reais apenas se houver itens
    let taxaDesconto = 0.00; 
    let totalGeral = subtotal + taxaEntrega - taxaDesconto;

    // Atualiza os textos na tela formatando para a moeda Real (R$)
    document.getElementById('subtotal-valor').innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('entrega-valor').innerText = `R$ ${taxaEntrega.toFixed(2).replace('.', ',')}`;
    document.getElementById('desconto-valor').innerText = `R$ ${taxaDesconto.toFixed(2).replace('.', ',')}`;
    document.getElementById('total-botao').innerText = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
}

// Ação Avançar para o Pagamento
function avancarParaPagamento() {
    let carrinho = JSON.parse(localStorage.getItem('carrionario')) || JSON.parse(localStorage.getItem('carrinhoTemporario')) || [];

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! Adicione itens primeiro.");
        return;
    }

    console.log("Avançando com os seguintes itens:", carrinho);
    alert("Indo para o fechamento do pedido!");

}

