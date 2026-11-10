import { getLocalStorage, setLocalStorage, calcDiscount, superscript } from "./utils.mjs";

export default class ProductDetails {

    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document.getElementById("addToCart").addEventListener("click", this.addProductToCart.bind(this));

        // ADDED: init comments once the product is on the page
        this.initComments();
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);

        superscript();
    }

    renderProductDetails() {
        const element = document.querySelector(".product-detail");
        element.innerHTML = productDetailsTemplate(this.product);
    }

    // ===== ADDED: comments subsystem =====
    initComments() {
        const productId = this.product.Id;
        const storageKey = `so-comments-${productId}`;

        const listEl  = document.getElementById("comments-list");
        const formEl  = document.getElementById("comment-form");
        const inputEl = document.getElementById("comment-text");
        const msgEl   = document.getElementById("comment-msg");

        if (!listEl || !formEl) return; // safety: HTML not present

        const render = () => {
            const comments = getLocalStorage(storageKey) || [];
            listEl.innerHTML = comments.length
                ? comments
                      .map((c) => {
                          const date = new Date(c.timestamp).toLocaleString();
                          return `<p class="comment-item">
                              <span class="comment-date">${date}</span>
                              <br />${escapeHtml(c.text)}
                          </p>`;
                      })
                      .join("")
                : `<p class="no-comments">No comments yet. Be the first!</p>`;
        };

        formEl.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = inputEl.value.trim();

            if (!text) {
                msgEl.textContent = "Please enter a comment.";
                msgEl.className = "error";
                return;
            }

            const comments = getLocalStorage(storageKey) || [];
            comments.push({ text, timestamp: Date.now() });
            setLocalStorage(storageKey, comments);

            msgEl.textContent = "Comment added!";
            msgEl.className = "success";
            inputEl.value = "";
            render();
        });

        render();
    }
}

// ADDED: escape user input before inserting into HTML
function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function productDetailsTemplate(product) {
    const discount = calcDiscount(product.FinalPrice, product.SuggestedRetailPrice);
    return `<section class="product-detail">
        <h3>${product.Brand.Name}</h3>

        <h2 class="divider">${product.NameWithoutBrand}</h2>

        <img
          class="divider"
          src="${product.Images.PrimaryLarge}"
          alt="${product.Name}"
        />

        <p class="product-card__price">${product.FinalPrice}</p>

        ${discount > 0 ? `<p>Discounted at ${discount}% off!</p>` : ""}

        <p class="product__color">${product.Colors[0].ColorName}</p>

        <p class="product__description">
          ${product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
      </section>`;
}