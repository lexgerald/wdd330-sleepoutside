import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // 1. Fetch the product details using the data source
    this.product = await this.dataSource.findProductById(this.productId);
    
    // 2. Render the product details to the HTML page
    this.renderProductDetails();
    
    // 3. Add listener to the Add to Cart button
    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    setLocalStorage('so-cart', this.product);
  }

  renderProductDetails() {
    // Dynamically inject product data into the HTML template
    document.querySelector('#productName').innerText = this.product.Brand.Name;
    document.querySelector('#productNameWithoutBrand').innerText = this.product.NameWithoutBrand;
    
    // FIXED IMAGE LINE HERE: Changed to PrimaryLarge
    document.querySelector('#product-image').src = this.product.Images.PrimaryLarge;
    
    document.querySelector('#product-image').alt = this.product.Name;
    document.querySelector('.product-card__price').innerText = `$${this.product.FinalPrice}`;
    document.querySelector('.product__color').innerText = this.product.Colors[0].ColorName;
    document.querySelector('.product__description').innerHTML = this.product.DescriptionHtmlSimple;
    document.querySelector('#addToCart').setAttribute('data-id', this.product.Id);
  }
}