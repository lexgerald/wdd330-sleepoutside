
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Brand.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(productCategory, dataSource, listElement) {
    this.productCategory = productCategory;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.productCategory);
    this.renderList(list);
    this.renderBreadcrumb(list);
  }

  renderList(productList) {
    renderListWithTemplate(productCardTemplate, this.listElement, productList);
  }

  renderBreadcrumb(list) {
    const breadcrumb = document.querySelector(".breadcrumb");
    if (breadcrumb) {
      const category = this.productCategory || "Tents";
      const categoryName =
        category.charAt(0).toUpperCase() + category.slice(1);
      const count = Array.isArray(list) ? list.length : 0;
      const countLabel = count === 1 ? "item" : "items";
      breadcrumb.innerHTML = `<span class="breadcrumb-category">${categoryName}</span> &rarr; (${count} ${countLabel})`;
    }
  }
}
