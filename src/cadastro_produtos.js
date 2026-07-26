const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbzVzIuiR3-Lj1Fcyf38d23GtpZ-gTsa0oo9nQVfLaG4HCFYNun-05mkpmOx2R4rSGPd/exec";

window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formAdminProduto");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const btnSalvar = document.getElementById("btnSalvarProd");
            btnSalvar.disabled = true;
            btnSalvar.textContent = "Processando no Sheets...";

            const params = new URLSearchParams();
            params.append("acao", "adicionar_produto");
            params.append("titulo", document.getElementById("prodTitulo").value);
            params.append("categoria", document.getElementById("prodCategoria").value);
            params.append("preco", document.getElementById("prodPreco").value);
            params.append("imagem", document.getElementById("prodImagem").value);
            params.append("tempoDePreparo", document.getElementById("prodTempo").value);
            params.append("descricao", document.getElementById("prodDescricao").value);
            params.append("ingredientes", document.getElementById("prodIngredientes").value);
            params.append("alergicos", document.getElementById("prodAlergicos").value);

            try {
                const res = await fetch(URL_APPS_SCRIPT, { method: "POST", body: params });
                const texto = await res.text();

                if (texto.includes("Sucesso")) {
                    alert("Produto cadastrado com sucesso!");
                    form.reset();
                    window.location.href = "../paginas/lista_produtos.html";
                } else {
                    alert(texto);
                }
            } catch (erro) {
                alert("Erro na comunicação com o servidor do Google.");
            } finally {
                btnSalvar.disabled = false;
                btnSalvar.textContent = "Salvar e Concluir";
            }
        });
    }
});
