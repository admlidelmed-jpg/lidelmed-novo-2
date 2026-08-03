async function carregarProdutos() {
  try {
    const resposta = await fetch('produtos.json');
    if (!resposta.ok) throw new Error('Arquivo produtos.json não encontrado');
    
    const produtos = await resposta.json();
    const div = document.getElementById('produtos');
    div.innerHTML = ''; // limpa "Carregando..."

    produtos.forEach(p => {
      // Formata o preço pra R$ 1.800,00
      const avista = p.preco_avista.toLocaleString('pt-BR', {minimumFractionDigits: 2});
      const cartao = p.preco_cartao.toLocaleString('pt-BR', {minimumFractionDigits: 2});
      
      div.innerHTML += `
      <div class="card-produto">
        <img src="imagens/${p.imagem}" alt="${p.nome}">
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
        <p class="preco-avista"><b>À vista: R$ ${avista}</b></p>
        <p class="preco-parcelado">Cartão: R$ ${cartao}</p>
        <a href="https://wa.me/557398144898?text=Olá! Quero o ${p.nome}" target="_blank" class="btn-whats">Comprar no Whats</a>
      </div>`;
    });
  } catch (erro) {
    document.getElementById('produtos').innerHTML = 'Erro: ' + erro.message;
    console.error(erro);
  }
}
carregarProdutos();
