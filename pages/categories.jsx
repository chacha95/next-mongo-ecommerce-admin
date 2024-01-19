import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { useState, useEffect } from 'react';

import Layout from '@/components/layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export default function Categories() {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [categories]);

  function fetchCategories() {
    axios.get('/api/categories').then((result) => {
      setCategories(result.data);
    });
  }

  async function saveCategory(e) {
    e.preventDefault();

    const data = {
      name
    };

    await axios.post('/api/categories', data);
    setName('');
  }

  function editCategory() {}

  function deleteCategory() {}

  return (
    <Layout>
      <h1>Categories</h1>
      <form onSubmit={saveCategory}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="text">New category name</Label>
          <Input
            type="text"
            value={name}
            placeholder="Category name"
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
        </div>
        <Button type="submit">Save</Button>
      </form>

      <Table>
        <TableHeader key={uuid()}>
          <TableRow key={uuid()}>
            <TableHead key={uuid()} className="w-[300px]">
              Category name
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody key={uuid()}>
          {categories.length > 0 &&
            categories.map((category) => (
              <TableRow key={uuid()}>
                <TableCell className="font-medium" key={uuid()}>
                  {category.name}
                </TableCell>
                <td>
                  <Button
                    key={uuid()}
                    onClick={() => editCategory(category)}
                    className="btn-basic mr-2"
                  >
                    Edit
                  </Button>
                  <Button key={uuid()} onClick={() => deleteCategory(category)} className="btn-red">
                    Delete
                  </Button>
                </td>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Layout>
  );
}
