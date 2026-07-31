document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeCartButton = document.getElementById('close-cart-button');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    let allProducts = [];
    let cart = [];

    async function fetchProducts() {
        try {
            const response = await fetch('./produtos.json');
            if (!response.ok) throw new Error('Erro ao carregar produtos');
            allProducts = await response.json();
            populateCategories();
            displayProducts(allProducts);
        } catch (error) {
            console.error('Erro:', error);
            productGrid.innerHTML = '<p>Erro ao carregar produtos. Tente recarregar a página.</p>';
        }
    }

    function displayProducts(products) {
        productGrid.innerHTML = '';
        if (products.length === 0) {
            productGrid.innerHTML = '<p>Nenhum produto encontrado.</p>';
            return;
        }
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="./imagens/${product.imagem}" alt="${product.nome}">
                <div class="product-info">
                    <h3>${product.nome}</h3>
                    <p class="category">${product.categoria}</p>
                    <p class="description">${product.descricao}</p>
                    <div class="prices">
                        <span class="price-avista">À vista: R$ ${product.preco_avista.toFixed(2)}</span>
                        <span class="price-cartao">Cartão: R$ ${product.preco_cartao.toFixed(2)}</span>
                    </div>
                    <button class="add-to-cart-btn" data-id="${product.id}">Adicionar ao Carrinho</button>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    }

    function populateCategories() {
        const categories = [...new Set(allProducts.map(p => p.categoria))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const filtered = allProducts.filter(product => {
            const matchSearch = product.nome.toLowerCase().includes(searchTerm) || product.descricao.toLowerCase().includes(searchTerm);
            const matchCategory = selectedCategory === 'all' || product.categoria === selectedCategory;
            return matchSearch && matchCategory;
        });
        displayProducts(filtered);
    }

    function addToCart(productId) {
        const product = allProducts.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            emptyCartMessage.style.display = 'none';
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <span>${item.nome} (x${item.quantity})</span>
                    <span>R$ ${(item.preco_avista * item.quantity).toFixed(2)}</span>
                `;
                cartItemsContainer.appendChild(cartItemElement);
                total += item.preco_avista * item.quantity;
            });
        }
        cartTotalSpan.textContent = R$ ${total.toFixed(2)};
    }

    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }
    });

    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    cartButton.addEventListener('click', () => cartModal.style.display = 'flex');
    closeCartButton.addEventListener('click', () => cartModal.style.display = 'none');
    
    checkoutButton.addEventListener('click', () => {
        let message = 'Olá! Gostaria de fazer um pedido:%0A%0A';
        cart.forEach(item => {
            message += *${item.nome}* - Qtd: ${item.quantity} - R$ ${(item.preco_avista * item.quantity).toFixed(2)}%0A;
        });
        message += %0A*Total: ${cartTotalSpan.textContent}*;
        window.open(https://wa.me/5573999999?text=${message}, '_blank');
    });

    fetchProducts();
});
