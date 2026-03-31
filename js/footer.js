// Exporta o Footer para todas as páginas
async function carregarFooter() {
  try {
    const resposta = await fetch("/ON.Generation/Pages/Footer.html");
    const conteudo = await resposta.text();
    document.body.insertAdjacentHTML("afterend", conteudo);
  } catch (erro) {
    console.error("Erro ao carregar o header:", erro);
  }
}

carregarFooter();
