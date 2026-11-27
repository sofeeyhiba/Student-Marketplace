const products = [
  {
    name: "Jollof Rice Combo",
    category: "Food",
    price: "₦2,500",
    seller: "Campus Kitchen"
  },
  {
    name: "Ankara Tote Bag",
    category: "Fashion",
    price: "₦6,000",
    seller: "Mira Accessories"
  },
  {
    name: "Graphic Design",
    category: "Services",
    price: "From ₦5,000",
    seller: "Design by Tola"
  },
  {
    name: "Calculus Textbook",
    category: "Books",
    price: "₦8,500",
    seller: "Daniel"
  }
];

const savedListings = JSON.parse(localStorage.getItem("smartListings") || "[]");
const productsForDisplay = [...savedListings, ...products];

const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search-input");

function renderProducts(items) {
  productGrid.innerHTML = "";

  for (const product of items) {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <p class="product-category">${product.category}</p>
      <h3>${product.name}</h3>
      <p>Sold by ${product.seller}</p>
      <p class="product-price">${product.price}</p>
    `;

    productGrid.appendChild(card);
  }

  if (items.length === 0) {
    productGrid.innerHTML = "<p>No matching products found.</p>";
  }
}

renderProducts(productsForDisplay);

document.querySelectorAll("[data-category]").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;

    const filtered =
      category === "All"
        ? products
        : products.filter((product) => product.category === category);

    renderProducts(filtered);
  });
});

searchInput.addEventListener("input", () => {
  const search = searchInput.value.toLowerCase();

  const matches = productsForDisplay.filter((product) =>
    `${product.name} ${product.category} ${product.seller}`
      .toLowerCase()
      .includes(search)
  );

  renderProducts(matches);
});

document.querySelector("#login-button").addEventListener("click", () => {
  alert("Cognito login will be connected in a later step.");
});
