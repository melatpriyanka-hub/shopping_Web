
// Product List
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 2499,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    },
    {
        id: 4,
        name: "Backpack",
        price: 999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
    },
    {
        id: 5,
        name: "Sunglasses",
        price: 799,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400"
    },
    {
        id: 6,
        name: "Camera",
        price: 3499,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400"
    }
];

// Shopping Cart
let cart = [];

// Display Products
function displayProducts() {
    const productList = document.getElementById("product-list");

    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">₹${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join("");
}

// Show Success Notification
function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = "✓ " + message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// Add Product to Cart
// Add Product to Cart
function addToCart(id) {
    const product = products.find(item => item.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCart();

    showToast(product.name + " added to cart successfully!");
}

// Change Quantity
function changeQuantity(id, change) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity += change;

        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCart();
        }
    }
}

// Remove Product
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Update Shopping Cart
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty!</p>';
    } else {
        cartItems.innerHTML = cart.map(item => {
            total += item.price * item.quantity;
            count += item.quantity;

            return `
                <div class="cart-item">
                    <div>
                        <strong>${item.name}</strong>
                        <p>₹${item.price} × ${item.quantity}</p>
                    </div>

                    <div class="quantity">
                        <button onclick="changeQuantity(${item.id}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>

                    <strong>₹${(item.price * item.quantity).toFixed(2)}</strong>

                    <button class="remove-btn"
                        onclick="removeFromCart(${item.id})">
                        Remove
                    </button>
                </div>
            `;
        }).join("");
    }

    cartCount.textContent = count;
    cartTotal.textContent = total.toFixed(2);
}

// Checkout
document.getElementById("checkout-btn").addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Your shopping cart is empty!");
    } else {
        alert("Thank you for shopping with ShopEase!");
        cart = [];
        updateCart();
    }
});

// Initialize Website
displayProducts();
updateCart();
