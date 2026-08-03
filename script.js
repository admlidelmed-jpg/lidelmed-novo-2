async function carregarProdutos() {
  try {
  const resposta = await fetch('produtos.json'); 
    const produtos = await resposta.json();
    
    const div = document.getElementById('produtos');
    div.innerHTML = '';

    produtos.forEach(p => {
      div.innerHTML += `
      <div class="card-produto">
        <img src="imagens/${p.imagem}" alt="${p.nome}">
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
        <p class="preco-avista">À vista: R$ ${p.preco_avista}</p>
      <p class="preco-parcelado">Cartão: R$ ${p.preco_cartao}</p>
      </div>`;
    });

  } catch (erro) {
    document.getElementById('produtos').innerHTML = 'Erro ao carregar produtos.';
  }
}
carregarProdutos();
