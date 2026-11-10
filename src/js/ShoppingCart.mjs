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
        let i = 0;
        let cartTotal = 0;
        if (array.length == 0) {
          cartTotal = 0;
        }
        else {
            while (i < array.length) {
              cartTotal += array[i].FinalPrice;
              i++;
          }
        }
        total.innerHTML = `Total: $${cartTotal.toFixed(2)}`;
    }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}