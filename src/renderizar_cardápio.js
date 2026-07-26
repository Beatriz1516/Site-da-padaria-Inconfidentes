// =================================================
// RENDERIZAÇÃO DO CARDÁPIO DE PRODUTOS
// =================================================
import { renderizarCardapioCompleto } from './cardapio.js';
import { inicializarBarraPesquisa } from './barra_de_pesquisa.js';

const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbzVzIuiR3-Lj1Fcyf38d23GtpZ-gTsa0oo9nQVfLaG4HCFYNun-05mkpmOx2R4rSGPd/exec";

// Categorias de produtos
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

        let precoNumerico;
        if (typeof preco === 'number') {
            precoNumerico = preco;
        } else if (typeof preco === 'string') {
            if (preco.includes(',')) {
                precoNumerico = parseFloat(preco.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
            } else {
                precoNumerico = parseFloat(preco.replace('R$', '').trim());
            }
        }

        if (isNaN(precoNumerico)) precoNumerico = 0.00;

        let produtoExistente = carrinhoLocal.find(item => parseInt(item.id) === parseInt(id));
        if (produtoExistente) {
            produtoExistente.quantidade += 1;
        } else {
            carrinhoLocal.push({
                id: parseInt(id),
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

window.enviarParaNavegador = enviarParaNavegador;


// Vitrine de produtos adicionados pelo funcionário
async function iniciarVitrineSincronizada() {
    try {
        if (cardapioPrincipal) {
            cardapioPrincipal.innerHTML = "<p style='text-align:center; color:#777; padding:20px;'>Carregando cardápio da Padaria Inconfidente...</p>";
        }

        const conexao = await fetch(`${URL_APPS_SCRIPT}?acao=produtos`);
        const itensDaPlanilha = await conexao.json();

        if (cardapioPrincipal) cardapioPrincipal.innerHTML = "";

        renderizarCardapioCompleto(cardapioPrincipal, mapeamentoCategorias, itensDaPlanilha, enviarParaNavegador);
        inicializarBarraPesquisa();

        console.log("Cardápio sincronizado com o Sheets com sucesso!");

    } catch (erroConexao) {
        console.error("Erro ao buscar o estoque da planilha:", erroConexao);
        if (cardapioPrincipal) {
            cardapioPrincipal.innerHTML = "<p style='text-align:center; color:#dc3545; padding:20px;'>Não foi possível carregar os produtos do cardápio no momento.</p>";
        }
    }
}

window.addEventListener("DOMContentLoaded", iniciarVitrineSincronizada);
