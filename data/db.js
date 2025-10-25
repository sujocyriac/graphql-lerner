import { JsonDB, Config } from "node-json-db";
import path from "path";

export class Db {

    static _instance = null;

    constructor() {
        if (Db._instance) {
            return Db._instance;
        }
        console.log("Initializing JSON DB instance");
        const filename = path.join(__dirname, 'json-db/database');
        this.db = new JsonDB(new Config(filename, true, false, '/'));
        Db._instance = this;
    }

    getDB() {
        return this.db;
    }

    // convenience wrappers
    async get(path) {
        return await this.db.getData(path);
    }

    push(path, data, override = true) {
        console.log("Pushing data to DB at path:", path, data);
        return this.db.push(path, data, override);
    }

    delete(path) {
        return this.db.delete(path);
    }


}
