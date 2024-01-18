import { useState } from "react";
import axios from "axios";

import Layout from "../../components/Layout";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  async function createProduct() {
    await axios.post("/api/products", data);
  }

  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1 className="text-white mb-4 text-lg">New Product</h1>
        <label>Product name</label>
        <input
          type="text"
          placeholder="product name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Price (in USD)</label>
        <textarea
          placeholder="price"
          type="number"
          value={price}
          onChange={(e) => setPrice((e) => e.target.value)}
        />
        <button className="btn-primary">Save</button>
      </form>
    </Layout>
  );
}
