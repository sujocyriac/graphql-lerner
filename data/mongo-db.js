import mongoose, { ObjectId } from "mongoose";

export class MongodbAdapter {
  constructor() {
    this._connected = false;
    this.connectMongo();
    this._model = null;
  }

  async connectMongo() {
    if (this._connected) return;
    try {
      await mongoose.connect("mongodb://mongo:27017/shopdb");
      this._connected = true;
    } catch (error) {
      console.error(error);
    }
  }

  async getModel() {
    if (this._model) return this._model;

    // reuse existing model if already registered
    if (mongoose.models && mongoose.models.Products) {
      this._model = mongoose.models.Products;
      return this._model;
    }

    const widgetSchema = new mongoose.Schema({
      id: String,
      name: String,
      description: String,
      price: Number,
      inStock: Boolean,
      type: String,
      storeLocations: Array,
    });

    this._model = mongoose.model("Products", widgetSchema);
    return this._model;
  }

  // insert a product document and return the saved doc
  async push(product) {
    const Model = await this.getModel();
    try {
      const [{ _id } = {}] = await Model.insertMany(product);
      return _id;
    } catch (err) {
      console.error("❌ Insert error:", err);
    }
  }

  async get(id) {
    const Product = await this.getModel();
    try {
      const { name, description, price, inStock, type, storeLocations } =
        (await Product.findById(id)) || {};

      return {
        id,
        name,
        description,
        price,
        inStock,
        type,
        storeLocations,
      };
    } catch (err) {
      console.error("❌  error:", err);
    }
  }

  async put(id, data) {
    const Product = await this.getModel();
    try {
      const updated = await Product.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id), // must be string or ObjectId
        { $set: data }, // <-- use $set
        { new: true }
      );
      const { name, description, price, inStock, type, storeLocations } =
        updated;
      console.log(updated, name);
      return { id, name, description, price, inStock, type, storeLocations };
    } catch (error) {
      console.error(`Updating record with id: ${id} failed`, error);
    }
  }

  async delete(id) {
    const Product = await this.getModel();
    try {
      await Product.findByIdAndDelete(id);
      return id;
    } catch (error) {
      console.error(`Deteting record with id: ${id} failed`, error);
    }
  }
}
