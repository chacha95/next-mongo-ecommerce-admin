import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "@/components/layout";
import ProductForm from "@/components/products/product-form";

export default function EditProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(undefined);
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const response = await axios.get(`/api/products?id=${id}`);
        setProductInfo(response.data);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Layout>
      <h1>Edit product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}
