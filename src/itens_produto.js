// Array de dados 
export const itens = [
    { 
        id: 1, 
        categoria: "pao-de-queijo", 
        imagem: "../imagens/pao_de_queijo_radicional.jfif", 
        titulo: "Pão de queijo tradicional - médio", 
        preco: "R$ 5,00", 
        tempoDePreparo: "5 min",
        descricao: "O clássico mineiro, crocante por fora e incrivelmente macio por dentro.",
        ingredientes: "Polvilho azedo, queijo minas curado, leite integral, ovos caipiras, óleo e sal.",
        alergicos: "Contém ovos, derivados de leite e lactose. Não contém glúten."
    },
    { 
        id: 2, 
        categoria: "pao-de-queijo", 
        imagem: "../imagens/pão_de_queijo_slider.jfif", 
        titulo: "Pão de queijo lanche - grande", 
        preco: "R$ 8,50", 
        tempoDePreparo: "8 min",
        descricao: "Versão generosa perfeita para matar a fome ou rechear como você preferir.",
        ingredientes: "Polvilho azedo, queijo minas curado, leite integral, ovos caipiras, óleo e sal.",
        alergicos: "Contém ovos, derivados de leite e lactose. Não contém glúten."
    },
    { 
        id: 3, 
        categoria: "pao-de-queijo", 
        imagem: "../imagens/pao_de_queijo_coquitel.jfif", 
        titulo: "Pão de queijo coquitel - mini", 
        preco: "R$ 3,50", 
        tempoDePreparo: "5 min",
        descricao: "Porção individual do nosso pão de queijo em formato menor, ideal para beliscar.",
        ingredientes: "Polvilho azedo, queijo minas curado, leite integral, ovos caipiras, óleo e sal.",
        alergicos: "Contém ovos, derivados de leite e lactose. Não contém glúten."
    },
    { 
        id: 4, 
        categoria: "pao-de-queijo", 
        imagem: "../imagens/pao_de_queijo_de_canastra.png", 
        titulo: "Pão de queijo de canastra", 
        preco: "R$ 7,50", 
        tempoDePreparo: "6 min",
        descricao: "Sabor marcante e intenso feito exclusivamente com o legítimo queijo da Serra da Canastra.",
        ingredientes: "Polvilho selecionado, queijo Canastra legítimo, leite, ovos caipiras e manteiga.",
        alergicos: "Contém ovos, derivados de leite e lactose. Não contém glúten."
    },
    { 
        id: 5, 
        categoria: "pao-de-queijo", 
        imagem: "../imagens/blend_de_tres_queijos.jfif", 
        titulo: "Blend de três queijos", 
        preco: "R$ 9,00", 
        tempoDePreparo: "7 min",
        descricao: "Uma explosão de sabor que combina queijo Canastra, provolone defumado e parmesão.",
        ingredientes: "Polvilho, queijo canastra, provolone, parmesão, ovos, leite e manteiga.",
        alergicos: "Contém ovos, derivados de leite e lactose. Não contém glúten."
    },
    { 
        id: 6, 
        categoria: "pao-de-queijo", 
        imagem: "../imagens/Pao_de_queijo_com_requeijao_de_corte.jfif", 
        titulo: "Pão de queijo com requeijão de corte", 
        preco: "R$ 9,50", 
        tempoDePreparo: "6 min",
        descricao: "Nosso pão de queijo tradicional recheado com uma fatia generosa de requeijão de corte mineiro.",
        ingredientes: "Massa de pão de queijo tradicional e requeijão de corte artesanal.",
        alergicos: "Contém ovos, derivados de leite e lactose. Não contém glúten."
    },
    { 
        id: 7, 
        categoria: "pao-de-queijo", 
        imagem: "../imagens/pao_de_queijo_com_carne_desfiada.jfif", 
        titulo: "Pão de queijo com carne seca desfiada", 
        preco: "R$ 14,00", 
        tempoDePreparo: "12 min",
        descricao: "Combinação perfeita da culinária afetiva: pão de queijo crocante com carne seca bem temperadinha.",
        ingredientes: "Massa de pão de queijo tradicional, carne seca desfiada, cebola e temperos da casa.",
        alergicos: "Contém ovos, derivados de leite e lactose. Não contém glúten."
    },
    { 
        id: 8, 
        categoria: "pao-de-queijo", 
        imagem: "../imagens/pao_de_queijo_romeu_e_julieta.jfif", 
        titulo: "Pão de queijo Romeu e Julieta", 
        preco: "R$ 9,00", 
        tempoDePreparo: "6 min",
        descricao: "O clássico casamento mineiro do queijo salgadinho com o doce da goiabada cascão.",
        ingredientes: "Massa de pão de queijo tradicional, recheio de goiabada cascão artesanal.",
        alergicos: "Contém ovos, derivados de leite e lactose. Não contém glúten."
    },
    { 
        id: 9, 
        categoria: "pao-de-queijo", 
        imagem: "../imagens/pao_de_queijo_doce.jfif", 
        titulo: "Pão de queijo com doce de leite viçosa", 
        preco: "R$ 9,50", 
        tempoDePreparo: "6 min",
        descricao: "Recheado fartamente com o premiado e cremoso doce de leite Viçosa.",
        ingredientes: "Massa de pão de queijo tradicional e doce de leite Viçosa puro.",
        alergicos: "Contém ovos, derivados de leite e lactose. Não contém glúten."
    },
    { 
        id: 10, 
        categoria: "pao-de-queijo", 
        imagem: "../imagens/pao_de_queijo_zero_lactose.jfif", 
        titulo: "Pão de queijo zero lactose", 
        preco: "R$ 6,00", 
        tempoDePreparo: "5 min",
        descricao: "Todo o sabor e a textura do verdadeiro pão de queijo mineiro em uma versão sem lactose.",
        ingredientes: "Polvilho, queijo minas padrão zero lactose, leite zero lactose, ovos e óleo.",
        alergicos: "Contém ovos. Não contém lactose. Não contém glúten."
    },
    { 
        id: 11, 
        categoria: "cafes", 
        imagem: "../imagens/cafe_coado_na_hora.jfif", 
        titulo: "Café passado na hora", 
        preco: "R$ 4,50", 
        tempoDePreparo: "4 min",
        descricao: "Café de grãos selecionados, moído e coado no mudo na hora para exalar o melhor aroma.",
        ingredientes: "Grãos de café especial torrado e moído, água filtrada.",
        alergicos: "Não contém alérgenos comuns. Não contém glúten."
    },
    { 
        id: 12, 
        categoria: "cafes", 
        imagem: "../imagens/cafe_pingado.jfif", 
        titulo: "Café pingado", 
        preco: "R$ 5,50", 
        tempoDePreparo: "3 min",
        descricao: "O tradicional café forte com apenas um 'pingado' de leite quente espumado.",
        ingredientes: "Café coado concentrado e leite integral aquecido.",
        alergicos: "Contém leite e lactose. Não contém glúten."
    },
    { 
        id: 13, 
        categoria: "cafes", 
        imagem: "../imagens/cafe_com_leite.jfif", 
        titulo: "Café com leite - médio", 
        preco: "R$ 6,50", 
        tempoDePreparo: "3 min",
        descricao: "A mistura equilibrada perfeita para acompanhar o seu pão de queijo pela manhã.",
        ingredientes: "Café especial e leite integral na mesma proporção.",
        alergicos: "Contém leite e lactose. Não contém glúten."
    },
    { 
        id: 14, 
        categoria: "cafes", 
        imagem: "../imagens/mocha_mineiro.jfif", 
        titulo: "Mocha mineiro", 
        preco: "R$ 9,50", 
        tempoDePreparo: "5 min",
        descricao: "Café expresso misturado com leite vaporizado e uma calda artesanal de doce de leite.",
        ingredientes: "Café expresso, leite integral, doce de leite artesanal e toque de cacau.",
        alergicos: "Contém derivados de leite e lactose. Não contém glúten."
    },
    { 
        id: 15, 
        categoria: "cafes", 
        imagem: "../imagens/cappuccino_dona_sinha.jfif", 
        titulo: "Cappuccino Dona Sinhá", 
        preco: "R$ 11,00", 
        tempoDePreparo: "5 min",
        descricao: "Receita exclusiva da casa com toque sutil de canela, chocolate mineiro e muita cremosidade.",
        ingredientes: "Café expresso, leite vaporizado, cacau em pó, canela e raspas de chocolate.",
        alergicos: "Contém derivados de leite e lactose. Não contém glúten."
    },
    { 
        id: 16, 
        categoria: "cafes", 
        imagem: "../imagens/wafflecinno.jfif", 
        titulo: "Waffleccino", 
        preco: "R$ 13,50", 
        tempoDePreparo: "7 min",
        descricao: "Uma experiência única: cappuccino cremoso servido com um mini waffle artesanal de acompanhamento.",
        ingredientes: "Café expresso, leite, chocolate, farinha de trigo, ovos e manteiga.",
        alergicos: "Contém glúten, ovos, derivados de leite e lactose. Pode conter traços de castanhas."
    },
    { 
        id: 17, 
        categoria: "bebidas", 
        imagem: "../imagens/chocolate_quente_com_doce.jfif", 
        titulo: "Chocolate quente com doce de leite", 
        preco: "R$ 10,50", 
        tempoDePreparo: "5 min",
        descricao: "Bebida cremosa e reconfortante, misturando o cacau puro com a doçura do doce de leite de fazenda.",
        ingredientes: "Leite integral, cacau 50%, doce de leite artesanal e amido de milho para cremosidade.",
        alergicos: "Contém derivados de leite e lactose. Não contém glúten."
    },
    { 
        id: 18, 
        categoria: "bebidas", 
        imagem: "../imagens/cha_casca_de_cafe.jfif", 
        titulo: "Chá casca de café", 
        preco: "R$ 5,00", 
        tempoDePreparo: "4 min",
        descricao: "Infusão exótica e adocicada feita com as cascas secas do fruto do café maduro. Rico em antioxidantes.",
        ingredientes: "Casca de café especial desidratada e água filtrada.",
        alergicos: "Não contém alérgenos comuns. Não contém glúten."
    },
    { 
        id: 19, 
        categoria: "bebidas", 
        imagem: "../imagens/chá_de_capim_limao.jfif", 
        titulo: "Chá capim-santo com limão", 
        preco: "R$ 5,00", 
        tempoDePreparo: "4 min",
        descricao: "Bebida leve e refrescante, perfeita para acalmar o dia com folhas colhidas frescas.",
        ingredientes: "Folhas frescas de capim-santo (capim-limão), suco de limão taiti e água.",
        alergicos: "Não contém alérgenos comuns. Não contém glúten."
    },
    { 
        id: 20, 
        categoria: "bebidas", 
        imagem: "../imagens/suco_de_milho.jfif", 
        titulo: "Suco de milho verde", 
        preco: "R$ 7,50", 
        tempoDePreparo: "5 min",
        descricao: "Bebida cremosa típica do interior, feita com milho verde fresco batido e bem gelado.",
        ingredientes: "Milho verde fresco, leite integral, açúcar refinado e água.",
        alergicos: "Contém leite e lactose. Não contém glúten."
    },
    {
        id: 21,
        categoria: "bebidas",
        imagem: "../imagens/suco_de_cana.jfif",
        titulo: "Garapa - suco de cana",
        preco: "R$ 6,00",
        tempoDePreparo: "4 min",
        descricao: "Caldo de cana puro extraído na hora da moenda. Energia pura e super refrescante.",
        ingredientes: "Cana-de-açúcar in natura prensada na hora.",
        alergicos: "Não contém alérgenos comuns. Não contém glúten."
    },
    {
        id: 22,
        categoria: "bebidas",
        imagem: "../imagens/suco_manga_com_laranja.jfif",
        titulo: "Vitamina de manga com laranja",
        preco: "R$ 8,00",
        tempoDePreparo: "5 min",
        descricao: "Mistura encorpada e cítrica de polpa de manga Palmer com suco natural de laranja.",
        ingredientes: "Manga madura e suco puro de laranja exprimido na hora.",
        alergicos: "Não contém alérgenos comuns. Não contém glúten."
    },
    {
        id: 23,
        categoria: "bebidas",
        imagem: "../imagens/soda_de_jabuticaba.jfif",
        titulo: "Soda artesanal de jabuticaba",
        preco: "R$ 8,50",
        tempoDePreparo: "4 min",
        descricao: "Refresco gaseificado produzido com xarope artesanal feito das nossas próprias jabuticabas.",
        ingredientes: "Xarope natural de jabuticaba caseiro, água com gás e gelo.",
        alergicos: "Não contém alérgenos comuns. Não contém glúten."
    },
    {
        id: 24,
        categoria: "doces",
        imagem: "../imagens/doce_de_leite_mineiro.jfif",
        titulo: "Doce de leite mineiro",
        preco: "R$ 7,00",
        tempoDePreparo: "2 min",
        descricao: "Doce de leite de tacho, cozido lentamente até atingir o ponto perfeito de cremosidade.",
        ingredientes: "Leite bovino fresco e açúcar.",
        alergicos: "Contém leite e lactose. Não contém glúten."
    },
    {
        id: 25,
        categoria: "doces",
        imagem: "../imagens/goiabada_cascão.jfif",
        titulo: "Goiabada Cascão",
        preco: "R$ 8,00",
        tempoDePreparo: "2 min",
        descricao: "Goiabada cascão autêntica com pedaços da fruta, firme por fora e macia por dentro.",
        ingredientes: "Goiaba selecionada com casca e açúcar demerara.",
        alergicos: "Não contém alérgenos comuns. Não contém glúten."
    },
    {
        id: 26,
        categoria: "doces",
        imagem: "../imagens/doce_de_abobora_com_coco.jfif",
        titulo: "Doce de abóbora com coco",
        preco: "R$ 6,50",
        tempoDePreparo: "2 min",
        descricao: "Doce caseiro bem úmido com abóbora de pescoço ralada e fitas de coco fresco.",
        ingredientes: "Abóbora, coco ralado fresco, açúcar e cravos-da-índia.",
        alergicos: "Não contém alérgenos comuns. Não contém glúten."
    },
    {
        id: 27,
        categoria: "doces",
        imagem: "../imagens/pe_de_moleque.jfif",
        titulo: "Pé de moleque",
        preco: "R$ 4,00",
        tempoDePreparo: "1 min",
        descricao: "Doce crocante feito com amendoim torrado inteiro envolvido em rapadura pura derretida.",
        ingredientes: "Amendoim torrado e rapadura de cana de açúcar.",
        alergicos: "Contém amendoim. Não contém glúten."
    },
    {
        id: 28,
        categoria: "doces",
        imagem: "../imagens/cocada.jfif",
        titulo: "Cocada",
        preco: "R$ 5,00",
        tempoDePreparo: "1 min",
        descricao: "Cocada branca tradicional puxada no açúcar, macia por dentro e com casquinha crocante.",
        ingredientes: "Coco ralado, açúcar e água.",
        alergicos: "Não contém alérgenos comuns. Não contém glúten."
    },
    {
        id: 29,
        categoria: "quitutes-de-balcao",
        imagem: "../imagens/torresmo_de_estufa.jfif",
        titulo: "Torresmo de estufa",
        preco: "R$ 16,00",
        tempoDePreparo: "10 min",
        descricao: "Torresmo de rolo crocante e pururucado por fora, mantendo a carne suculenta por dentro.",
        ingredientes: "Panceta suína selecionada, sal, alho e especiarias.",
        alergicos: "Não contém alérgenos comuns. Não contém glúten."
    },
    {
        id: 30,
        categoria: "quitutes-de-balcao",
        imagem: "../imagens/cocada.jfif",
        titulo: "Cocada Queimada",
        preco: "R$ 5,00",
        tempoDePreparo: "1 min",
        descricao: "Variação deliciosa feita com o coco caramelizado no tacho antes do cozimento.",
        ingredientes: "Coco ralado, açúcar caramelizado e água.",
        alergicos: "Não contém alérgenos comuns. Não contém glúten."
    }
];
// Seções
const mapeamentoCategorias = {
    "pao-de-queijo": { titulo: "Pão de Queijo", id: "secao-pao-de-queijo" },
    "cafes": { titulo: "Cafés", id: "secao-cafes" },
    "bebidas": { titulo: "Bebidas", id: "secao-bebidas" },
    "doces": { titulo: "Doces", id: "secao-doces" },
    "quitutes-de-balcao": { titulo: "Quitutes de Balcão", id: "secao-quitutes" },
    "salgados": { titulo: "Salgados", id: "secao-salgados" }
};

