// db.js
import { JsonDB, Config } from "node-json-db";

// Create DB instance
const db = new JsonDB(new Config("myDatabase", true, true, "/"));

export default db;
