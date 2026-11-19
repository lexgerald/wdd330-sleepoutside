import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ShoppingCart {
    constructor() {
      // We bind 'this' so we can use it inside the event listener later
      this.removeItemHandler = this.removeItemHandler.bind(this);
    }

    renderCartContents() {
      const cartItems = getLocalStorage("so-cart") || [];
      const listElement = document.querySelector(".product-list");

      if (cartItems.length === 0) {
        listElement.innerHTML = "<p>Your cart is empty.</p>";
      }
      else {
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        listElement.innerHTML = htmlItems.join("");
        this.getCartTotal(cartItems);
        
        // NEW: Attach the event listeners to all the "X" buttons
        this.addRemoveListeners();
      }
    }

    // NEW: This function adds the click listener to the X buttons
    addRemoveListeners() {
      const removeButtons = document.querySelectorAll(".cart-remove");
      removeButtons.forEach((button) => {
        button.addEventListener("click", this.removeItemHandler);
      });
    }

    // NEW: This function handles the removal logic
    removeItemHandler(event) {
      // 1. Get the ID of the item clicked
      const productId = event.target.dataset.id;
      
      // 2. Get the current cart from local storage
      let cartItems = getLocalStorage("so-cart") || [];
      
      // 3. Filter out the item with the matching ID
      cartItems = cartItems.filter((item) => item.Id !== productId);
      
      // 4. Save the updated cart back to local storage
      setLocalStorage("so-cart", cartItems);
      
      // 5. Re-render the cart to show the changes
      this.renderCartContents();
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
  <!-- NEW: Added the remove X button here with the data-id -->
  <span class="cart-remove" data-id="${item.Id}" style="cursor: pointer; color: red; font-weight: bold; margin-left: 10px;">❌</span>
  
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