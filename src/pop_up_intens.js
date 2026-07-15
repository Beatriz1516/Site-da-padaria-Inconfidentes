import { itens } from './itens_produto.js';

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById('popup-detalhes');
    const btnFechar = document.getElementById('fechar-popup');
    const cardapioContainer = document.getElementById('cardapioPrincipal');

    if (!popup || !cardapioContainer) return;

    cardapioContainer.addEventListener('click', (evento) => {
        const areaClicavel = evento.target.closest('.paoQ-clicavel');
        
        if (areaClicavel) {
            const idDoProduto = parseInt(areaClicavel.dataset.id);
            abrirPopup(idDoProduto);
        }
    });

    
    // Abrir produto
    function abrirPopup(idDoProduto) {
        const produto = itens.find(p => p.id === idDoProduto);
        
        if (produto) {
            document.getElementById('popup-imagem').src = produto.imagem;
            document.getElementById('popup-titulo').innerText = produto.titulo;
            document.getElementById('popup-preco').innerText = produto.preco;
            
            const categoriaLimpa = produto.categoria.replace(/-/g, ' ');
            
            document.getElementById('popup-descricao').innerHTML = 
                `<p>${produto.descricao}</p>
                <p><strong>Categoria:</strong> ${categoriaLimpa}</p>
                <p><strong>Tempo estimado de preparo:</strong> ${produto.tempoDePreparo}</p>
                <p><strong>Ingredientes:</strong> ${produto.ingredientes}</p>
                <p><strong>Alérgenos:</strong> ${produto.alergicos}</p>`;
            
            const campoIngredientes = document.getElementById('popup-ingredientes');
            const campoAlergicos = document.getElementById('popup-alergicos');
            
            if (campoIngredientes) {
                campoIngredientes.textContent = `Ingredientes: ${produto.ingredientes}`;
            }
            if (campoAlergicos) {
                campoAlergicos.textContent = `Alérgenos: ${produto.alergicos}`;
            }
            
            popup.classList.add('ativo');
        }
    }

    if (btnFechar) {
        btnFechar.addEventListener('click', () => popup.classList.remove('ativo'));
    }
    
    popup.addEventListener('click', (e) => {
        if (e.target === popup) popup.classList.remove('ativo');
    });
});
