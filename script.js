fetch('./produtos.json')
  .then(res => res.json())
  .then(produtos => {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; // tira o "Carregando"
    
    produtos.forEach(p => {
      grid.innerHTML += `
        <div style="border:1px solid #ddd; padding:15px; border-radius:10px; background:white;">
          <img src="./imagens/${p.imagem}" style="width:100%; height:200px; object-fit:cover;" onerror="this.src='https://via.placeholder.com/200'">
          <h3 style="color:#800020; margin-top:10px;">${p.nome}</h3>
          <p>${p.categoria}</p>
          <p>${p.descricao}</p>
          <p><b>À vista:</b> R$ ${p.preco_avista.toFixed(2)}</p>
          <p><b>Cartão:</b> R$ ${p.preco_cartao.toFixed(2)}</p>
        </div>
      `;
    });
  })
  .catch(erro => {
    document.getElementById('product-grid').innerHTML = 'Erro ao carregar. Veja se produtos.json está na raiz.';
  });
