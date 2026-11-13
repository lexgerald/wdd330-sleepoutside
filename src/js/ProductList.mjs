
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const finalPrice = Number(product.FinalPrice);
  const retailPrice = Number(product.SuggestedRetailPrice);

  let discountHTML = "";

  // Check whether the product is discounted
  if (
    Number.isFinite(finalPrice) &&
    Number.isFinite(retailPrice) &&
    retailPrice > 0 &&
    finalPrice >= 0 &&
    finalPrice < retailPrice
  ) {
    const savings = retailPrice - finalPrice;

    const discountPercentage = Math.round(
      (savings / retailPrice) * 100
    );

    // Display discount information
    discountHTML = `
      <span class="discount-badge">
        ${discountPercentage}% OFF
      </span>

      <p class="product-card__original-price">
        $${retailPrice.toFixed(2)}
      </p>

      <p class="product-card__savings">
        You save $${savings.toFixed(2)}
      </p>
    `;
  }

  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Brand.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>

      <p class="product-card__price">
        $${finalPrice.toFixed(2)}
      </p>

      ${discountHTML}
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

    const title = this.productCategory.charAt(0).toUpperCase() +
      this.productCategory.slice(1);

    document.querySelector(".title").textContent = title.replace("-", " ");
  }

  renderList(productList) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      productList
    );
  }
}
