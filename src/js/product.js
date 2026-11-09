<<<<<<< HEAD
import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

=======
import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

const productId = getParam("product");
>>>>>>> 31e44f9ef7636c790b9e3ac9642520e02bd6e421
const dataSource = new ProductData("tents");
const product = new ProductDetails(productId, dataSource);
product.init();