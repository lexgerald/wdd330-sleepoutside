import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  // Read the saved cart. Empty array for a 1st time visitor
  const cartItems = getLocalStorage("so-cart") || [];
  const listElement = document.querySelector(".product-list");

  // Show message when cart is empty
  if (cartItems.length === 0) {
    listElement.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }

  // Passing product and array position to the template
  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );

  // Replace previous list. Removed items disappear
  listElement.innerHTML = htmlItems.join("");

  // Attaching listener to each button
  listElement.querySelectorAll(".cart-card__remove").forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });
}

function cartItemTemplate(item, index) {
  return `
  <li class="cart-card divider">
    <a
      href="/product_pages/index.html?product=${item.Id}"
      class="cart-card__image"
    >
      <img src="${item.Image}" alt="${item.Name}" />
    </a>

    <a href="/product_pages/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>

    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>

    <button
      type="button"
      class="cart-card__remove"
      data-index="${index}"
      aria-label="Remove ${item.Name} from cart"
    >
      &times;
    </button>
  </li>
  `;
}

function removeFromCart(event) {
  //String values to numbers
  const index = Number(event.currentTarget.dataset.index);

  // Retrieving cart to modify it
  const cartItems = getLocalStorage("so-cart") || [];

  // Removing one entry
  cartItems.splice(index, 1);

  // Save the updated array
  setLocalStorage("so-cart", cartItems);

  // Redrawing the cart
  renderCartContents();
}

// Displaying the saved cart
renderCartContents();
