import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

// 1. Get the category from the URL (e.g., ?category=tents)
const category = getParam("category");

// 2. Setup the Product List
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

if (listElement) {
  // Create the list using the category from the URL
  const productList = new ProductList(category, dataSource, listElement);
  productList.init();
}

// Note: loadHeaderFooter() was not in your main.js, but if you have a function 
// for it in utils.mjs, you can add it here just like the instructions showed.