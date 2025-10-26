import { JsonDbAdapter } from "./json-db";
import { MongodbAdapter } from "./mongo-db";

export class Db {
  static _instance = null;

  constructor() {
    if (Db._instance) {
      return Db._instance;
    }
    console.log("Initializing JSON DB instance");

    this.db = new MongodbAdapter();
    Db._instance = this;
  }

  async get(id) {
    return await this.db.get(id);
  }

  async push(path, data, override = true) {
    return this.db.push(path, data, override);
  }

  async put(id, data) {
    return await this.db.put(id, data);
  }

  delete(id) {
    return this.db.delete(id);
  }
}
