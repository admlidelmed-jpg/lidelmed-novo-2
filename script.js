// Função pra formatar pra R$ 1.000,00
function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

fetch('produtos.json')
.then(res => res.json())
.then(produtos => {
  const grid = document.getElementById('grid');
  grid.innerHTML = produtos.map(produto => `
    <div class="card">
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p class="preco" style="color: orange; font-weight: bold;">À vista: ${formatarPreco(produto.preco_avista)}</p>
      <p class="preco-cartao">Cartão: ${formatarPreco(produto.preco_cartao)}</p>
      <a href="https://wa.me/557399144898?text=Oi, quero orçamento do ${produto.nome}" target="_blank">Pedir Orçamento</a>
    </div>
  `).join('');
})
.catch(err => console.error(err));
