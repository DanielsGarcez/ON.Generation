// Importa o Firebase e configura
import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";


// TESTE DE LOGIN DE USUÁRIO
/* async function getDadosDoUsuarioLogado() {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      console.log("Ninguém está logado.");
      window.location.href = "login.html"; // opcional
      return;
    }

    console.log("Logado como:", user.email);
    console.log("UID:", user.uid);


    // Pega dados do Firestore
    const ref = doc(db, "usuarios", user.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      console.log("Dados do Firestore:", snap.data());
    } else {
      console.log("Usuário não encontrado no Firestore");
    }
  });

}
getDadosDoUsuarioLogado(); */



// Função pegar os dados do Firebase e joga no Form
async function getDadosDoUsuarioLogado() {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      console.log("Ninguém está logado.");
      window.location.href = "login.html";
      return;
    }
    console.log("Logado como:", user.email);

    // Acesso ao Firestore
    const ref = doc(db, "usuarios", user.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
        const dados = snap.data();
        console.log("Dados:", dados);

        document.getElementById("nome").value = dados.nome || "";
        document.getElementById("email").value = dados.email || "";
        document.getElementById("cpf").value = dados.cpf || "";

        document.getElementById("civil").value = dados.estadoCivil || "";
        document.getElementById("renda").value = dados.renda || "";
        document.getElementById("familia").value = dados.familia || "";
        document.getElementById("endereco").value = dados.endereco || "";
        document.getElementById("enderecoNum").value = dados.enderecoNum || "";
        document.getElementById("cep").value = dados.cep || "";
        document.getElementById("cidade").value = dados.cidade || "";
        document.getElementById("estado").value = dados.estado || "";
        document.getElementById("telefone").value = dados.telefone || "";

        const campoNasc = document.getElementById("data-nasc");
        if (campoNasc) {
            campoNasc.value = dados.nasc || "";
        }

    } else {
      console.log("Usuário não encontrado no Firestore");
    }
  });
}
getDadosDoUsuarioLogado();



// Função de Logout
const userEmail = document.getElementById("userEmail");

onAuthStateChanged(auth, (user) => {
    if (user) {
    userEmail.textContent = user.email;
    } else {
    window.location.href = "index.html"; // se não estiver logado, volta
    }
});

window.logout = () => {
    signOut(auth).then(() => {
    window.location.href = "../index.html";
    });
};

