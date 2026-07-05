export const itens = [
    {
        imagem: "../imagens/pao_de_queijo_radicional.jfif",
        titulo: "Pão de queijo tradicional - médio",
        preco: "R$ 00,00",
        tempoDePreparo: "x min"
    },
    {
        imagem: "../imagens/pão_de_queijo_slider.jfif",
        titulo: "Pão de queijo lanche - grande",
        preco: "R$ 00,00",
        tempoDePreparo: "x min"
    },
    {
        imagem: "../imagens/pao_de_queijo_coquitel.jfif",
        titulo: "Pão de queijo coquitel - mini",
        preco: "R$ 00,00",
        tempoDePreparo: "x min"
    },
    {
        imagem: "../imagens/pao_de_queijo_de_canastra.png",
        titulo: "Pão de queijo de canastra",
        preco: "R$ 00,00",
        tempoDePreparo: "x min"
    }
]

const gradeProdutos = document.getElementById("gradeProdutos");

function renderListaProduto(){
    itens.forEach((item) => {
        const imagem = item.imagem;
        const titulo = item.titulo;
        const preco = item.preco;
        const tempoDePreparo = item.tempoDePreparo;

        const card = document.createElement("div");
        // const img = document.createElement("img");
        // const p_titulo = document.createElement("p");
        // const p_preco = document.createElement("p");

        card.innerHTML = `
        <img src={${imagem}}/>
        <div class="paoQContent">
            <p class="NomeProdutoCardapio">{${titulo}}</p>
            <p class="precoProduto">{${preco}}</p>
            <div class="complementosCardapio">
                    <p class="tempoDePreparo">{${tempoDePreparo}}</p>
                    <button class="direcionaAoProduto"><a href="">Veja melhor</a></button>
                    <button class="adiciona1AoCarrinho"><a href="">+</a></button>
                </div>
        </div>
        `
        gradeProdutos.appendChild(card);
    })
}

renderListaProduto();