import { Db } from "../../data/db.js";

const db = new Db();

const resolver = {
  Query: {
    getProduct: async (_, { id } = {}) => {
      return await db.get(id);
    },

    deleteProduct: async (_, { id } = {}) => {
      return await db.delete(id);
    },
  },
  Mutation: {
    addProducts: async (
      _,
      { input: { name, description, price, inStock, type } = {} } = {}
    ) => {
      console.log("incalll");
      const id = await db.push({
        name,
        description,
        price,
        inStock,
        type,
      });

      return id;
    },
    updateProducts: async (
      _,
      { input: { id, name, description, price, inStock, type } = {} } = {}
    ) => {
      return await db.put(id, {
        name,
        description,
        price,
        inStock,
        type,
      });
    },
  },
};

export default resolver;
