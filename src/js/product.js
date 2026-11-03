import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

<<<<<<< HEAD
// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }
=======
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.currentTarget.dataset.id);
  addProductToCart(product);
}
>>>>>>> 4dd0e3270a7b8597a774b79eba158e4b355c44da

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
