import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
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
    const title = this.productCategory.charAt(0).toUpperCase() + this.productCategory.slice(1);
    document.querySelector(".title").textContent = title.replace("-", " ");
  }
  renderList(productList) {
    renderListWithTemplate(productCardTemplate, this.listElement, productList);
  }
}

function productCardTemplate(product) {
  const discount = calcDiscount(
    product.FinalPrice,
    product.SuggestedRetailPrice,
  );
  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Brand.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
      ${discount > 0 ? `<p>Discounted at ${discount}% off!</p>` : ""}
    </a>
  </li>`;
}
