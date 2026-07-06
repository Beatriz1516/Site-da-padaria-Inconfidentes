
// Executa automaticamente assim que a página do carrinho abre
window.onload = function() {
    renderizarCarrinho();
};

// Função principal para desenhar os itens na tela
function renderizarCarrinho() {
    // 1. Pega os produtos salvos pelo botão '+' da outra página
    let carrinho = JSON.parse(localStorage.getItem('carrinhoTemporario')) || [];
    let container = document.getElementById('lista-carrinho');
    
    // Limpa o container antes de desenhar para evitar repetições
    container.innerHTML = ""; 

    if (carrinho.length === 0) {
        container.innerHTML = "<p style='text-align:center; padding: 20px;'>Seu carrinho está vazio.</p>";
        atualizarTotais(0);
        return;
    }

    let subtotalGeral = 0;

    // 2. Passa por cada produto e cria a estrutura HTML idêntica à imagem
    carrinho.forEach(item => {
        let valorTotalItem = item.preco * item.quantidade;
        subtotalGeral += valorTotalItem;

        // Cria a estrutura visual de cada linha de produto
        container.innerHTML += `
            <div class="card-item-carrinho" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #f0f0f0;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="${item.imagem || 'placeholder.jpg'}" alt="${item.nome}" style="width: 70px; height: 70px; border-radius: 8px; object-fit: cover;">
                    <div>
                        <h4 style="margin: 0 0 5px 0; color: #4a3319;">${item.nome}</h4>
                        <p style="margin: 0; color: #7a7a7a; font-weight: bold;">R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                    </div>
                </div>
                
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 10px;">
                    <!-- Botão de Lixeira para remover tudo -->
                    <button onclick="removerItemCompleto('${item.id}')" style="background: none; border: none; cursor: pointer; color: #999;">🗑️</button>
                    
                    <!-- Seletor de quantidade (- 1 +) -->
                    <div style="display: flex; align-items: center; border: 1px solid #ccc; border-radius: 20px; padding: 2px 8px; background: #fff;">
                        <button onclick="alterarQuantidade('${item.id}', -1)" style="background: none; border: none; font-size: 16px; cursor: pointer; padding: 0 5px;">-</button>
                        <span style="margin: 0 10px; font-weight: bold;">${item.quantidade}</span>
                        <button onclick="alterarQuantidade('${item.id}', 1)" style="background: none; border: none; font-size: 16px; cursor: pointer; padding: 0 5px;">+</button>
                    </div>
                </div>
            </div>
        `;
    });

    // 3. Atualiza os campos de texto do rodapé e do botão vermelho
    atualizarTotais(subtotalGeral);
}

// Função para aumentar ou diminuir a quantidade nos botões - e +
function alterarQuantidade(id, modificador) {
    let carrinho = JSON.parse(localStorage.getItem('carrinhoTemporario')) || [];
    let item = carrinho.find(produto => produto.id === id);

    if (item) {
        item.quantidade += modificador;

        // Se a quantidade for menor que 1, remove o produto automaticamente
        if (item.quantidade <= 0) {
            carrinho = carrinho.filter(produto => produto.id !== id);
        }

        localStorage.setItem('carrinhoTemporario', JSON.stringify(carrinho));
        renderizarCarrinho(); // Recarrega a tela atualizada
    }
}

// Função para o botão da lixeira (remover o item direto)
function removerItemCompleto(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinhoTemporario')) || [];
    carrinho = carrinho.filter(produto => produto.id !== id);
    
    localStorage.setItem('carrinhoTemporario', JSON.stringify(carrinho));
    renderizarCarrinho();
}

// Calcula os valores da entrega e faz a soma final do botão vermelho
function atualizarTotais(subtotal) {
    let taxaEntrega = subtotal > 0 ? 8.00 : 0.00; // Cobra 8 reais apenas se houver itens
    let taxaDesconto = 0.00; 
    let totalGeral = subtotal + taxaEntrega - taxaDesconto;

    // Atualiza os textos na tela formatando para a moeda Real (R$)
    document.getElementById('subtotal-valor').innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('entrega-valor').innerText = `R$ ${taxaEntrega.toFixed(2).replace('.', ',')}`;
    document.getElementById('desconto-valor').innerText = `R$ ${taxaDesconto.toFixed(2).replace('.', ',')}`;
    document.getElementById('total-botao').innerText = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
}

// Ação final ao clicar no botão vermelho ("Avançar para o Pagamento")
function avancarParaPagamento() {
    let carrinho = JSON.parse(localStorage.getItem('carrionario')) || JSON.parse(localStorage.getItem('carrinhoTemporario')) || [];

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! Adicione itens primeiro.");
        return;
    }

    // Exibe no console os dados finais que estão prontos para envio posterior
    console.log("Avançando com os seguintes itens:", carrinho);
    alert("Indo para o fechamento do pedido!");

    // IMPORTANTE: Aqui os dados ficam salvos até você processar o pagamento final.
    // Depois que criar a lógica da planilha ou banco, você limpa usando:
    // localStorage.removeItem('carrinhoTemporario');
}

