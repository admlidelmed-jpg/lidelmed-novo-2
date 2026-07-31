let deferredPrompt;
let produtos = [];
let produtoAtual = 0;
const numeroZap = "5573999144808"; // SEU NUMERO

// Botão de instalar app
window.addEventListener('beforeinstallprompt', (e) => {
e.preventDefault();
deferredPrompt = e;
document.getElementById('btnInstalar').style.display = 'block';
});

document.getElementById('btnInstalar').onclick = async () => {
if (deferredPrompt) {
deferredPrompt.prompt();
await deferredPrompt.userChoice;
deferredPrompt = null;
}
};

// Carrega os produtos
fetch('./produtos.json')
.then(r => r.json())
.then(d => {
produtos = d;
mostrarProdutos(produtos);
})
.catch(error => {
document.getElementById('grid').innerHTML = "ERRO AO CARREGAR PRODUTOS: " + error;
});

// Mostra os produtos na tela
function mostrarProdutos(lista) {
const grid = document.getElementById('grid');
grid.innerHTML = '';
lista.forEach((p, i) => {
let msg = encodeURIComponent(Olá! Tenho interesse no produto: ${p.nome} - À vista: R$ ${p.preco_avista});
let imgCaminho = ./imagens/${p.imagem};

const card = document.createElement('div');
card.className = 'produto';
card.onclick = () => abrirModal(i);

card.innerHTML = `
<img src="${imgCaminho}" alt="${p.nome}">
<h3>${p.nome}</h3>
<p class="preco">À vista: R$ ${p.preco_avista}</p>
<p class="cartao">Cartão: R$ ${p.preco_cartao}</p>
<a href="https://wa.me/${numeroZap}?text=${msg}" target="_blank" class="btnZapProduto" onclick="event.stopPropagation()">PEDIR NO WHATSAPP</a>
`;
grid.appendChild(card);
});
}

// Funções do Modal
function abrirModal(indice){
produtoAtual=indice;
let p=produtos[produtoAtual];
let msg = encodeURIComponent(Olá! Tenho interesse no produto: ${p.nome} - À vista: R$ ${p.preco_avista});
document.getElementById('modalImg').src=./imagens/${p.imagem};
document.getElementById('modalNome').innerText=p.nome;
document.getElementById('modalAVista').innerText=À vista: R$ ${p.preco_avista};
document.getElementById('modalCartao').innerText=Cartão: R$ ${p.preco_cartao};
document.getElementById('modalZap').href=https://wa.me/${numeroZap}?text=${msg};
document.getElementById('modal').style.display='flex';
}

function fecharModal(){document.getElementById('modal').style.display='none';}

function trocarProduto(direcao){
produtoAtual=produtoAtual+direcao;
if(produtoAtual<0)produtoAtual=produtos.length-1;
if(produtoAtual>=produtos.length)produtoAtual=0;
abrirModal(produtoAtual);
}

window.onclick=function(event){
if(event.target==document.getElementById('modal')){fecharModal()}
}
