import Link from "next/link";

import Layout from "@/components/Layout";

export default function Products() {
  return (
    <Layout>
      <Link href="/products/new-product">
        <button className="btn-primary">Add new product</button>
      </Link>
    </Layout>
  );
}
