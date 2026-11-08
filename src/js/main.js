console.log("Main.js loaded");

import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// 1. Setup the Product List (only if the element exists on the page)
const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

if (listElement) {
  const tentList = new ProductList("Tents", dataSource, listElement);
  tentList.init();
}

// 2. Setup the Newsletter Form
function initNewsletter() {
  const form = document.getElementById("newsletter-form");
  if (!form) return; // Stop if the form isn't on this page

  const emailInput = document.getElementById("newsletter-email");
  const message = document.getElementById("newsletter-msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // STOP THE REFRESH!

    const email = emailInput.value.trim();
    
    // Basic validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      message.textContent = "Please enter a valid email address.";
      message.style.color = "red";
      emailInput.focus();
      return;
    }

    // Save to localStorage
    const list = JSON.parse(localStorage.getItem("newsletterEmails")) || [];
    if (!list.includes(email)) list.push(email);
    localStorage.setItem("newsletterEmails", JSON.stringify(list));

    // Show success message
    message.textContent = `Thanks! ${email} is now subscribed.`;
    message.style.color = "green";
    form.reset();
  });
}

// Call the function
initNewsletter();

console.log("Main.js loaded");
