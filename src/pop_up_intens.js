import { itens } from './itens_produto.js';

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById('popup-detalhes');
    const btnFechar = document.getElementById('fechar-popup');
    const cardapioContainer = document.getElementById('cardapioPrincipal');

    if (!popup || !cardapioContainer) return;

    // 1. Escuta cliques em qualquer parte da lista de produtos
    cardapioContainer.addEventListener('click', (evento) => {
        // Encontra se o clique ocorreu dentro ou em cima da div clicável do produto
        const areaClicavel = evento.target.closest('.paoQ-clicavel');
        
        if (areaClicavel) {
            const idDoProduto = parseInt(areaClicavel.dataset.id);
            abrirPopup(idDoProduto);
        }
    });

    // 2. Preenche e exibe o popup dinamicamente
    function abrirPopup(idDoProduto) {
        const produto = itens.find(p => p.id === idDoProduto);
        
        if (produto) {
            document.getElementById('popup-imagem').src = produto.imagem;
            document.getElementById('popup-titulo').innerText = produto.titulo;
            document.getElementById('popup-preco').innerText = produto.preco;
            
            const categoriaLimpa = produto.categoria.replace(/-/g, ' ');
            document.getElementById('popup-descricao').innerText = 
                `Delicioso quitute artesanal da nossa categoria de ${categoriaLimpa}. Feito seguindo as receitas tradicionais com toda a qualidade mineira. Tempo estimado de preparo no balcão: ${produto.tempoDePreparo}.`;
            
            popup.classList.add('ativo');
        }
    }

    // 3. Gerencia o fechamento ao clicar no "X"
    if (btnFechar) {
        btnFechar.addEventListener('click', () => popup.classList.remove('ativo'));
    }
    
    // 4. Fecha ao clicar na área cinza escura de fora
    popup.addEventListener('click', (e) => {
        if (e.target === popup) popup.classList.remove('ativo');
    });
});
