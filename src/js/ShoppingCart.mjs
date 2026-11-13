import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ShoppingCart {
    constructor() {}

    renderCartContents() {
      const cartItems = getLocalStorage("so-cart") || [];
      if (cartItems.length === 0) {
        document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
      }
      else {
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        document.querySelector(".product-list").innerHTML = htmlItems.join("");
        this.getCartTotal(cartItems);
      }
    }

    getCartTotal(array) {
        const total = document.querySelector(".sum-cost");
        let cartTotal = 0;
        if (array && array.length > 0) {
          cartTotal = array.reduce(
            (sum, item) => sum + (Number(item.FinalPrice) || 0) * (Number(item.quantity) || 1),
            0,
          );
        }
        if (total) {
          total.innerHTML = `Total: $${cartTotal.toFixed(2)}`;
        }
        return cartTotal;
    }
}

function cartItemTemplate(item) {
  const quantity = Number(item.quantity) || 1;
  const price = Number(item.FinalPrice) || 0;
  const subtotal = price * quantity;
  const imageSrc =
    item.Image ||
    item.Images?.PrimarySmall ||
    item.Images?.PrimaryMedium ||
    "";
  const colorName =
    item.Colors && item.Colors[0] ? item.Colors[0].ColorName : "";

  const newItem = `<li class="cart-card divider">
  <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${imageSrc}"
      alt="${item.Name}"
    />
  </a>
  <a href="/product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  ${colorName ? `<p class="cart-card__color">${colorName}</p>` : ""}
  <p class="cart-card__quantity">qty: ${quantity}</p>
  <p class="cart-card__price">$${subtotal.toFixed(2)}</p>
</li>`;

  return newItem;
}