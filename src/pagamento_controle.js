let temFrete = true; 
let formaPagamentoSelecionada = ""; 
const VALOR_FRETE = 5.00; 

window.onload = function() { 
    carregarResumoPedido(); 
    configurarBotoesModal(); 
}; 

function carregarResumoPedido() { 
    let carrinho = JSON.parse(localStorage.getItem('carrinhoTemporario')) || []; 
    let container = document.getElementById('lista-resumo-itens'); 
    let totalItensContador = 0; 
    let subtotal = 0; 
    
    // 1. Renderiza os itens caso o container de resumo exista (Tela de Checkout)
    if (container) {
        container.innerHTML = ""; 
        carrinho.forEach(item => { 
            subtotal += item.preco * item.quantidade; 
            totalItensContador += item.quantidade; 
            container.innerHTML += ` 
            <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 6px;"> 
                <span>${item.nome} ${item.quantidade > 1 ? `(${item.quantidade} unid.)` : ''}</span> 
                <span>R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span> 
            </div> `; 
        }); 
        
        if (temFrete && carrinho.length > 0) { 
            container.innerHTML += ` 
            <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 6px;"> 
                <span>Entrega</span> 
                <span>R$ ${VALOR_FRETE.toFixed(2).replace('.', ',')}</span> 
            </div> `; 
        } 
    } else {
        // Fallback para calcular valores mesmo sem o container visual na árvore DOM
        carrinho.forEach(item => { 
            subtotal += item.preco * item.quantidade; 
            totalItensContador += item.quantidade; 
        });
    }
    
    let freteAtual = temFrete ? VALOR_FRETE : 0.00; 
    let totalGeral = subtotal + freteAtual; 
    
    if (totalGeral < 0) totalGeral = 0; 
    
    // 2. Atualiza elementos da Tela de Checkout (Se existirem)
    if (document.getElementById('topo-itens')) document.getElementById('topo-itens').innerText = totalItensContador; 
    if (document.getElementById('topo-total')) document.getElementById('topo-total').innerText = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`; 
    if (document.getElementById('resumo-subtotal')) document.getElementById('resumo-subtotal').innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`; 
    if (document.getElementById('resumo-frete')) document.getElementById('resumo-frete').innerText = `R$ ${freteAtual.toFixed(2).replace('.', ',')}`; 
    if (document.getElementById('resumo-total')) document.getElementById('resumo-total').innerText = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`; 

    // 3. Atualiza elementos da Tela do Carrinho (Se existirem)
    if (document.getElementById('subtotal-valor')) document.getElementById('subtotal-valor').innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    if (document.getElementById('entrega-valor')) document.getElementById('entrega-valor').innerText = `R$ ${freteAtual.toFixed(2).replace('.', ',')}`;
    if (document.getElementById('total-botao')) document.getElementById('total-botao').innerText = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
}

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

// Auxiliar: Cria a string estruturada no padrão oficial do Pix
function gerarPixCopiaECola(nomeCliente, totalPedido) {
    let valorFormatado = parseFloat(totalPedido).toFixed(2);
    return `00020101021226580014br.gov.bcb.pix0114suachave@pix.com0215Pedido ${nomeCliente.substring(0, 7)}5204000053039865406${valorFormatado}5802BR5916Padaria Gourmet6009Origem62070503***6304A1B2`;
}

// Auxiliar: Gerencia as ações internas do Pop-up (Copiar e Fechar)
function configurarBotoesModal() {
    const btnCopiar = document.getElementById('btnCopiarPix');
    const btnFechar = document.getElementById('btnFecharPix');

    if (btnCopiar) {
        btnCopiar.onclick = function() {
            const textarea = document.getElementById('inputChavePix');
            textarea.select();
            textarea.setSelectionRange(0, 99999); // Mobile
            navigator.clipboard.writeText(textarea.value);
            
            this.innerText = "✓ Copiado!";
            this.style.background = "#218838";
            setTimeout(() => {
                this.innerText = "Copiar Código";
                this.style.background = "#32bcad";
            }, 2000);
        };
    }

    if (btnFechar) {
        btnFechar.onclick = function() {
            document.getElementById('meuModalPix').style.display = 'none';
            finalizarFluxoTotal();
        };
    }
}



function gerarCodigoPedido() {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numeros = "0123456789";
    let sufixo = "";
    
    for (let i = 0; i < 2; i++) {
        sufixo += letras.charAt(Math.floor(Math.random() * letras.length));
        sufixo += numeros.charAt(Math.floor(Math.random() * numeros.length));
    }
    
    const anoAtual = new Date().getFullYear();
    return `#PD-${anoAtual}-${sufixo}`;
}

function finalizarFluxoTotal() {
    const novoCodigo = gerarCodigoPedido();
    
    const dadosPedido = {
        codigo: novoCodigo,
        status: "Preparando seu pedido... ", // Status inicial
        data: new Date().toLocaleDateString('pt-BR'),
        formaPagamento: formaPagamentoSelecionada
    };
    
    localStorage.setItem('ultimoPedidoRastreio', JSON.stringify(dadosPedido));
    
    // Avisa o usuário sobre o código gerado
    alert(`Pedido confirmado!\nGuarde seu código de rastreamento: ${novoCodigo}`);

    // Limpa o carrinho temporário e redireciona
    localStorage.removeItem('carrinhoTemporario');
    window.location.href = "../index.html";
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
        alert("Por favor, escolha uma Forma de Pagamento!");
        return;
    }

    // DIRECIONAMENTO DE ACORDO COM A OPÇÃO ESCOLHIDA
    if (formaPagamentoSelecionada === 'Pix') {
        let totalTexto = document.getElementById('resumo-total').innerText;
        let totalValor = totalTexto.replace('R$ ', '').replace(',', '.').trim();
        
        // Alimenta e exibe o pop-up HTML
        document.getElementById('inputChavePix').value = gerarPixCopiaECola(nome, totalValor);
        document.getElementById('meuModalPix').style.display = 'flex';
    } 
    else if (formaPagamentoSelecionada === 'Cartão') {
        alert(`Obrigado ${nome}!\nA padaria o aguarda com a maquininha para realizar o pagamento.`);
        finalizarFluxoTotal();
    } 
    else if (formaPagamentoSelecionada === 'Na Entrega') {
        alert(`Obrigado ${nome}!\nSeu pedido em dinheiro foi finalizado e está sendo preparado.`);
        finalizarFluxoTotal();
    }
}
