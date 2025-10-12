import uuidv4 from "uuid";

export class Resolver {
  static products = [];

  addProducts({ input: { name, description, price, inStock } = {} } = {}) {
    const id = uuidv4();
    Resolver.products.push({ id, name, description, price, inStock });
    return id;
  }

  getProduct(id) {
    return Resolver.products.find((product) => product.id === id);
  }
}
