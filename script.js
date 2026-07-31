const grid = document.getElementById('product-grid');

fetch('produtos.json') // tirei o ./ da frente
.then(res => {
  if(!res.ok) throw new Error('Arquivo não encontrado');
  return res.json();
})
.then(produtos => {
  grid.innerHTML = '';
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
  grid.style.gap = '15px';
  grid.style.padding = '15px';

  produtos.forEach(p => {
    grid.innerHTML += `
      <div style="background:white; padding:15px; border-radius:10px; box-shadow:0 2px 5px rgba(0,0,0,0.1)">
        <img src="imagens/${p.imagem}" style="width:100%; height:180px; object-fit:cover; border-radius:8px" onerror="this.style.display='none'">
        <h3 style="color:#800020; font-size:16px; margin:10px 0 5px">${p.nome}</h3>
        <p style="font-size:12px; color:#666">${p.categoria}</p>
        <p style="font-size:14px; margin:8px 0">${p.descricao}</p>
        <p style="color:green; font-weight:bold">À vista: R$ ${p.preco_avista.toFixed(2)}</p>
        <p style="font-size:13px">Cartão: R$ ${p.preco_cartao.toFixed(2)}</p>
      </div>
    `;
  });
})
.catch(err => {
  grid.innerHTML = <p style="color:red; padding:20px">ERRO: Não achei o arquivo produtos.json<br>Erro: ${err.message}</p>;
});
