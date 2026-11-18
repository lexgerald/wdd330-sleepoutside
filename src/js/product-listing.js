import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category") || "tents";
const dataSource = new ProductData(); // <-- NO category here anymore
const listElement = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, listElement);
productList.init();

const sortSelect = document.querySelector("#sort");
if (sortSelect) {
  sortSelect.addEventListener("change", (e) => {
    productList.sortList(e.target.value);
  });
}