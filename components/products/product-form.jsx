import { useState } from "react";
import axios from "axios";
import { ReactSortable } from "react-sortablejs";
import { useRouter } from "next/router";

import { UploadIcon } from "@/components/icons";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  function updateImagesOrder(images) {
    setImages(images);
  }

  return (
    <form onSubmit={saveProduct}>
      <h1 className="text-white mb-4 text-lg">New Product</h1>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="text">Product name</Label>
        <Input
          type="text"
          placeholder="product name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required={true}
        />
      </div>

      <label>Photos</label>
      <div className="mb-2 flex items-center flex-wrap gap-2">
        <ReactSortable
          list={images}
          setList={updateImagesOrder}
          className="flex flex-wrap gap-1"
        >
          {!!images?.length &&
            images.map((link) => (
              <div key={link} className="h-24 max-h-full">
                <img key={link} src={link} alt="" className="rounded-lg" />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24">
            <Spinner />
          </div>
        )}
        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          <UploadIcon />
          <div>Upload image</div>
          <input
            type="file"
            onChange={uploadImages}
            className="hidden"
            required={true}
          />
        </label>
        {!images?.length && <div>No Photos in this product</div>}
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="text">Description</Label>
        <Input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required={true}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="text">Price</Label>
        <Input
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required={true}
        />
      </div>

      <Button>Save</Button>
    </form>
  );
}
