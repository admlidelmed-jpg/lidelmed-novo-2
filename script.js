let produtos = [];
const grid = document.getElementById('grid');

// Carrega os produtos
fetch('produtos.json')
.then(res => res.json())
.then(data => {
    produtos = data;
    mostrarProdutos(produtos);
})
.catch(error => {
    alert("ERRO AO CARREGAR PRODUTOS: " + error);
});

// Mostra os produtos na tela
function mostrarProdutos(lista) {
    grid.innerHTML = '';
    lista.forEach((p) => {
        const card = document.createElement('div');
        card.className = 'product';
        card.onclick = () => abrirWhatsApp(p);
        
        card.innerHTML = `
            <img src="${p.imagem}" alt="${p.nome}">
            <h3>${p.nome}</h3>
            <p class="preco">À vista: R$ ${p.preco_avista.toFixed(2)}</p>
            <p class="cartao">Cartão: R$ ${p.preco_cartao.toFixed(2)}</p>
            <button class="btn-whats">Comprar no WhatsApp</button>
        `;
        grid.appendChild(card);
    });
}

// Botão do WhatsApp
function abrirWhatsApp(produto) {
    const numero = "5573999144898"; // COLOCA SEU NUMERO AQUI COM DDD
    const msg = Olá! Tenho interesse no produto: ${produto.nome} - R$ ${produto.preco_avista.toFixed(2)};
    const link = https://wa.me/${numero}?text=${encodeURIComponent(msg)};
    window.open(link, '_blank');
}
