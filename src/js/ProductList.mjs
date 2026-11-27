import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <picture>
        <source
          media="(max-width: 500px)"
          srcset="${product.Images.PrimarySmall}"
        >
        <source
          media="(min-width: 1000px)"
          srcset="${product.Images.PrimaryLarge}"
        >
        <img
          src="${product.Images.PrimaryMedium}"
          alt="Image of ${product.Brand.Name}"
        >
      </picture>
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
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("search");

    let list = [];
    let title = "";

    if (searchQuery) {
      // SEARCH MODE - from navbar form
      list = await this.dataSource.searchProducts(searchQuery);
      title = `Search: ${searchQuery}`;
      this.renderList(list || []);
      this.renderBreadcrumb(list, title);
      const titleElement = document.querySelector(".title");
      if (titleElement) titleElement.textContent = title;
      return;
    }

    // NORMAL MODE - category listing
    list = await this.dataSource.getData(this.productCategory);
    this.renderList(list);
    this.renderBreadcrumb(list);

    const titleElement = document.querySelector(".title");
    if (titleElement && this.productCategory) {
      const formatted =
        this.productCategory.charAt(0).toUpperCase() +
        this.productCategory.slice(1);
      titleElement.textContent = formatted.replace("-", " ");
    }
  }

  renderList(productList) {
    renderListWithTemplate(productCardTemplate, this.listElement, productList);
    if (!productList || productList.length === 0) {
      this.listElement.innerHTML = `<p>No products found. Try another search.</p>`;
    }
  }

  renderBreadcrumb(list, label = null) {
    const breadcrumb = document.querySelector(".breadcrumb");
    if (!breadcrumb) return;
    const category = label || this.productCategory || "Tents";
    const categoryName =
      category.charAt(0).toUpperCase() + category.slice(1);
    const count = Array.isArray(list) ? list.length : 0;
    const countLabel = count === 1 ? "item" : "items";
    breadcrumb.innerHTML = `<span class="breadcrumb-category">${categoryName}</span> &rarr; (${count} ${countLabel})`;
  }
}