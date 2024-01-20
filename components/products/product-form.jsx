import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { UploadIcon } from '@/components/icons';
import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export default function ProductForm(props) {
  const {
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category: assignedCategory
  } = props;

  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(assignedCategory || '');

  async function saveProduct(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      price,
      images,
      category
    };
    if (_id) {
      await axios.put('/api/products', { ...data, _id });
      router.push('/products');
    } else {
      await axios.post('/api/products', data);
      router.push('/products');
    }
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;

    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();

      for (const file of files) {
        data.append('file', file);
      }

      const res = await axios.post('/api/upload', data);

      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  useEffect(() => {
    axios.get('/api/categories').then((result) => {
      console.log(result.data);
      setCategories(result.data);
      console.log(categories);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <form onSubmit={saveProduct}>
        <h1 className="mb-4 text-lg text-white">New Product</h1>

        {/* Product name */}
        <div className="mb-2 grid items-center gap-1.5">
          <Label htmlFor="text">Product name</Label>
          <Input
            type="text"
            placeholder="product name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required={true}
          />
        </div>

        {/* Description */}
        <div className="mb-2 grid items-center gap-1.5">
          <Label htmlFor="text">Description</Label>
          <Input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required={true}
          />
        </div>

        {/* Price */}
        <div className="mb-2 grid items-center gap-1.5">
          <Label htmlFor="text">Price</Label>
          <Input
            type="number"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required={true}
          />
        </div>

        {/* Category */}
        <div className="mb-4 gap-1.5">
          <Label htmlFor="text">Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue
                placeholder="Uncategorized"
                onChange={(e) => setCategory(e.target.value)}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((c) => {
                  <SelectItem key={uuid()}>{c.name}</SelectItem>;
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* upload image */}
        <div className="mb-4 flex flex-wrap items-center ">
          <label className="mb-2 mr-2 flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-sm border border-primary bg-white text-center text-sm text-primary shadow-sm">
            <UploadIcon />
            <div>Upload image</div>
            <input
              type="file"
              onChange={uploadImages}
              className="hidden"
              required={true}
            />
          </label>

          {/* <ReactSortable list={images} setList={updateImagesOrder} className="flex flex-wrap gap-1"> */}
          {!!images?.length &&
            images.map((link) => (
              <div key={link} className="ml-2 h-24 max-h-full">
                <Image
                  key={link}
                  width={100}
                  height={100}
                  src={link}
                  alt=""
                  className="rounded=lg"
                />
                {/* <img key={link} src={link} alt="" className="rounded-lg" /> */}
              </div>
            ))}
          {/* </ReactSortable> */}
          {isUploading && (
            <div className="h-24">
              <Spinner />
            </div>
          )}
          {!images?.length && <div>No Photos in this product</div>}
        </div>

        {/* Save */}
        <Button>Save</Button>
      </form>
    </div>
  );
}
