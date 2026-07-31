document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('product-grid');
  
  fetch('produtos.json?v=' + new Date().getTime())
    .then(res => {
      if (!res.ok) throw new Error('produtos.json não encontrado');
      return res.json();
    })
    .then(produtos => {
      if(produtos.length === 0) {
        grid.innerHTML = 'Nenhum produto cadastrado.';
        return;
      }
      grid.innerHTML = '';
      produtos.forEach(p => {
        grid.innerHTML += `
        <div class="card-produto">
          <img src="imagens/${p.imagem}" alt="${p.nome}">
          <h3>${p.nome}</h3>
          <p>${p.descricao}</p>
          <p class="preco">À vista: R$ ${p.preco_avista}</p>
          <p>Parcelado: R$ ${p.preco_parcelado}</p>
        </div>`;
      });
    })
    .catch(err => {
      grid.innerHTML = `<p style="color:red">Erro: ${err.message}</p>`;
    });
});
