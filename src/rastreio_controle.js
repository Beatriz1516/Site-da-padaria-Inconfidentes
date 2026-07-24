document.addEventListener('DOMContentLoaded', () => {
    verificarRastreamento();
    configurarBotaoRastreio();
});

const ETAPAS_RASTREIO = [
    "Preparando seu pedido... ",
    "Seu pão de queijo entrou no forno! 🔥",
    "Produtos quentinhos saindo na moto do entregador! 🛵",
    "Entregador buzinando no seu endereço! 🏠"
];

// TEMPO DE 5 MINUTOS EM MILISEGUNDOS 
const TEMPO_ETAPA_MS = 5 * 60 * 1000; 

function formatarDataHora(timestamp) {
    const d = new Date(timestamp);
    const data = d.toLocaleDateString('pt-BR');
    const hora = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${data} às ${hora}`;
}

function verificarRastreamento() {
    const pedidoSalvo = localStorage.getItem('ultimoPedidoRastreio');
    const secao = document.getElementById('secao-rastreio');
    
    if (!pedidoSalvo || !secao) return;
    
    let pedido = JSON.parse(pedidoSalvo);
    const agora = Date.now();

    if (!pedido.ultimoStatusTimestamp) {
        pedido.ultimoStatusTimestamp = agora;
        pedido.historicoHorarios = { 0: agora }; 
        localStorage.setItem('ultimoPedidoRastreio', JSON.stringify(pedido));
    }

    let indiceAtual = ETAPAS_RASTREIO.indexOf(pedido.status);
    if (indiceAtual === -1) indiceAtual = 0;

    const tempoDecorrido = agora - pedido.ultimoStatusTimestamp;
    const etapasParaAvancar = Math.floor(tempoDecorrido / TEMPO_ETAPA_MS);

    if (etapasParaAvancar > 0 && indiceAtual < ETAPAS_RASTREIO.length - 1) {
        let novoIndice = indiceAtual + etapasParaAvancar;
        
        if (novoIndice >= ETAPAS_RASTREIO.length) {
            novoIndice = ETAPAS_RASTREIO.length - 1;
        }

        for (let i = indiceAtual + 1; i <= novoIndice; i++) {
            if (!pedido.historicoHorarios[i]) {
                pedido.historicoHorarios[i] = pedido.ultimoStatusTimestamp + ((i - indiceAtual) * TEMPO_ETAPA_MS);
            }
        }

        pedido.status = ETAPAS_RASTREIO[novoIndice];
        pedido.ultimoStatusTimestamp = pedido.ultimoStatusTimestamp + (etapasParaAvancar * TEMPO_ETAPA_MS);
        localStorage.setItem('ultimoPedidoRastreio', JSON.stringify(pedido));
        indiceAtual = novoIndice;
    }

    secao.style.display = "flex";
    
    document.getElementById('rastreio-codigo').innerText = pedido.codigo;
    document.getElementById('rastreio-status').innerText = pedido.status;

    const elementoDataHora = document.getElementById('rastreio-data-hora');
    if (elementoDataHora && pedido.historicoHorarios[indiceAtual]) {
        const horarioFase = pedido.historicoHorarios[indiceAtual];
        elementoDataHora.innerText = `Atualizado em: ${formatarDataHora(horarioFase)}`;
    }
}

function configurarBotaoRastreio() {
    const btn = document.getElementById('btn-atualizar-rastreio');
    if (!btn) return;

    btn.onclick = function() {
        verificarRastreamento();

        const pedidoSalvo = localStorage.getItem('ultimoPedidoRastreio');
        if (!pedidoSalvo) return;
        
        const pedido = JSON.parse(pedidoSalvo);
        const agora = Date.now();
        let indiceAtual = ETAPAS_RASTREIO.indexOf(pedido.status);
        
        if (indiceAtual >= ETAPAS_RASTREIO.length - 1) {
            alert("Seu pedido já foi entregue! Esperamos que goste da fornada. ❤️");
            document.getElementById('secao-rastreio').style.display = "none";
            localStorage.removeItem('ultimoPedidoRastreio');
            return;
        }

        const tempoDecorrido = agora - pedido.ultimoStatusTimestamp;
        const tempoRestanteMs = TEMPO_ETAPA_MS - tempoDecorrido;

        if (tempoRestanteMs > 0) {
            const minutosRestantes = Math.ceil(tempoRestanteMs / 1000 / 60);
            alert(`A cozinha está trabalhando! O status mudará automaticamente em aproximadamente ${minutosRestantes} minuto(s).`);
        }
    };
}
