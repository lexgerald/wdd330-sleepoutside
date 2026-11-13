import Alert from "./Alert.js";
import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";


loadHeaderFooter();

// Initialize and render the alert on the index page
const alert = new Alert();
alert.render();

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

    // Basic validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      message.textContent = "Please enter a valid email address.";
      message.className = "error";
      emailInput.focus();
      return;
    }

    // Save locally (so the feature "does something" without a backend)
    const list = JSON.parse(localStorage.getItem("newsletterEmails") || "[]");
    if (!list.includes(email)) list.push(email);
    localStorage.setItem("newsletterEmails", JSON.stringify(list));

    // Confirm to user
    message.textContent = `Thanks! ${email} is now subscribed.`;
    message.className = "success";
    form.reset();
  });
}

// Run after DOM is ready
document.addEventListener("DOMContentLoaded", initNewsletter);
