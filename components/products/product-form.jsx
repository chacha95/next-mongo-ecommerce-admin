import { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactSortable } from 'react-sortablejs';
import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';

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
  SelectLabel,
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
      result.data;
    });
  });

  return (
    <form onSubmit={saveProduct}>
      <h1 className="mb-4 text-lg text-white">New Product</h1>

      <div className="mb-2 grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="text">Product name</Label>
        <Input
          type="text"
          placeholder="product name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required={true}
        />
      </div>

      <div className="mb-2 grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="text">Description</Label>
        <Input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required={true}
        />
      </div>

      <div className="mb-2 grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="text">Price</Label>
        <Input
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required={true}
        />
      </div>

      <div className="mb-4 gap-1.5">
        <Label htmlFor="text">Category</Label>
        <Select>
          <SelectTrigger className="w-full max-w-sm">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map((c) => {
                <SelectItem value="art" key={uuid()}>
                  {c.name}
                </SelectItem>;
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4 flex w-full max-w-sm flex-wrap items-center ">
        <ReactSortable list={images} setList={updateImagesOrder} className="flex flex-wrap gap-1">
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
        <label className="mr-2 flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-sm border border-primary bg-white text-center text-sm text-primary shadow-sm">
          <UploadIcon />
          <div>Upload image</div>
          <input type="file" onChange={uploadImages} className="hidden" required={true} />
        </label>
        {!images?.length && <div>No Photos in this product</div>}
      </div>

      <Button>Save</Button>
    </form>
  );
}
