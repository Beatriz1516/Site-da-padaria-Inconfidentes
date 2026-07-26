// Importa a modulação de código (Removido o itens_produto.js estático)
import { renderizarCardapioCompleto } from './cardapio.js';
import { inicializarBarraPesquisa } from './barra_de_pesquisa.js';

// URL da implantação ativa do seu Google Apps Script
const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbzVzIuiR3-Lj1Fcyf38d23GtpZ-gTsa0oo9nQVfLaG4HCFYNun-05mkpmOx2R4rSGPd/exec";

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
// Substitua APENAS esta função no seu arquivo index.js (ou script da vitrine)
function enviarParaNavegador(id, titulo, preco, imagem) {
    try {
        let carrinhoLocal = JSON.parse(localStorage.getItem('carrinhoTemporario')) || [];

        // CORREÇÃO CRUCIAL AQUI:
        let precoNumerico;
        if (typeof preco === 'number') {
            // Se já for o número puro da planilha (ex: 5.00), mantém exatamente como está
            precoNumerico = preco;
        } else if (typeof preco === 'string') {
            // Se for uma string antiga (ex: "R$ 5,00"), limpa com cuidado
            if (preco.includes(',')) {
                // Se tem vírgula, limpa o ponto de milhar e troca a vírgula por ponto decimal
                precoNumerico = parseFloat(preco.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
            } else {
                // Se for uma string com ponto (ex: "5.00"), converte direto sem remover o ponto
                precoNumerico = parseFloat(preco.replace('R$', '').trim());
            }
        }

        // Se a conversão falhar por algum motivo, aplica um fallback de segurança
        if (isNaN(precoNumerico)) precoNumerico = 0.00;

        let produtoExistente = carrinhoLocal.find(item => parseInt(item.id) === parseInt(id));
        if (produtoExistente) {
            produtoExistente.quantidade += 1;
        } else {
            carrinhoLocal.push({
                id: parseInt(id), // Salva sempre como número inteiro
                nome: titulo,
                preco: precoNumerico, // Salva o preço decimal perfeito (ex: 5.00)
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

// Garante que a janela global enxergue a função corrigida
window.enviarParaNavegador = enviarParaNavegador;


// NOVA FUNÇÃO: Busca as informações em tempo real da planilha e renderiza a vitrine
async function iniciarVitrineSincronizada() {
    try {
        if (cardapioPrincipal) {
            cardapioPrincipal.innerHTML = "<p style='text-align:center; color:#777; padding:20px;'>Carregando cardápio da Padaria Inconfidente...</p>";
        }

        // Faz o pedido do tipo GET requisitando a ação de produtos
        const conexao = await fetch(`${URL_APPS_SCRIPT}?acao=produtos`);
        const itensDaPlanilha = await conexao.json();

        if (cardapioPrincipal) cardapioPrincipal.innerHTML = "";

        // Dispara a modulação nativa que você já possui passando os dados vivos do Sheets
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

// Inicializa o fluxo dinâmico assim que a página carregar por completo
window.addEventListener("DOMContentLoaded", iniciarVitrineSincronizada);
