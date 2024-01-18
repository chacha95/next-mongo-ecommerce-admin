import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { UploadIcon } from "../icons";
import Spinner from "../spinner";

export default function ProductForm(props) {
  const {
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
  } = props;

  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState(existingImages || []);

  async function saveProduct(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
    };
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
      router.push("/products");
    } else {
      await axios.post("/api/products", data);
      router.push("/products");
    }
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;

    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();

      for (const file of files) {
        data.append("file", file);
      }

      const res = await axios.post("/api/upload", data);

      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <h1 className="text-white mb-4 text-lg">New Product</h1>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        {!!images?.length &&
          images.map((link) => (
            <div key={link} className="h-24 max-h-full">
              <img src={link} alt="" className="rounded-lg" />
            </div>
          ))}
        {isUploading && (
          <div className="h-24">
            <Spinner />
          </div>
        )}
        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          <UploadIcon />
          <div>Upload image</div>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
        {!images?.length && <div>No Photos in this product</div>}
      </div>

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
