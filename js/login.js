// Importa o Firebase e configura
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

console.log("login.js carregado");

// espera DOM pronto
window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM pronto");

  const form = document.getElementById("form-login");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const mensagem = document.getElementById("mensagem");

  if (!form || !emailInput || !senhaInput || !mensagem) {
    console.error("Um ou mais elementos não foram encontrados:", { form, emailInput, senhaInput, mensagem });
    return;
  }

  // opcional: monitorar estado de autenticação
  onAuthStateChanged(auth, (user) => {
    console.log("onAuthStateChanged:", user);
    if (user) {
      mensagem.textContent = `Logado com: ${user.email}`;
      mensagem.style.color = "green";
    }
  });

  form.addEventListener("submit", async (e) => {
    // Pega o conteúdo do fomulário
    e.preventDefault(); // evita reload da página
    mensagem.textContent = "";
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    // Validação de Campos
    if (!email || !senha) {
      mensagem.textContent = "Preencha todos os campos.";
      mensagem.style.color = "red";
      console.warn("Validação falhou: campos vazios");
      return;
    }

    // Validação de Emails
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      mensagem.textContent = "Digite um e-mail válido.";
      mensagem.style.color = "red";
      console.warn("E-mail inválido:", email);
      return;
    }

    // Teste de Login
    try {
      console.log("Tentando signInWithEmailAndPassword", email);
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      console.log("Login ok:", userCredential);
      mensagem.textContent = "Login realizado com sucesso!";
      mensagem.style.color = "green";

      window.location.href = "dashboard.html";
    }
    
    // Falhas de Login
    catch (error) {
      console.error("Erro signIn:", error);
      if (error.code === "auth/user-not-found") {
        mensagem.textContent = "Usuário não encontrado.";
      } else if (error.code === "auth/wrong-password") {
        mensagem.textContent = "Senha incorreta.";
      } else {
        mensagem.textContent = "Erro: " + (error.message || error.code);
      }
      mensagem.style.color = "red";
    }
  });
});
