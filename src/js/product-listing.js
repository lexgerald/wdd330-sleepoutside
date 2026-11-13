import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category") || "tents";
const dataSource = new ProductData(category);
const listElement = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, listElement);

const title = document.querySelector(".products h2");
title.textContent = `Top Products: ${category
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ")}`;

productList.init();