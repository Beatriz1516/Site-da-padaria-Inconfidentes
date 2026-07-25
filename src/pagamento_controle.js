let temFrete = true; 
let formaPagamentoSelecionada = ""; 
const VALOR_FRETE = 5.00; 

// Garante o carregamento correto mapeando os eventos de clique modernos (pelo type="module")
window.addEventListener("DOMContentLoaded", () => {
    carregarDadosClienteLogado(); 
    carregarResumoPedido(); 
    configurarEventosBotoes(); 
}); 

// Busca e preenche TODOS os dados da planilha salvos no navegador do cliente
function carregarDadosClienteLogado() {
    const token = localStorage.getItem("login_token");

    // Seletores ajustados rigorosamente de acordo com os IDs do seu novo HTML
    const inputNome = document.getElementById("nome-cliente");
    const inputWhats = document.getElementById("whatsapp-cliente");
    const inputEmail = document.getElementById("email-cliente");
    const inputRua = document.getElementById("endereco-rua");
    const inputBairro = document.getElementById("endereco-bairro");
    const inputCidade = document.getElementById("endereco-cidade");

    if (token === "usuario_autenticado") {
        if (inputNome) inputNome.value = localStorage.getItem("cliente_nome") || "";
        if (inputWhats) inputWhats.value = localStorage.getItem("cliente_whats") || "";
        if (inputEmail) inputEmail.value = localStorage.getItem("cliente_email") || "";
        if (inputRua) inputRua.value = localStorage.getItem("cliente_end") || "";
        if (inputBairro) inputBairro.value = localStorage.getItem("cliente_bairro") || "";
        if (inputCidade) inputCidade.value = localStorage.getItem("cliente_cidade") || "";
        
        console.log("Todos os dados do cliente foram vinculados ao checkout.");
    }
}

