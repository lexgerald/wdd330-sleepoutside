import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
  superscript,
} from "./utils.mjs";

loadHeaderFooter();

function getCartItems() {
  const rawItems = getLocalStorage("so-cart") || [];
  let changed = false;
  const consolidated = [];

  rawItems.forEach((item) => {
    const qty = Number(item.quantity) > 0 ? Number(item.quantity) : 1;
    const existing = consolidated.find((c) => c.Id === item.Id);
    if (existing) {
      existing.quantity = (Number(existing.quantity) || 1) + qty;
      changed = true;
    } else {
      if (item.quantity !== qty) {
        changed = true;
      }
      consolidated.push({ ...item, quantity: qty });
    }
  });

  if (changed) {
    setLocalStorage("so-cart", consolidated);
  }

  return consolidated;
}

function renderCartContents() {
  const cartItems = getCartItems();
  const listElement = document.querySelector(".product-list");
  const sumCostElement = document.querySelector(".sum-cost");
  const checkoutElement = document.querySelector("a[href*='checkout']");

  if (!listElement) return;

  if (cartItems.length === 0) {
    listElement.innerHTML = "<li>Your cart is empty.</li>";
    if (sumCostElement) {
      sumCostElement.textContent = "";
      sumCostElement.style.display = "none";
    }
    if (checkoutElement) {
      checkoutElement.style.display = "none";
    }
    superscript();
    return;
  }

  // Display cart items
  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );
  listElement.innerHTML = htmlItems.join("");

  // Calculate and display overall cart total
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + (Number(item.FinalPrice) || 0) * (Number(item.quantity) || 1),
    0,
  );

  if (sumCostElement) {
    sumCostElement.innerHTML = `Total: <strong>$${cartTotal.toFixed(2)}</strong>`;
    sumCostElement.style.display = "block";
  }

  if (checkoutElement) {
    checkoutElement.style.display = "block";
  }

  // Event listeners for remove button
  listElement.querySelectorAll(".cart-card__remove").forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });

  // Event listeners for quantity controls
  listElement.querySelectorAll(".quantity-btn--increase").forEach((button) => {
    button.addEventListener("click", increaseQuantity);
  });

  listElement.querySelectorAll(".quantity-btn--decrease").forEach((button) => {
    button.addEventListener("click", decreaseQuantity);
  });

  superscript();
}

function cartItemTemplate(item, index) {
  const quantity = Number(item.quantity) || 1;
  const price = Number(item.FinalPrice) || 0;
  const subtotal = price * quantity;
  const imageSrc =
    item.Image ||
    item.Images?.PrimaryMedium ||
    item.Images?.PrimarySmall ||
    item.Images?.PrimaryLarge ||
    "";
  const colorName =
    item.Colors && item.Colors[0] ? item.Colors[0].ColorName : "";

  return `
  <li class="cart-card divider">
    <a
      href="/product_pages/index.html?product=${item.Id}"
      class="cart-card__image"
    >
      <img src="${imageSrc}" alt="${item.Name}" />
    </a>

    <a href="/product_pages/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>

    ${colorName ? `<p class="cart-card__color">${colorName}</p>` : ""}

    <div class="cart-card__quantity">
      <button
        type="button"
        class="quantity-btn quantity-btn--decrease"
        data-index="${index}"
        aria-label="Decrease quantity of ${item.Name}"
        ${quantity <= 1 ? "disabled" : ""}
      >-</button>
      <span class="quantity-val" aria-label="Quantity: ${quantity}">qty: ${quantity}</span>
      <button
        type="button"
        class="quantity-btn quantity-btn--increase"
        data-index="${index}"
        aria-label="Increase quantity of ${item.Name}"
      >+</button>
    </div>

    <p class="cart-card__price">
      $${subtotal.toFixed(2)}
      ${quantity > 1 ? `<span class="cart-card__unit-price">($${price.toFixed(2)} ea)</span>` : ""}
    </p>

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

function increaseQuantity(event) {
  const index = Number(event.currentTarget.dataset.index);
  const cartItems = getCartItems();
  if (cartItems[index]) {
    cartItems[index].quantity = (Number(cartItems[index].quantity) || 1) + 1;
    setLocalStorage("so-cart", cartItems);
    renderCartContents();
  }
}

function decreaseQuantity(event) {
  const index = Number(event.currentTarget.dataset.index);
  const cartItems = getCartItems();
  if (cartItems[index]) {
    const currentQty = Number(cartItems[index].quantity) || 1;
    if (currentQty > 1) {
      cartItems[index].quantity = currentQty - 1;
      setLocalStorage("so-cart", cartItems);
      renderCartContents();
    }
  }
}

function removeFromCart(event) {
  const index = Number(event.currentTarget.dataset.index);
  const cartItems = getCartItems();
  if (cartItems[index]) {
    cartItems.splice(index, 1);
    setLocalStorage("so-cart", cartItems);
    renderCartContents();
  }
}

renderCartContents();
