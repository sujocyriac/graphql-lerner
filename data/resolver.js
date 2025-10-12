import { v4 as uuidv4 } from "uuid";
import db from "./db.js";

export class Resolver {
  addProducts({
    input: { name, description, price, inStock, type } = {},
  } = {}) {
    const id = uuidv4();

    // Add a user
    db.push("/products[]", {
      id,
      name,
      description,
      price,
      inStock,
      type,
    });

    return id;
  }

  getProduct({ id } = {}) {
    const products = db.getData("/products");
    return products.find((product) => product.id === id);
  }
}
