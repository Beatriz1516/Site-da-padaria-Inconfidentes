// Importa a modulação de código
import { renderizarCardapioCompleto } from './cardapio.js';
import { inicializarBarraPesquisa } from './barra_de_pesquisa.js';
import { itens } from './itens_produto.js';


// Seções
const mapeamentoCategorias = {
    "pao-de-queijo": { titulo: "Pão de Queijo", id: "secao-pao-de-queijo" },
    "cafes": { titulo: "Cafés", id: "secao-cafes" },
    "bebidas": { titulo: "Bebidas", id: "secao-bebidas" },
    "doces": { titulo: "Quitutes Doces", id: "secao-doces" },
    "salgados": { titulo: "Quitutes Salgados", id: "secao-salgados" },
    "quitutes-de-balcao": { titulo: "Quitutes de Balcão", id: "secao-quitutes" }
};
const cardapioPrincipal = document.getElementById("cardapioPrincipal");


// Salva na memória temporária do navegador
function enviarParaNavegador(id, titulo, preco, imagem) {
    try {
        let carrinhoLocal = JSON.parse(localStorage.getItem('carrinhoTemporario')) || [];
        let precoNumerico = typeof preco === 'string' 
            ? parseFloat(preco.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()) 
            : preco;

        let produtoExistente = carrinhoLocal.find(item => item.id === id);
        if (produtoExistente) {
            produtoExistente.quantidade += 1;
        } else {
            carrinhoLocal.push({
                id: id,
                nome: titulo,
                preco: precoNumerico,
                imagem: imagem,
                quantidade: 1
            });
        }

        localStorage.setItem('carrinhoTemporario', JSON.stringify(carrinhoLocal));
        
        alert(`"${titulo}" adicionado ao carrinho!`);

    } catch (erroLocal) {
        console.error("Erro ao salvar no carrinho local:", erroLocal);
        alert("Erro ao adicionar item ao carrinho.");
    }
}

renderizarCardapioCompleto(cardapioPrincipal, mapeamentoCategorias, itens, enviarParaNavegador);
inicializarBarraPesquisa();