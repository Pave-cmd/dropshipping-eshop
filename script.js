let cart = [];
let totalPrice = 0;

async function fetchProducts() {
    const shopifyDomain = 'your-shop-name.myshopify.com';
    const apiKey = 'e150a6da120d086b6d2a0ada30a66174';
    const apiPassword = 'c926cffbbffc7c5b85017c020858efaa-1720624613';

    try {
        let response = await fetch(`https://${apiKey}:${apiPassword}@${shopifyDomain}/admin/api/2021-04/products.json`);
        let data = await response.json();
        let products = data.products;
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
            <img src="${product.images[0] ? product.images[0].src : ''}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Cena: $${product.variants[0].price}</p>
            <button onclick="addToCart('${product.title}', ${product.variants[0].price})">Přidat do košíku</button>
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