const cardapioPrincipal = document.getElementById("cardapioPrincipal");

// Cardápio completo na página
export function renderizarCardapioCompleto() {
    cardapioPrincipal.innerHTML = ""; 
    
    Object.keys(mapeamentoCategorias).forEach((chaveCategoria) => {
        const produtosDaCategoria = itens.filter(item => item.categoria === chaveCategoria);
        if (produtosDaCategoria.length === 0) return;

        const secaoDivisao = document.createElement("div");
        secaoDivisao.classList.add("paoDeQueijos");

        const dadosCategoria = mapeamentoCategorias[chaveCategoria];
        secaoDivisao.innerHTML = `
            <h2 id="${dadosCategoria.id}" class="tituloDaSecao">${dadosCategoria.titulo}</h2>
            <div class="grade-produtos"></div>
        `;

        const gradeProdutos = secaoDivisao.querySelector(".grade-produtos");

        produtosDaCategoria.forEach((item) => {
            const card = document.createElement("div");
            card.classList.add("paoQ");

            card.innerHTML = `
                <div class="paoQ-clicavel" data-id="${item.id}">
                    <img src="${item.imagem}" alt="${item.titulo}">
                    <div class="paoQContent">
                        <p class="NomeProdutoCardapio">${item.titulo}</p>
                        <p class="precoProduto">${item.preco}</p>
                    </div>
                </div>
                <div class="paoQContent">
                    <div class="complementosCardapio">
                        <p class="tempoDePreparo">${item.tempoDePreparo}</p>
                        <button class="adiciona1AoCarrinho">+</button>
                    </div>
                </div>
            `;

            const botaoAdicionar = card.querySelector(".adiciona1AoCarrinho");
            botaoAdicionar.addEventListener("click", () => {
                enviarParaPlanilha(item.id, item.titulo, item.preco, item.imagem);
            });

            gradeProdutos.appendChild(card);
        });

        cardapioPrincipal.appendChild(secaoDivisao);
    });
}

