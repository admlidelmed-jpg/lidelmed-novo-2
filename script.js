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
           <p class="preco">${produto.preco ? 'R$ ' + produto.preco : 'Consulte o preço'}</p>
            <p>${produto.descricao}</p>
            <a href="https://wa.me/557399144898?text=Oi, quero orçamento do ${produto.nome}" target="_blank">Pedir Orçamento</a>
          </div>
        `;
        grid.innerHTML += card;
      });
    })
    .catch(error => console.error('Erro:', error));
});
