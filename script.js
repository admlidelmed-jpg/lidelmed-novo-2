let produtos = [];
const grid = document.getElementById('grid');

// Carrega os produtos do arquivo json
fetch('produtos.json')
.then(response => response.json())
.then(data => {
    produtos = data;
    mostrarProdutos(produtos);
})
.catch(error => {
    console.error('Erro ao carregar produtos:', error);
});

// Função para mostrar os produtos na tela
function mostrarProdutos(lista) {
    grid.innerHTML = '';
    lista.forEach((p) => {
        const card = document.createElement('div');
        card.className = 'product';
        card.innerHTML = `
            <img src="${p.imagem}" alt="${p.nome}">
            <h3>${p.nome}</h3>
            <p class="preco">R$ ${p.preco_avista.toFixed(2)}</p>
            <p class="cartao">R$ ${p.preco_cartao.toFixed(2)} no cartão</p>
        `;
        grid.appendChild(card);
    });
}
