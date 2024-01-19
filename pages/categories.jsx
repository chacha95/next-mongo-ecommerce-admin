import axios from "axios";
import { useState } from "react";

import Layout from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Categories() {
  const [name, setName] = useState("");

  async function saveCategory(e) {
    e.preventDefault();

    const data = {
      name,
    };

    await axios.post("/api/categories", data);
    setName("");
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
    </Layout>
  );
}
