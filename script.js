document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid');

  fetch('produtos.json')
    .then(response => response.json())
    .then(produtos => {
      grid.innerHTML = '';
      produtos.forEach(produto => {
       const card = `
  <div class="card">
    <img src="${produto.imagem}" alt="${produto.nome}">
    <h3>${produto.nome}</h3>
    <p class="descricao">${produto.descricao || ''}</p>
    <p class="preco">R$ ${produto.preco}</p>
    <a href="https://wa.me/557399144898?text=Oi, quero orçamento do ${produto.nome} por R$ ${produto.preco}" target="_blank">Pedir Orçamento</a>
  </div>
`;
        grid.innerHTML += card;
      });
    })
    .catch(error => console.error('Erro:', error));
});
