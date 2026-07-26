const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbzVzIuiR3-Lj1Fcyf38d23GtpZ-gTsa0oo9nQVfLaG4HCFYNun-05mkpmOx2R4rSGPd/exec";

// Variável global para armazenar temporariamente os produtos vindos da planilha
let itensDoBanco = [];

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById('popup-detalhes');
    const btnFechar = document.getElementById('fechar-popup');
    const cardapioContainer = document.getElementById('cardapioPrincipal');

    if (!popup || !cardapioContainer) return;

    // INICIALIZAÇÃO: Busca os produtos na planilha do Google Sheets assim que a tela abre
    buscarProdutosDaPlanilha();

    // Escuta o clique na grade de produtos da vitrine
    cardapioContainer.addEventListener('click', (evento) => {
        const areaClicavel = evento.target.closest('.paoQClicavel');
        
        if (areaClicavel) {
            const idDoProduto = parseInt(areaClicavel.dataset.id);
            abrirPopup(idDoProduto);
        }
    });

    // NOVA FUNÇÃO: Faz o download dos dados do Sheets via método GET
    async function buscarProdutosDaPlanilha() {
        try {
            const resposta = await fetch(`${URL_APPS_SCRIPT}?acao=produtos`);
            itensDoBanco = await resposta.json();
            console.log("Banco de dados sincronizado com o pop-up de detalhes!");
        } catch (erro) {
            console.error("Falha ao sincronizar o estoque com o pop-up:", erro);
        }
    }

    // Abrir produto buscando as informações no array atualizado do banco
    function abrirPopup(idDoProduto) {
        // CORREÇÃO: Procura o item dentro de 'itensDoBanco' que veio da planilha
        const produto = itensDoBanco.find(p => p.id === idDoProduto);
        
        if (produto) {
            // CORREÇÃO DE PREÇO: Formata o preço numérico do Sheets para padrão de moeda R$
            let precoExibicao = typeof produto.preco === "number" 
                ? `R$ ${produto.preco.toFixed(2).replace('.', ',')}` 
                : produto.preco;

            document.getElementById('popup-imagem').src = produto.imagem;
            document.getElementById('popup-titulo').innerText = produto.titulo;
            document.getElementById('popup-preco').innerText = precoExibicao;
            
            const categoriaLimpa = produto.categoria.replace(/-/g, ' ');
            
            document.getElementById('popup-descricao').innerHTML = 
                `<p>${produto.descricao || 'Sem descrição cadastrada.'}</p>
                <p><strong>Categoria:</strong> ${categoriaLimpa}</p>
                <p><strong>Tempo estimado de preparo:</strong> ${produto.tempoDePreparo || 'Pronto'}</p>
                <p><strong>Ingredientes:</strong> ${produto.ingredientes || 'Padrão da casa.'}</p>
                <p><strong>Alérgenos:</strong> ${produto.alergicos || 'Não informado.'}</p>
                
                <!-- CORREÇÃO DO BOTÃO: Adiciona o evento de clique inline compatível com a função global window.enviarParaNavegador do seu index.js -->
                <a class="adiciona1AoCarrinho" onclick="window.enviarParaNavegador(${produto.id}, '${produto.titulo.replace(/'/g, "\\'")}', ${produto.preco}, '${produto.imagem}')">
                    Adicionar ao carrinho
                </a>`;
            
            const campoIngredientes = document.getElementById('popup-ingredientes');
            const campoAlergicos = document.getElementById('popup-alergicos');
            
            if (campoIngredientes) {
                campoIngredientes.textContent = `Ingredientes: ${produto.ingredientes || 'Padrão da casa.'}`;
            }
            if (campoAlergicos) {
                campoAlergicos.textContent = `Alérgenos: ${produto.alergicos || 'Não informado.'}`;
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