import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "@/components/Layout";
import { EditIcon, TrashIcon } from "@/components/icons";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <Layout>
      <Link className="btn-primary" href={"/products/new-product"}>
        Add new product
      </Link>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Product name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>
                <Link
                  className="btn-basic"
                  href={"/products/edit/" + product._id}
                >
                  <EditIcon />
                  Edit
                </Link>
                <Link
                  className="btn-red"
                  href={"/products/delete/" + product._id}
                >
                  <TrashIcon />
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