function carregarResumoPedido() { 
    let carrinho = JSON.parse(localStorage.getItem('carrinhoTemporario')) || []; 
    let container = document.getElementById('lista-resumo-itens'); 
    let totalItensContador = 0; 
    let subtotal = 0; 
    
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
        carrinho.forEach(item => { 
            subtotal += item.preco * item.quantidade; 
            totalItensContador += item.quantidade; 
        });
    }
    
    let freteAtual = temFrete ? VALOR_FRETE : 0.00; 
    let totalGeral = subtotal + freteAtual; 
    
    if (totalGeral < 0) totalGeral = 0; 
    
    if (document.getElementById('topo-itens')) document.getElementById('topo-itens').innerText = totalItensContador; 
    if (document.getElementById('topo-total')) document.getElementById('topo-total').innerText = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`; 
    if (document.getElementById('resumo-subtotal')) document.getElementById('resumo-subtotal').innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`; 
    if (document.getElementById('resumo-frete')) document.getElementById('resumo-frete').innerText = `R$ ${freteAtual.toFixed(2).replace('.', ',')}`; 
    if (document.getElementById('resumo-total')) document.getElementById('resumo-total').innerText = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`; 
}

// Vincula as funções de controle de abas de forma segura usando EventListeners (Modo Type Module)
function configurarEventosBotoes() {
    const btnEntrega = document.getElementById('btn-entrega');
    const btnRetirada = document.getElementById('btn-retirada');
    const payPix = document.getElementById('pay-pix');
    const payCartao = document.getElementById('pay-cartao');
    const payEntrega = document.getElementById('pay-entrega');
    const btnConfirmar = document.getElementById('btn-confirmar-pedido');
    const btnCopiar = document.getElementById('btnCopiarPix');
    const btnFechar = document.getElementById('btnFecharPix');

    if (btnEntrega) btnEntrega.addEventListener('click', () => alternarFormatoEntrega(true));
    if (btnRetirada) btnRetirada.addEventListener('click', () => alternarFormatoEntrega(false));
    
    if (payPix) payPix.addEventListener('click', () => alternarMetodoPagamento('Pix'));
    if (payCartao) payCartao.addEventListener('click', () => alternarMetodoPagamento('Cartão'));
    if (payEntrega) payEntrega.addEventListener('click', () => alternarMetodoPagamento('Na Entrega'));

    if (btnConfirmar) btnConfirmar.addEventListener('click', processarCompraFinal);

    if (btnCopiar) {
        btnCopiar.addEventListener('click', function() {
            const textarea = document.getElementById('inputChavePix');
            textarea.select();
            textarea.setSelectionRange(0, 99999); 
            navigator.clipboard.writeText(textarea.value);
            
            this.innerText = "✓ Copiado!";
            this.style.background = "#218838";
            setTimeout(() => {
                this.innerText = "Copiar Código";
                this.style.background = ""; // Restaura a cor original do CSS
            }, 2000);
        });
    }

    if (btnFechar) {
        btnFechar.addEventListener('click', () => {
            document.getElementById('meuModalPix').style.display = 'none';
            finalizarFluxoTotal();
        });
    }
}

function alternarFormatoEntrega(opcao) {
    temFrete = opcao;
    document.getElementById('btn-entrega').classList.toggle('ativo', opcao);
    document.getElementById('btn-retirada').classList.toggle('ativo', !opcao);
    document.getElementById('campos-endereco').style.display = opcao ? 'block' : 'none';
    document.getElementById('frete-texto').innerText = opcao ? `R$ ${VALOR_FRETE.toFixed(2).replace('.', ',')}` : "Grátis";
    document.getElementById('tempo-texto').innerText = opcao ? "35-50 min" : "15 min (Pronto p/ retirar)";
    carregarResumoPedido();
}

function alternarMetodoPagamento(metodo) {
    formaPagamentoSelecionada = metodo;
    document.getElementById('pay-pix').classList.toggle('selecionado', metodo === 'Pix');
    document.getElementById('pay-cartao').classList.toggle('selecionado', metodo === 'Cartão');
    document.getElementById('pay-entrega').classList.toggle('selecionado', metodo === 'Na Entrega');
}

function gerarPixCopiaECola(nomeCliente, totalPedido) {
    let valorFormatado = parseFloat(totalPedido).toFixed(2);
    return `00020101021226580014br.gov.bcb.pix0114suachave@pix.com0215Pedido ${nomeCliente.substring(0, 7)}5204000053039865406${valorFormatado}5802BR5916Padaria Gourmet6009Origem62070503***6304A1B2`;
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
        status: "Preparando seu pedido... ", 
        data: new Date().toLocaleDateString('pt-BR'),
        formaPagamento: formaPagamentoSelecionada
    };
    
    localStorage.setItem('ultimoPedidoRastreio', JSON.stringify(dadosPedido));
    
    alert(`Pedido confirmado!\nGuarde seu código de rastreamento: ${novoCodigo}`);

    localStorage.removeItem('carrinhoTemporario');
    window.location.href = "../index.html";
}

function processarCompraFinal() { 
    let nome = document.getElementById("nome-cliente").value; 
    let whats = document.getElementById("whatsapp-cliente").value; 
    
    if (!nome || !whats) { 
        alert("Por favor, preencha pelo menos Nome e WhatsApp para contato!"); 
        return; 
    } 
    if (!formaPagamentoSelecionada) { 
        alert("Por favor, escolha uma Forma de Pagamento!"); 
        return; 
    } 
    
    // Sincroniza edições feitas diretamente na tela do checkout com o LocalStorage do cliente logado
    if (localStorage.getItem("login_token") === "usuario_autenticado") {
        localStorage.setItem("cliente_nome", nome);
        localStorage.setItem("cliente_whats", whats);
        localStorage.setItem("cliente_email", document.getElementById("email-cliente").value);
        localStorage.setItem("cliente_end", document.getElementById("endereco-rua").value);
        localStorage.setItem("cliente_bairro", document.getElementById("endereco-bairro").value);
        localStorage.setItem("cliente_cidade", document.getElementById("endereco-cidade").value);
    }

    if (formaPagamentoSelecionada === "Pix") { 
        let totalTexto = document.getElementById("resumo-total").innerText; 
        let totalValor = totalTexto.replace("R$", "").replace(",", ".").trim(); 
        
        document.getElementById("inputChavePix").value = gerarPixCopiaECola(nome, totalValor); 
        document.getElementById("meuModalPix").style.display = "flex"; 
    } else if (formaPagamentoSelecionada === "Cartão") { 
        alert(`Obrigado ${nome}!\nA padaria o aguarda com a maquininha para realizar o pagamento.`); 
        finalizarFluxoTotal(); 
     } else if (formaPagamentoSelecionada === "Na Entrega") { 
        alert(`Obrigado ${nome}!\nSeu pedido em dinheiro foi finalizado e está sendo preparado.`);
        finalizarFluxoTotal();
    }
}