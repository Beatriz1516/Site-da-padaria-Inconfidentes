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

// Envio do formulário com trava de segurança para funcionários
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  btnAcao.disabled = true;
  btnAcao.textContent = "Processando...";

  // Captura o select de perfil apenas se ele existir na página
  const selectPerfil = document.getElementById("tipoPerfil");
  let tipoSelecionado = selectPerfil ? selectPerfil.value : "usuario";

  // TRAVA DE SEGURANÇA: Se o usuário estiver tentando criar uma conta,
  // o sistema ignora qualquer seleção e força o tipo "usuario"
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
      method: "POST",
      body: dadosFormulario
    });

    const textoResposta = await resposta.text();

    if (acaoAtual === "criar") {
      if (textoResposta.includes("Sucesso")) {
        localStorage.setItem("cliente_nome", inputNome.value);
        localStorage.setItem("cliente_email", document.getElementById("email").value);
        localStorage.setItem("login_token", "usuario_autenticado");

        alert("Conta criada com sucesso! Redirecionando para sua conta...");
        window.location.href = "./conta_cliente.html"; 
      } else {
        alert(textoResposta); 
      }
    } else {
      // Cenário de Login (Ler)
      if (textoResposta.startsWith("Sucesso:")) {
        const partes = textoResposta.split(":");
        const perfilLogado = partes[1] ? partes[1].trim() : ""; 
        
        if (perfilLogado === "funcionario") {
          localStorage.setItem("login_token", "funcionario_autenticado");
          alert("Acesso administrativo liberado!");
          window.location.href = "./dashboard_funcionario.html"; 
        } else {
          const emailDigitado = document.getElementById("email").value;
          
          localStorage.setItem("cliente_nome", "Cliente Cadastrado"); 
          localStorage.setItem("cliente_email", emailDigitado);
          localStorage.setItem("login_token", "usuario_autenticado");

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
