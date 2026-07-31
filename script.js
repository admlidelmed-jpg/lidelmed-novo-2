fetch('produtos.json?v=' + new Date().getTime())
  .then(res => res.json())
  .then(produtos => {
    const div = document.getElementById('produtos');
    div.innerHTML = '';
    produtos.forEach(p => {
      div.innerHTML += `
      <div class="card-produto">
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
        <p class="preco-avista">À vista: R$ ${p.preco_avista}</p>
        <p class="preco-parcelado">Parcelado: R$ ${p.preco_parcelado}</p>
      </div>`;
    });
  })
  .catch(() => {
    document.getElementById('produtos').innerHTML = 'Erro ao carregar produtos.';
  });
