let cart = [];
let totalPrice = 0;

async function fetchProducts() {
    try {
        let response = await fetch('URL_TO_YOUR_DROPSHIPPING_API');
        let products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    let productsContainer = document.getElementById('products');
    products.forEach(product => {
        let productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Cena: $${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Přidat do košíku</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    totalPrice += price;
    updateCartUI();
}

function updateCartUI() {
    let cartItemsElement = document.getElementById('cartItems');
    cartItemsElement.innerHTML = '';
    cart.forEach(item => {
        let li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItemsElement.appendChild(li);
    });
    document.getElementById('totalPrice').textContent = totalPrice;
}

// Načtení produktů při načtení stránky
fetchProducts();
