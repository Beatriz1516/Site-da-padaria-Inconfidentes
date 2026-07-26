const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbzVzIuiR3-Lj1Fcyf38d23GtpZ-gTsa0oo9nQVfLaG4HCFYNun-05mkpmOx2R4rSGPd/exec";

let acaoAtual = "criar"; 

const btnJaTenho = document.getElementById("btnJaTenho");
const btnNaoTenho = document.getElementById("btnNaoTenho");
const grupoNome = document.getElementById("grupoNome");
const inputNome = document.getElementById("nome");
const labelSenha = document.getElementById("labelSenha");
const inputSenha = document.getElementById("senha");
const btnAcao = document.getElementById("btnAcao");
const formulario = document.getElementById("meuFormulario");

// Botão tenho conta
btnJaTenho.addEventListener("click", () => {
  acaoAtual = "ler";
  btnJaTenho.classList.add("ativa");
  btnNaoTenho.classList.remove("ativa");
  grupoNome.style.display = "none";
  inputNome.removeAttribute("required");
  labelSenha.textContent = "Senha";
  inputSenha.placeholder = "Digite sua senha";
  btnAcao.textContent = "Entrar";
});

// Botão não tenho conta
btnNaoTenho.addEventListener("click", () => {
  acaoAtual = "criar";
  btnNaoTenho.classList.add("ativa");
  btnJaTenho.classList.remove("ativa");
  grupoNome.style.display = "block";
  inputNome.setAttribute("required", "required");
  labelSenha.textContent = "Criar senha";
  inputSenha.placeholder = "Digite sua senha forte";
  btnAcao.textContent = "Criar conta";
});



formulario.addEventListener("submit", async (e) => {
  e.preventDefault(); 
  
  btnAcao.disabled = true;
  btnAcao.textContent = "Processando...";

  const selectPerfil = document.getElementById("tipoPerfil");
  let tipoSelecionado = selectPerfil ? selectPerfil.value : "usuario";

  if (acaoAtual === "criar") {
    tipoSelecionado = "usuario";
  }

  const dadosFormulario = new URLSearchParams();
  dadosFormulario.append("acao", acaoAtual);
  dadosFormulario.append("nome", acaoAtual === "criar" ? inputNome.value : "");
  dadosFormulario.append("email", document.getElementById("email").value);
  dadosFormulario.append("senha", inputSenha.value);
  dadosFormulario.append("tipo", tipoSelecionado);

  try {
    const resposta = await fetch(URL_APPS_SCRIPT, {
      method: "POST", // Força o uso estrito de POST para bater corretamente no doPost
      body: dadosFormulario
    });

    const textoResposta = await resposta.text();

    if (acaoAtual === "criar") {
      if (textoResposta.includes("Sucesso")) {
        localStorage.setItem("login_token", "usuario_autenticado");
        localStorage.setItem("cliente_email", document.getElementById("email").value);
        localStorage.setItem("cliente_nome", inputNome.value);
        localStorage.setItem("cliente_whats", "");
        localStorage.setItem("cliente_end", "");
        localStorage.setItem("cliente_bairro", "");
        localStorage.setItem("cliente_cidade", "");

        alert("Conta criada com sucesso! Redirecionando para sua conta...");
        window.location.href = "./conta_cliente.html"; 
      } else {
        alert(textoResposta); 
      }
    } else {
      // =======================================
      // CENÁRIO DE LOGIN (LER)
      // =======================================
      if (textoResposta.startsWith("Sucesso:")) {
        const blocoDados = textoResposta.replace("Sucesso:", ""); 
        const dadosPerfil = blocoDados.split("||");
        
        const perfilLogado = dadosPerfil[0] ? dadosPerfil[0].trim() : "usuario";
        
        if (perfilLogado === "funcionario") {
          localStorage.setItem("login_token", "funcionario_autenticado");
          alert("Bem-vindo! Acesso administrativo liberado.");
          window.location.href = "./dashboard_funcionario.html"; 
        } else {
          const emailDigitado = document.getElementById("email").value;
          
          localStorage.setItem("login_token", "usuario_autenticado");
          localStorage.setItem("cliente_email", emailDigitado);
          localStorage.setItem("cliente_nome", dadosPerfil[1] || "Cliente"); 
          localStorage.setItem("cliente_whats", dadosPerfil[2] || "");
          localStorage.setItem("cliente_end", dadosPerfil[3] || "");
          localStorage.setItem("cliente_bairro", dadosPerfil[4] || "");
          localStorage.setItem("cliente_cidade", dadosPerfil[5] || "");

          alert("Login efetuado com sucesso!");
          window.location.href = "./conta_cliente.html"; 
        }
      } else {
        alert(textoResposta);
      }
    } 

  } catch (erro) {
    console.error("Erro na requisição:", erro);
    alert("Falha ao conectar com o banco de dados.");
  } finally {
    btnAcao.disabled = false;
    btnAcao.textContent = acaoAtual === "criar" ? "Criar conta" : "Entrar";
  }
});