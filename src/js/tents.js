
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);

productList.init();
