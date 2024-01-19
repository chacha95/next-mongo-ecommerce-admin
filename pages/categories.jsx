import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { withSwal } from 'react-sweetalert2';

import Layout from '@/components/layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function fetchCategories() {
    axios.get('/api/categories').then((result) => {
      setCategories(result.data);
      fetchCategories();
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

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(',')
      }))
    );
  }

  function deleteCategory(category) {
    console.log(category);
    swal
      .fire({
        title: 'Are you sure?',
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes, Delete!',
        confirmButtonColor: '#d55',
        reverseButtons: true
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete('/api/categories?_id=' + _id);
          fetchCategories();
        }
      });
  }

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

      <div className="w-full max-w-sm">
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
                  <td className="flex flex-row">
                    <Button key={uuid()} onClick={() => editCategory(category)} className="m-2">
                      Edit
                    </Button>
                    <Button
                      key={uuid()}
                      onClick={() => deleteCategory(category)}
                      className="bg-danger text-danger-text m-2"
                    >
                      Delete
                    </Button>
                  </td>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
