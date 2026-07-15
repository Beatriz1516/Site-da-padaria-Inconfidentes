document.addEventListener('DOMContentLoaded', () => {
    verificarRastreamento();
    configurarBotaoRastreio();
});

function verificarRastreamento() {
    const pedidoSalvo = localStorage.getItem('ultimoPedidoRastreio');
    const secao = document.getElementById('secao-rastreio');
    
    if (pedidoSalvo && secao) {
        const pedido = JSON.parse(pedidoSalvo);
        
        // Torna o painel visível na Home
        secao.style.display = "flex";
        
        // Alimenta as tags com os dados reais salvos
        document.getElementById('rastreio-codigo').innerText = pedido.codigo;
        document.getElementById('rastreio-status').innerText = pedido.status;
    }
}

function configurarBotaoRastreio() {
    const btn = document.getElementById('btn-atualizar-rastreio');
    if (!btn) return;

    btn.onclick = function() {
        const pedidoSalvo = localStorage.getItem('ultimoPedidoRastreio');
        if (!pedidoSalvo) return;
        
        const pedido = JSON.parse(pedidoSalvo);
        
        // Fluxo de etapas sequenciais da Padaria Inconfidentes
        const etapas = [
            "Preparando seu pedido... 🥖",
            "Seu pão de queijo entrou no forno! 🔥",
            "Produtos quentinhos saindo na moto do entregador! 🛵",
            "Entregador buzinando no seu endereço! 🏠"
        ];
        
        let indiceAtual = etapas.indexOf(pedido.status);
        
        if (indiceAtual < etapas.length - 1) {
            pedido.status = etapas[indiceAtual + 1];
            localStorage.setItem('ultimoPedidoRastreio', JSON.stringify(pedido));
            verificarRastreamento(); // Atualiza a tela com o novo status
        } else {
            alert("Seu pedido já foi entregue! Esperamos que goste da fornada. ❤️");
            document.getElementById('secao-rastreio').style.display = "none";
            localStorage.removeItem('ultimoPedidoRastreio');
        }
    };
}
