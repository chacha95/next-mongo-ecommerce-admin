import axios from 'axios';
import { useState, useEffect } from 'react';
import { withSwal } from 'react-sweetalert2';

import Layout from '@/components/layout';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { EditIcon } from '@/components/icons';

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState('');
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
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(',')
      }))
    );
  }

  function deleteCategory(category) {
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

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: '', values: '' }];
    });
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory ? `Edit category ${editedCategory.name}` : 'Create new category'}
      </label>

      <Label>New Category name</Label>
      <form onSubmit={saveCategory} className="flex w-full max-w-sm gap-1">
        <div className="flex gap-1">
          <input
            type="text"
            placeholder={'Category name'}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <Button type="submit">Save</Button>
      </form>

      <div className="w-full max-w-sm">
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent Category</td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td className="flex flex-row">
                    <button
                      onClick={() => editCategory(category)}
                      className="mr-4 flex items-center"
                    >
                      <div className="mr-1">
                        <EditIcon />
                      </div>
                      <div>Edit</div>
                    </button>
                    <button onClick={() => deleteCategory(category)} className="btn-red">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
