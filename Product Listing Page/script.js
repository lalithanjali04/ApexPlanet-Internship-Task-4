// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 99.99,
        rating: 4.5,
        ratingCount: 128,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=60"
    },
    {
        id: 2,
        name: "Smartphone 128GB",
        category: "electronics",
        price: 699.99,
        rating: 4.2,
        ratingCount: 256,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=60"
    },
    {
        id: 3,
        name: "Cotton T-Shirt",
        category: "clothing",
        price: 19.99,
        rating: 4.0,
        ratingCount: 85,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=60"
    },
    {
        id: 4,
        name: "Stainless Steel Water Bottle",
        category: "home",
        price: 24.95,
        rating: 4.7,
        ratingCount: 210,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=60"
    },
    {
        id: 5,
        name: "Bestseller Novel",
        category: "books",
        price: 14.99,
        rating: 4.8,
        ratingCount: 312,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=60"
    },
    {
        id: 6,
        name: "Wireless Keyboard",
        category: "electronics",
        price: 49.99,
        rating: 4.3,
        ratingCount: 176,
        image: "https://i.pcmag.com/imagery/roundups/007y4PjTbtgMMDz5SnUq9Em-1..v1723038335.jpg"
    },
    {
        id: 7,
        name: "Denim Jeans",
        category: "clothing",
        price: 59.99,
        rating: 4.1,
        ratingCount: 92,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=60"
    },
    {
        id: 8,
        name: "Non-Stick Frying Pan",
        category: "home",
        price: 29.99,
        rating: 4.4,
        ratingCount: 143,
        image: "https://images.unsplash.com/photo-1582515073490-39981397c445?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=60"
    },
    {
        id: 9,
        name: "Cookbook Collection",
        category: "books",
        price: 34.99,
        rating: 4.6,
        ratingCount: 87,
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=60"
    },
    {
        id: 10,
        name: "Fitness Tracker",
        category: "electronics",
        price: 79.99,
        rating: 3.9,
        ratingCount: 204,
        image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=60"
    },
    {
        id: 11,
        name: "Winter Jacket",
        category: "clothing",
        price: 129.99,
        rating: 4.7,
        ratingCount: 68,
        image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=60"
    },
    {
        id: 12,
        name: "Coffee Maker",
        category: "home",
        price: 89.99,
        rating: 4.5,
        ratingCount: 156,
        image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=60"
    }
];

// DOM elements
const productGrid = document.getElementById('product-grid');
const noResults = document.getElementById('no-results');
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
const priceSlider = document.getElementById('price-slider');
const maxPriceDisplay = document.getElementById('max-price-display');
const sortSelect = document.getElementById('sort-options');

// Initialize the page
function init() {
    renderProducts(products);
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    // Category filter change
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterAndSortProducts);
    });
    
    // Price slider change
    priceSlider.addEventListener('input', function() {
        maxPriceDisplay.textContent = `$${this.value}`;
        filterAndSortProducts();
    });
    
    // Sort option change
    sortSelect.addEventListener('change', filterAndSortProducts);
}

// Filter and sort products based on current selections
function filterAndSortProducts() {
    // Get selected categories
    const selectedCategories = Array.from(categoryCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
    
    // Get max price
    const maxPrice = parseInt(priceSlider.value);
    
    // Filter products
    let filteredProducts = products.filter(product => {
        return selectedCategories.includes(product.category) && product.price <= maxPrice;
    });
    
    // Sort products
    const sortOption = sortSelect.value;
    filteredProducts = sortProducts(filteredProducts, sortOption);
    
    // Display results
    if (filteredProducts.length === 0) {
        noResults.style.display = 'block';
        productGrid.style.display = 'none';
    } else {
        noResults.style.display = 'none';
        productGrid.style.display = 'grid';
        renderProducts(filteredProducts);
    }
}

// Sort products based on selected option
function sortProducts(products, sortOption) {
    const sortedProducts = [...products];
    
    switch (sortOption) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'name-asc':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            // Default sorting (featured) - keep original order
            break;
    }
    
    return sortedProducts;
}

// Render products to the grid
function renderProducts(productsToRender) {
    productGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Create star rating HTML
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 >= 0.5;
        let starsHtml = '';
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHtml += '★';
            } else if (i === fullStars && hasHalfStar) {
                starsHtml += '½';
            } else {
                starsHtml += '☆';
            }
        }
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <span class="product-category">${product.category}</span>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-rating">
                    <div class="stars">${starsHtml}</div>
                    <span class="rating-count">(${product.ratingCount})</span>
                </div>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
}

// Initialize the application
init();