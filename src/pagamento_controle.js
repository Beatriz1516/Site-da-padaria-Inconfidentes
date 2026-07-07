// src/pagamento_controle.js

let temFrete = true;
let formaPagamentoSelecionada = "";
const VALOR_CUPOM = 2.00;
const VALOR_FRETE = 5.00;

window.onload = function() {
    carregarResumoPedido();
};

function carregarResumoPedido() {
    let carrinho = JSON.parse(localStorage.getItem('carrinhoTemporario')) || [];
    let container = document.getElementById('lista-resumo-itens');
    let totalItensContador = 0;
    let subtotal = 0;

    if (!container) return;
    container.innerHTML = "";

    carrinho.forEach(item => {
        subtotal += item.preco * item.quantidade;
        totalItensContador += item.quantidade;

        container.innerHTML += `
            <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 6px;">
                <span>${item.nome} ${item.quantidade > 1 ? `(${item.quantidade} unid.)` : ''}</span>
                <span>R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
            </div>
        `;
    });

    // Injeta a taxa de entrega no meio da lista se houver frete
    if (temFrete && carrinho.length > 0) {
        container.innerHTML += `
            <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 6px;">
                <span>Entrega</span>
                <span>R$ ${VALOR_FRETE.toFixed(2).replace('.', ',')}</span>
            </div>
        `;
    }

    // Atualiza cabeçalhos e rodapés matemáticos
    let freteAtual = temFrete ? VALOR_FRETE : 0.00;
    let totalGeral = (subtotal + freteAtual) - VALOR_CUPOM;
    if (totalGeral < 0) totalGeral = 0;

    document.getElementById('topo-itens').innerText = totalItensContador;
    document.getElementById('topo-total').innerText = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
    
    document.getElementById('resumo-subtotal').innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('resumo-frete').innerText = `R$ ${freteAtual.toFixed(2).replace('.', ',')}`;
    document.getElementById('resumo-total').innerText = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
}

// Controla a troca de abas Entrega vs Retirada
window.selecionarEntrega = function(opcao) {
    temFrete = opcao;
    document.getElementById('btn-entrega').classList.toggle('ativo', opcao);
    document.getElementById('btn-retirada').classList.toggle('ativo', !opcao);
    
    document.getElementById('campos-endereco').style.display = opcao ? 'block' : 'none';
    document.getElementById('frete-texto').innerText = opcao ? `R$ ${VALOR_FRETE.toFixed(2).replace('.', ',')}` : "Grátis";
    document.getElementById('tempo-texto').innerText = opcao ? "35-50 min" : "15 min (Pronto p/ retirar)";

    carregarResumoPedido();
}

window.selecionarPagamento = function(metodo) {
    formaPagamentoSelecionada = metodo;
    document.getElementById('pay-pix').classList.toggle('selecionado', metodo === 'Pix');
    document.getElementById('pay-cartao').classList.toggle('selecionado', metodo === 'Cartão');
    document.getElementById('pay-entrega').classList.toggle('selecionado', metodo === 'Na Entrega');
}

// Disparado ao clicar no botão "Confirmar e Enviar Pedido"
window.finalizarCompra = function() {
    let nome = document.getElementById('nome-cliente').value;
    let whats = document.getElementById('whatsapp-cliente').value;

    if (!nome || !whats) {
        alert("Por favor, preencha pelo menos Nome e WhatsApp para contato!");
        return;
    }
    if (!formaPagamentoSelecionada) {
        alert("Por favor, escolha uma Forma de Pagamento no Step 3!");
        return;
    }

    alert(`Obrigado ${nome}! Seu pedido foi enviado com sucesso via ${formaPagamentoSelecionada}.`);
    
    // Limpa o carrinho temporário após o fechamento absoluto da compra
    localStorage.removeItem('carrinhoTemporario');
    window.location.href = "../index.html"; 
}
