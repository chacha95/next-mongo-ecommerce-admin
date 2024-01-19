import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/products?id=' + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);
  function goBack() {
    router.push('/products');
  }

  async function deleteProduct() {
    await axios.delete('/api/products?id=' + id);

    goBack();
  }

  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete &nbsp;&quot;{productInfo?.title}&quot;?
      </h1>
      <div className="flex justify-center gap-2">
        <Button onClick={deleteProduct} className="btn-red">
          Yes
        </Button>
        <Button className="bg-secondary text-black" onClick={goBack}>
          NO
        </Button>
      </div>
    </Layout>
  );
}
