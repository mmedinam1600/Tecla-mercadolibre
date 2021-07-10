require('dotenv').config();
const fetch = require('node-fetch');

class MercadoClass {
  constructor(uri) {
    this.url = process.env.BASE_URL + uri;
    console.log(this.url);
  }

  async makeFech() {
    let mercadoUrl = await fetch(this.url);
    return mercadoUrl.json();
  }
}

module.exports = {
  MercadoClass
}