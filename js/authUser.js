import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

let usuarioLogado = false;

// Monitora mudanças de login
onAuthStateChanged(auth, (user) => {
  usuarioLogado = !!user;
  console.log("Estado do login:", usuarioLogado);
});

// Função chamada APÓS o header ser carregado
export function inicializarAvatar() {
  const botoesAvatar = document.querySelectorAll(".user-icon");

  if (botoesAvatar.length === 0) {
    console.warn("Nenhum avatar encontrado no header.");
    return;
  }

  botoesAvatar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      if (usuarioLogado) {
        // Se estiver logado → Dashboard
        window.location.href = "../Pages/Dashboard.html";
      } else {
        // Senão → Login
        window.location.href = "../Pages/LoginPessoa.html";
      }
    });
  });

  console.log("Avatar autenticado pronto!");
}
