const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
<<<<<<< HEAD
  constructor() {
    // this.category = category;
    // this.path = `../public/json/${this.category}.json`;
=======
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
>>>>>>> 31e44f9ef7636c790b9e3ac9642520e02bd6e421
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }
}
