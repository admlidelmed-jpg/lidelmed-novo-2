let produtosGlobal = [];
let indiceAtual = 0;

async function carregarProdutos() {
  try {
 const resposta = await fetch('/products.json');
    if (!resposta.ok) throw new Error('Arquivo products.json não encontrado');

    produtosGlobal = await resposta.json();
    const div = document.getElementById('produtos');
    div.innerHTML = '';

    produtosGlobal.forEach((p, index) => {
      const avista = p.preco_avista;
      const cartao = p.preco_cartao;

      div.innerHTML += `
      <div class="card-produto">
        <img src="${p.imagem}" alt="${p.nome}" onclick="abrirGaleria(${index})">
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
      ${avista > 0? <p class="preco-avista"><b>À vista: R$ ${avista.toFixed(2)}</b></p> : ''}
      ${cartao > 0? <p class="preco-parcelado">Cartão: R$ ${cartao.toFixed(2)}</p> : ''}
        <a href="https://wa.me/557398144898?text=Olá! Quero o ${p.nome}" target="_blank" class="btn-whats">Comprar no Whats</a>
      </div>
      `;
    });

  } catch (erro) {
    document.getElementById('produtos').innerHTML = 'Erro: ' + erro.message;
  }
}

// FUNÇÕES DA GALERIA
function abrirGaleria(index) {
  indiceAtual = index;
  const produto = produtosGlobal[indiceAtual];
  document.getElementById('galeria-img').src = produto.imagem;
  document.getElementById('galeria-nome').innerText = produto.nome;
  document.getElementById('galeria-modal').style.display = 'flex';
}

function fecharGaleria() {
  document.getElementById('galeria-modal').style.display = 'none';
}

function proximaImagem() {
  indiceAtual = (indiceAtual + 1) % produtosGlobal.length;
  abrirGaleria(indiceAtual);
}

function imagemAnterior() {
  indiceAtual = (indiceAtual - 1 + produtosGlobal.length) % produtosGlobal.length;
  abrirGaleria(indiceAtual);
}

carregarProdutos();
