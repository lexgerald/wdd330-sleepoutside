
import Alert from "./Alert.js";
import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

// Initialize and render the alert on the index page
const alert = new Alert();
alert.render();

// Initialize homepage products
const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, listElement);
productList.init();

// Newsletter sign-up
function initNewsletter() {
  const form = document.getElementById("newsletter-form");
  if (!form) return;

  const emailInput = document.getElementById("newsletter-email");
  const message = document.getElementById("newsletter-msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      message.textContent = "Please enter a valid email address.";
      message.className = "error";
      emailInput.focus();
      return;
    }

    const list = JSON.parse(localStorage.getItem("newsletterEmails") || "[]");
    if (!list.includes(email)) list.push(email);
    localStorage.setItem("newsletterEmails", JSON.stringify(list));

    message.textContent = `Thanks! ${email} is now subscribed.`;
    message.className = "success";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", initNewsletter);
