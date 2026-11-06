import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Create an instance of ProductData for tents
const dataSource = new ProductData("tents");

// Grab the product list element from the DOM (e.g., a <ul class="product-list"> in your index.html)
const listElement = document.querySelector(".product-list");

// Create an instance of ProductList and initialize it
const tentList = new ProductList("Tents", dataSource, listElement);
tentList.init();