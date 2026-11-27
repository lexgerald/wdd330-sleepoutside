// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Get product via query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  if (product) return product;
  return null;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  const combinedHtml = htmlStrings.join("");
  parentElement.insertAdjacentHTML(position, combinedHtml);
}

// Calculates the discount percentage for a product listing.
export function calcDiscount(finalPrice, suggestedPrice) {
  const discount = ((suggestedPrice - finalPrice) / suggestedPrice) * 100;
  return discount.toFixed(0);
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  superscript();
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  const main = document.querySelector("main");
  if (!main) return;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      alert.remove();
    }
  });

  main.prepend(alert);

  if (scroll) window.scrollTo(0, 0);

  if (duration) {
    setTimeout(() => alert.remove(), duration);
  }
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => alert.remove());
}

export function superscript() {
  const cartNum = document.querySelector(".cart .superscript");
  if (!cartNum) return;
  const cartItems = getLocalStorage("so-cart") || [];
  const count = cartItems.reduce(
    (total, item) => total + (Number(item.quantity) || 1),
    0
  );

  if (count === 0) {
    cartNum.classList.add("hide");
  } else {
    cartNum.classList.remove("hide");
    cartNum.innerHTML = `${count}`;
  }
}

// Animate the cart (backpack) icon when an item is added
export function animateCartIcon() {
  const cartIcon = document.querySelector(".cart");
  if (!cartIcon) return;

  // Remove the class first so the animation can play again on every click
  cartIcon.classList.remove("cart-animate");
  void cartIcon.offsetWidth; // forces the browser to restart the animation
  cartIcon.classList.add("cart-animate");

  // Clean up when the animation finishes
  cartIcon.addEventListener(
    "animationend",
    () => cartIcon.classList.remove("cart-animate"),
    { once: true }
  );
}