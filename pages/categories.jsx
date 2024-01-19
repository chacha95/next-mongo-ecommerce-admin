import Layout from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Categories() {
  return (
    <Layout>
      <h1>Categories</h1>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
    </Layout>
  );
}
