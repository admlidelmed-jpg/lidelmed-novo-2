document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';

  // SEUS 40 PRODUTOS ESTÃO AQUI DENTRO AGORA
  const produtos = 
  [
    // COPIA E COLA SEU produtos.json INTEIRO AQUI
    // EXEMPLO:
    {"id":1,"nome":"Cadeira de Rodas D600","categoria":"Cadeira de Rodas","descricao":"Dobrável","imagem":"cadeira-de-roda-D600.jpg","preco_avista":1200.00,"preco_cartao":1320.00},
    {"id":2,"nome":"Andador Articulado","categoria":"Andadores","descricao":"Com rodas","imagem":"andador.jpg","preco_avista":350.00,"preco_cartao":385.00}
    // COPIA TUDO DO SEU ARQUIVO ATE O FINAL AQUI
  ];

  produtos.forEach(p => {
    grid.innerHTML += `
      <div style="background:white; padding:15px; border-radius:10px; box-shadow:0 2px 5px rgba(0,0,0,0.1)">
        <img src="./imagens/${p.imagem}" style="width:100%; height:200px; object-fit:cover" onerror="this.src='https://via.placeholder.com/200'">
        <h3 style="color:#800020; margin:10px 0 5px">${p.nome}</h3>
        <p>${p.categoria}</p>
        <p>${p.descricao}</p>
        <p style="color:green; font-weight:bold">À vista: R$ ${p.preco_avista.toFixed(2)}</p>
        <p>Cartão: R$ ${p.preco_cartao.toFixed(2)}</p>
      </div>
    `;
  });
});
