document.addEventListener('DOMContentLoaded', function() {
  const grid = document.getElementById('product-grid');
  const busca = document.getElementById('search-input');
  const filtro = document.getElementById('category-filter');
  const cartBtn = document.getElementById('cart-button');
  const modal = document.getElementById('cart-modal');
  const fechar = document.getElementById('close-cart-button');
  const itensCarrinho = document.getElementById('cart-items');
  const totalSpan = document.getElementById('cart-total');
  const qtdSpan = document.getElementById('cart-count');
  const zapBtn = document.getElementById('checkout-button');
  const msgVazia = document.getElementById('empty-cart-message');

  let produtos = [];
  let carrinho = JSON.parse(localStorage.getItem('lidelmed_carrinho')) || [];

  // 1. BUSCAR PRODUTOS
  fetch('produtos.json?v=' + Date.now())
    .then(res => res.json())
    .then(data => {
      produtos = data;
      carregarCategorias();
      mostrarProdutos(produtos);
      atualizarCarrinho();
    })
    .catch(err => {
      grid.innerHTML = `<p style="color:red; text-align:center">Erro ao carregar produtos: ${err}</p>`;
    });

  // 2. MOSTRAR PRODUTOS NA TELA
  function mostrarProdutos(lista) {
    grid.innerHTML = '';
    if(lista.length === 0){
      grid.innerHTML = '<p>Nenhum produto encontrado.</p>';
      return;
    }
    lista.forEach(p => {
      grid.innerHTML += `
        <div class="card">
          <img src="imagens/${p.imagem}" alt="${p.nome}" onerror="this.src='https://via.placeholder.com/260x200?text=Sem+Imagem'">
          <h3>${p.nome}</h3>
          <p class="categoria">${p.categoria}</p>
          <p>${p.descricao}</p>
          <p class="preco-avista">À vista: R$ ${p.preco_avista.toFixed(2)}</p>
          <p class="preco-cartao">Cartão: R$ ${p.preco_cartao.toFixed(2)}</p>
          <button class="btn-add" onclick="adicionarCarrinho(${p.id})">Adicionar ao Carrinho</button>
        </div>
      `;
    });
  }

  // 3. FILTRO E BUSCA
  function carregarCategorias(){
    const categorias = [...new Set(produtos.map(p => p.categoria))];
    categorias.forEach(cat => {
      filtro.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
  }
  busca.addEventListener('input', filtrar);
  filtro.addEventListener('change', filtrar);
  function filtrar(){
    const termo = busca.value.toLowerCase();
    const cat = filtro.value;
    const filtrados = produtos.filter(p => 
      p.nome.toLowerCase().includes(termo) && (cat === 'all' || p.categoria === cat)
    );
    mostrarProdutos(filtrados);
  }

  // 4. CARRINHO
  window.adicionarCarrinho = function(id){
    const produto = produtos.find(p => p.id === id);
    const item = carrinho.find(i => i.id === id);
    if(item){ item.qtd++; } else { carrinho.push({...produto, qtd: 1}); }
    salvarCarrinho();
    atualizarCarrinho();
  }
  function salvarCarrinho(){ localStorage.setItem('lidelmed_carrinho', JSON.stringify(carrinho)); }
  function atualizarCarrinho(){
    let total = 0; let qtd = 0;
    itensCarrinho.innerHTML = '';
    carrinho.forEach(item => {
      total += item.preco_avista * item.qtd;
      qtd += item.qtd;
      itensCarrinho.innerHTML += `<div class="item-carrinho"><p>${item.nome} x${item.qtd}</p></div>`;
    });
    totalSpan.innerText = `R$ ${total.toFixed(2)}`;
    qtdSpan.innerText = qtd;
    msgVazia.style.display = qtd === 0 ? 'block' : 'none';
  }
  cartBtn.onclick = () => modal.style.display = 'flex';
  fechar.onclick = () => modal.style.display = 'none';
  
  // 5. WHATSAPP
  zapBtn.onclick = () => {
    let mensagem = 'Olá! Gostaria de fazer um pedido da Lidel Med:%0A%0A';
    carrinho.forEach(item => {
      mensagem += `- ${item.nome} x${item.qtd} - R$ ${(item.preco_avista * item.qtd).toFixed(2)}%0A`;
    });
    mensagem += `%0A*Total: ${totalSpan.innerText}*`;
    window.open(`https://wa.me/557399999999?text=${mensagem}`, '_blank'); // TROCA PELO SEU NUMERO
  }

});
