let cart = [];
let discount = 0;  // Discount percentage

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
    const cartCount = document.getElementById("cart-count");
    const subtotal = document.getElementById("cart-subtotal");
    const discountAmount = document.getElementById("discount-amount");
    const finalTotal = document.getElementById("final-total");

    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");

        itemElement.innerHTML = `
            <div>
                <img src="${item.image}" alt="${item.name}" width="50">
                <p>${item.name}</p>
            </div>
            <div>
                <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                <input type="number" value="${item.quantity}" min="1" class="quantity-input" onchange="updateItemQuantity(${item.id}, this.value)">
                <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
            <p>$${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeItem(${item.id})">Remove</button>
        `;
        cartItems.appendChild(itemElement);
    });

    // Calculate Subtotal, Discount, and Final Total
    const subtotalAmount = total;
    const discountAmountValue = (total * (discount / 100));
    const finalTotalAmount = subtotalAmount - discountAmountValue;

    subtotal.textContent = `$${subtotalAmount.toFixed(2)}`;
    discountAmount.textContent = `$${discountAmountValue.toFixed(2)}`;
    finalTotal.textContent = `$${finalTotalAmount.toFixed(2)}`;
    
    cartCount.textContent = count;
}

function changeQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            cartItem.quantity = 1; // Prevent negative quantity
        }
        updateCart();
    }
}

function updateItemQuantity(productId, quantity) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem && quantity > 0) {
        cartItem.quantity = parseInt(quantity);
        updateCart();
    }
}

function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function applyPromoCode() {
    const promoCode = document.getElementById("promo-code").value.trim().toLowerCase();
    const validPromoCodes = {
        "ostad10": 10,
        "ostad5": 5
    };

    if (validPromoCodes[promoCode]) {
        discount = validPromoCodes[promoCode];
        alert(`Promo code applied! You get a ${discount}% discount.`);
    } else {
        discount = 0;
        alert("Invalid promo code.");
    }
    updateCart();
}

document.getElementById("clear-cart").addEventListener("click", () => {
    cart = [];
    updateCart();
});
