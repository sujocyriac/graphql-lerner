import { JsonDB, Config } from "node-json-db";
import path from "path";

export class JsonDbAdapter {
  constructor() {
    const filename = path.join(__dirname, "json-db/database");
    this.db = new JsonDB(new Config(filename, true, false, "/"));
  }

  getDB() {
    return this.db;
  }

  // convenience wrappers
  async get(id) {
    const products = await this.db.getData("/products");
    return products.find((p) => p.id === id) || null;
  }

  async push(data) {
    console.log("Pushing data to DB at path:", path, data);
    return this.db.push("/products[]", data, override);
  }

  async delete(path) {
    return this.db.delete(path);
  }
}
