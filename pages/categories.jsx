import axios from 'axios';
import { useState, useEffect } from 'react';
import { withSwal } from 'react-sweetalert2';

import Layout from '@/components/layout';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { EditIcon } from '@/components/icons';

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState(undefined);
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

    console.log(editedCategory);

    if (editedCategory) {
      await axios.put('/api/categories', data);
      setEditedCategory(undefined);
    } else {
      await axios.post('/api/categories', data);
      setName(undefined);
    }
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

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : 'Create new category'}
      </label>

      <Label>New Category name</Label>
      <form
        onSubmit={saveCategory}
        className="flex w-full max-w-sm flex-col gap-1"
      >
        <div className="flex gap-1">
          <input
            type="text"
            placeholder={'Category name'}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div key={property.name} className="mb-2 flex gap-1">
                <input
                  type="text"
                  value={property.name}
                  className="mb-0"
                  onChange={(ev) =>
                    handlePropertyNameChange(index, property, ev.target.value)
                  }
                  placeholder="property name (example: color)"
                />
                <input
                  type="text"
                  className="mb-0"
                  onChange={(ev) =>
                    handlePropertyValuesChange(index, property, ev.target.value)
                  }
                  value={property.values}
                  placeholder="values, comma separated"
                />
                <button
                  onClick={() => removeProperty(index)}
                  type="button"
                  className="btn-red"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <Button onClick={addProperty}>Add new Property</Button>
        <Button type="submit">Save</Button>
      </form>

      <div className="w-full max-w-sm">
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Category name</td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
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
                    <button
                      onClick={() => deleteCategory(category)}
                      className="btn-red"
                    >
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
