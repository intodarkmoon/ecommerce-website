// Load products from JSON and display them
document.addEventListener('DOMContentDidLoad', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Load products from the JSON file
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(error => {
            console.error('Error loading products:', error);
            // Fallback products if JSON fails to load
            const fallbackProducts = [
                { id: 1, name: "Classic T-Shirt", price: 19.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", category: "Clothing" },
                { id: 2, name: "Wireless Headphones", price: 89.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", category: "Electronics" },
                { id: 3, name: "Coffee Mug", price: 12.99, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", category: "Home" },
                { id: 4, name: "Running Shoes", price: 65.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", category: "Footwear" },
                { id: 5, name: "Backpack", price: 45.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", category: "Accessories" },
                { id: 6, name: "Smart Watch", price: 199.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", category: "Electronics" }
            ];
            displayProducts(fallbackProducts);
        });
    
    // Add CI/CD status indicator
    addCICDStatus();
});

function displayProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        container.appendChild(productCard);
    });
    
    // Add event listeners to Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
}

function addToCart(productId) {
    const cartCount = document.querySelector('.cart-count');
    let currentCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCount + 1;
    
    // Simple notification
    alert('Product added to cart!');
}

function addCICDStatus() {
    const statusDiv = document.createElement('div');
    statusDiv.className = 'cicd-status';
    statusDiv.innerHTML = `
        <i class="fas fa-sync-alt"></i>
        <span>CI/CD Active: Auto-deploy on changes</span>
    `;
    document.body.appendChild(statusDiv);
}

// Newsletter form submission
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our updates soon.`);
            this.reset();
        });
    }
});