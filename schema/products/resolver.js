import { v4 as uuidv4 } from "uuid";
import { Db } from "../../data/db.js";

const jsonDb = new Db();

const resolver = {
  Query: {
    getProduct: async (_, { id } = {}) => {
      let productItems = [];
      const products = await jsonDb.get("/products") || [];
      return products.find((p) => p.id === id) || null;
    },
  },

  Mutation: {
    addProducts: (_, { input: { name, description, price, inStock, type } = {} } = {}) => {
      const id = uuidv4();

      jsonDb.push("/products[]", {
        id,
        name,
        description,
        price,
        inStock,
        type,
      });
      return id;
    },
  },
};


export default resolver;
