let produtos = [];

async function carregarProdutos() {
  const resposta = await fetch('produtos.json');
  produtos = await resposta.json();
  mostrarProdutos(produtos);
}

function mostrarProdutos(lista) {
  const container = document.getElementById('produtos');
  container.innerHTML = '';
  lista.forEach(p => {
    container.innerHTML += `
      <div class="produto">
        <img src="imagens/${p.imagem}" alt="${p.nome}">
        <h3>${p.nome}</h3>
        <p>R$ ${p.preco.toFixed(2).replace('.', ',')}</p>
      </div>
    `;
  });
}

carregarProdutos();
