import {
  getLocalStorage,
  setLocalStorage,
  alertMessage,
  removeAllAlerts,
} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: Number(item.quantity) || 1,
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(
      `${this.outputSelector} #cartTotal`
    );
    const itemNumElement = document.querySelector(
      `${this.outputSelector} #num-items`
    );
    const totalCount = this.list.reduce(
      (sum, item) => sum + (Number(item.quantity) || 1),
      0
    );
    if (itemNumElement) itemNumElement.innerText = totalCount;
    this.itemTotal = this.list.reduce(
      (sum, item) =>
        sum + (Number(item.FinalPrice) || 0) * (Number(item.quantity) || 1),
      0
    );
    if (summaryElement)
      summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    const totalCount = this.list.reduce(
      (sum, item) => sum + (Number(item.quantity) || 1),
      0
    );
    this.tax = this.itemTotal * 0.06;
    this.shipping = totalCount > 0 ? 10 + (totalCount - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(
      `${this.outputSelector} #shipping`
    );
    const orderTotal = document.querySelector(
      `${this.outputSelector} #orderTotal`
    );
    if (tax) tax.innerText = `$${this.tax.toFixed(2)}`;
    if (shipping) shipping.innerText = `$${this.shipping.toFixed(2)}`;
    if (orderTotal) orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout() {
    const formElement = document.forms["checkout"];
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal.toFixed(2);
    order.tax = this.tax.toFixed(2);
    order.shipping = this.shipping;
    order.items = packageItems(this.list);

    try {
      const response = await services.checkout(order);
      console.log(response);
      // Happy Path: clear cart + go to success page
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      // Unhappy Path: stay on form, show alerts, don't lose data
      console.log(err);
      removeAllAlerts();
      const message = err.message || {};
      // Server sends back { cardNumber: "Invalid..." } etc.
      Object.values(message).forEach((msg) => alertMessage(msg));
    }
  }
}