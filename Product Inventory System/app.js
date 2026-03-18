class Product {
  constructor(id, title, price, description, category, image) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.image = image;
  }

  getFormattedPrice() {
    return `$${this.price}`;
  }
}
class InventoryProduct extends Product {
  constructor(id, title, price, description, category, image) {
    super(id, title, price, description, category, image);
  }

  getShortDescription() {
    return this.description.substring(0, 100) + "...";
  }
}
class InventoryManager {
  constructor() {
    this.products = [];
  }

  async fetchProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      this.products = data.map(
        (item) =>
          new InventoryProduct(
            item.id,
            item.title,
            item.price,
            item.description,
            item.category,
            item.image,
          ),
      );

      this.displayProducts(this.products);
    } catch (error) {
      document.getElementById("productContainer").innerHTML =
        `<p style="color:red;">${error.message}</p>`;
    }
  }

  displayProducts(products) {
    const container = document.getElementById("productContainer");
    container.innerHTML = "";

    products.forEach((product) => {
      const div = document.createElement("div");

      div.innerHTML = `
                <h3>${product.title}</h3>
                <img src="${product.image}" width="100">
                <p>${product.getShortDescription()}</p>
                <strong>${product.getFormattedPrice()}</strong>
                <hr>
            `;

      container.appendChild(div);
    });
  }

  searchProduct(keyword) {
    const filtered = this.products.filter((p) =>
      p.title.toLowerCase().includes(keyword.toLowerCase()),
    );

    this.displayProducts(filtered);
  }

  filterByPrice(maxPrice) {
    const filtered = this.products.filter((p) => p.price <= maxPrice);

    this.displayProducts(filtered);
  }

  sortProducts(criteria) {
    let sorted = [...this.products];

    if (criteria === "priceLow") {
      sorted.sort((a, b) => a.price - b.price);
    }

    if (criteria === "priceHigh") {
      sorted.sort((a, b) => b.price - a.price);
    }

    if (criteria === "name") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    this.displayProducts(sorted);
  }
}
const manager = new InventoryManager();
manager.fetchProducts();

document.getElementById("search").addEventListener("input", (e) => {
  manager.searchProduct(e.target.value);
});

document.getElementById("filterBtn").addEventListener("click", () => {
  const maxPrice = document.getElementById("maxPrice").value;
  manager.filterByPrice(maxPrice);
});

document.getElementById("sort").addEventListener("change", (e) => {
  manager.sortProducts(e.target.value);
});
