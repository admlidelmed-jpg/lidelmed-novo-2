const NUMERO_WHATS = "5573999144898";

fetch('produtos.json')
.then(r => r.json())
.then(produtos => {
  const grid = document.getElementById('grid');
  grid.innerHTML = produtos.map(p => {
    const msg = "Olá! Tenho interesse no " + p.nome;
    const link = "https://wa.me/" + NUMERO_WHATS + "?text=" + encodeURIComponent(msg);
    return `
      <div class="card">
        <img src="${p.imagem}" alt="${p.nome}">
        <div class="card-body">
          <h3>${p.nome}</h3>
          <p>${p.descricao}</p>
          <div class="preco">${p.preco}</div>
          <a href="${link}" target="_blank">Comprar no WhatsApp</a>
        </div>
      </div>
    `;
  }).join('');
});