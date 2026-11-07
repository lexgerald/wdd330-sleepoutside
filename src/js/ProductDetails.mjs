import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) { // constructor stores what the instace needs
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }

    async init() { // remembering the product to display, object to retrieve and where to store the retrieved info
        this.product = await this.dataSource.findProductById(
            this.productId
        );

        if (!this.product) { // handling missing or invalid product IDs
            document.querySelector(".product-detail").textContent =
                "Product not found.";
            return;
        }

        this.renderProductDetails();

        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this)); // preserve the class instance inside the click handler
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || []; // preserves exising cart behavior

        cartItems.push(this.product); // append the product to the array

        setLocalStorage("so-cart", cartItems); // saves the updated array
    }

    renderProductDetails() {
        const product = this.product;

        document.querySelector(".product-detail").innerHTML = `
      <h3>${product.Brand.Name}</h3>

      <h2 class="divider">${product.NameWithoutBrand}</h2>

      <img
        class="divider"
        src="${product.Image}"
        alt="${product.Name}"
      />

      <p class="product-card__price">
        $${product.FinalPrice.toFixed(2)}
      </p>

      <p class="product__color">
        ${product.Colors[0].ColorName}
      </p>

      <p class="product__description">
        ${product.DescriptionHtmlSimple}
      </p>

      <div class="product-detail__add">
        <button id="addToCart">Add to Cart</button>
      </div>
    `;
    }
}