// Salva no carrinho temporário do navegador
function enviarParaPlanilha(id, titulo, preco, imagem) {
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


renderizarCardapioCompleto();

// Função que inicializa e controla a barra de pesquisa
export function inicializarBarraPesquisa() {
    const barraPesquisa = document.getElementById("input-busca") || document.querySelector(".search-bar");
    
    if (!barraPesquisa) return;

    // Função auxiliar para remover acentos e deixar o texto limpo
    const removerAcentos = (texto) => {
        return texto
            .normalize("NFD") // Separa as letras dos seus acentos
            .replace(/[\u0300-\u036f]/g, ""); // Remove todos os acentos
    };

    barraPesquisa.addEventListener("input", () => {
        // Pega o termo digitado, remove acentos e transforma em minúsculas
        const termoBusca = removerAcentos(barraPesquisa.value.toLowerCase().trim());

        const secoesCategorias = document.querySelectorAll(".paoDeQueijos");

        secoesCategorias.forEach((secao) => {
            const cardsProdutos = secao.querySelectorAll(".paoQ");
            let temProdutoVisivelNaSecao = false;

            cardsProdutos.forEach((card) => {
                // Pega o nome do produto, remove acentos e transforma em minúsculas
                const nomeProdutoOriginal = card.querySelector(".NomeProdutoCardapio").textContent;
                const nomeProdutoLimpo = removerAcentos(nomeProdutoOriginal.toLowerCase());

                // Compara os dois textos sem acentos
                if (nomeProdutoLimpo.includes(termoBusca)) {
                    card.style.display = ""; 
                    temProdutoVisivelNaSecao = true; 
                } else {
                    card.style.display = "none"; 
                }
            });

            if (temProdutoVisivelNaSecao) {
                secao.style.display = "";
            } else {
                secao.style.display = "none";
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarBarraPesquisa();
});
