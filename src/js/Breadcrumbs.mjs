export default class Breadcrumbs {
    constructor(category, productCount) {
        this.category = category;
        this.productCount = productCount;
    }

    render() {
        const breadcrumb = document.querySelector(".breadcrumbs");

        if (!breadcrumb) return;

        breadcrumb.innerHTML = `
      <a href="/index.html">Home</a>
      <span> &gt; </span>
      <span>${this.category} (${this.productCount} items)</span>
    `;
    }
}