const products = [
    { id: 1, name: "Non - Spill Trainer Cup", description: "Non-Spill Trainer Cup can catch your baby’s eye and encourage them to drink independently, with the handles helping develop grasping and holding skills.", price: 10.00, image: "product1.jpg" },
    { id: 2, name: "WOW Nail Color", description: "Dive into a world of vibrant hues and endless possibilities with our extensive range of colors, each formulated to add a touch of dazzle to your nails.", price: 20.00, image: "product2.jpg" }
];

document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="100">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
});
