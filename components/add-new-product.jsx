import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function AddNewProductForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  async function createProduct(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      price,
    };
    await axios.post("/api/products", data);
    router.push("/products");
  }

  return (
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
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button className="btn-primary">Save</button>
    </form>
  );
}
