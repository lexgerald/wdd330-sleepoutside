import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

document
  .querySelector("#zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

// submit event = browser runs required/pattern validation first
// if invalid, this listener never runs
document.forms["checkout"].addEventListener("submit", (e) => {
  e.preventDefault();
  order.checkout();
});