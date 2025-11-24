// Importa o Firebase e configura
import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";


// Função Cadastro
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-cadastro");

  if (!form) {
    console.error("Elemento com id 'form-cadastro' não encontrado no HTML!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Pega os valores do formulário
    const nomeCompleto = document.getElementById("nome-completo").value;
    const emailUser = document.getElementById("email").value.trim();
    const senhaUser = document.getElementById("senha").value.trim();
    const cpfNum = document.getElementById("cpf").value;
    const dataNasc = document.getElementById("data-nasc").value;
    const estadoCivil = document.getElementById("estado-civil").value;

    const valorRenda  = document.getElementById("renda").value;
    const familiar  = document.getElementById("composicao-familiar").value;
    const endereco  = document.getElementById("endereco").value;
    const numEndereco  = document.getElementById("num-endereco").value;
    const numCep  = document.getElementById("cep").value;
    const cidade  = document.getElementById("cidade").value;
    const estado  = document.getElementById("estado").value;
    const numTelefone  = document.getElementById("telefone").value;

    // Validações
    if (
      !nomeCompleto ||
      !emailUser || 
      !senhaUser || 
      !cpfNum || 
      !dataNasc ||
      !estadoCivil || 

      !valorRenda || 
      !familiar || 
      !endereco || 
      !numEndereco ||
      !numCep || 
      !cidade || 
      !estado || 
      !numTelefone
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailUser)) {
      alert("E-mail inválido.");
      return;
    }

    if (senhaUser.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    console.log("Cadastro válido! Enviando dados...");

    try {
      // Cria o usuário no AUTH
      const userCredential = await createUserWithEmailAndPassword(auth, emailUser, senhaUser);
      const user = userCredential.user;

      console.log("Usuário criado no Auth:", user.uid);

      // Cria documento no Firestore com o UID
      await setDoc(doc(db, "usuarios", user.uid), {
        nome: nomeCompleto,
        email: emailUser,
        cpf: cpfNum,
        nasc: dataNasc,
        estadoCivil: estadoCivil,
        renda: valorRenda,
        familia: familiar,
        endereco: endereco,
        numeroEndereco: numEndereco,
        cep: numCep,
        cidade: cidade,
        estado: estado,
        telefone: numTelefone,
        criadoEm: new Date(),
      });

      alert("Cadastro realizado com sucesso!");
      e.target.reset();

    } catch (error) {
      console.error("Erro ao cadastrar:", error);

      if (error.code === "auth/email-already-in-use") {
        alert("Este e-mail já está cadastrado!");
      } else {
        alert("Erro ao cadastrar.");
      }
    }
  });
});

