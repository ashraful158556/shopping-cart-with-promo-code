let cart = [];
let usedPromoCode = false;

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartDiscount = document.getElementById("cart-discount");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";
    let subtotal = 0;
    let discount = 0;
    let count = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        count += item.quantity;

        const itemElement = document.createElement("div");
        itemElement.innerHTML = `
            <p>${item.name} x <input type="number" value="${item.quantity}" min="1" onchange="changeQuantity(${item.id}, this.value)"> - $${(item.price * item.quantity).toFixed(2)}</p>
        `;
        cartItems.appendChild(itemElement);
    });

    // Calculate discount and total
    discount = calculateDiscount(subtotal);
    const total = subtotal - discount;

    cartSubtotal.textContent = subtotal.toFixed(2);
    cartDiscount.textContent = discount.toFixed(2);
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = count;
}

function changeQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, newQuantity); // Prevent quantity from being less than 1
        updateCart();
    }
}

function calculateDiscount(subtotal) {
    const promoCode = document.getElementById("promo-code").value;
    let discount = 0;

    if (promoCode === "ostad10" && !usedPromoCode) {
        discount = subtotal * 0.10;
        usedPromoCode = true;
        displayPromoMessage("Promo Code Applied: 10% Discount", true);
    } else if (promoCode === "ostad5" && !usedPromoCode) {
        discount = subtotal * 0.05;
        usedPromoCode = true;
        displayPromoMessage("Promo Code Applied: 5% Discount", true);
    } else if (promoCode !== "" && !usedPromoCode) {
        displayPromoMessage("Invalid Promo Code", false);
    }
    
    return discount;
}

function displayPromoMessage(message, isSuccess) {
    const promoMessage = document.getElementById("promo-message");
    promoMessage.textContent = message;
    promoMessage.style.color = isSuccess ? 'green' : 'red';
}

document.getElementById("clear-cart").addEventListener("click", () => {
    cart = [];
    usedPromoCode = false;
    updateCart();
    document.getElementById("promo-code").value = "";
    document.getElementById("promo-message").textContent = "";
});

document.getElementById("apply-promo").addEventListener("click", () => {
    updateCart();
});

document.getElementById("checkout").addEventListener("click", () => {
    alert("Checkout successful!");
});
