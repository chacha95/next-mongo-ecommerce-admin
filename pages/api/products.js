import { Product } from "@/models/product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();
  if (method === "POST") {
    try {
      const { title, description, price } = req.body;
      const productDoc = await Product.create({
        title,
        description,
        price,
      });
      res.json(productDoc);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (method === "GET") {
    try {
      if (req.query?.id) {
        res.json(await Product.findOne({ _id: req.query.id }));
      } else {
        res.json(await Product.find());
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (method === "PUT") {
    try {
      const { title, description, price, _id } = req.body;

      await Product.updateOne({ _id: _id }, { title, description, price });
      res.json(true);
    } catch (error) {
      console.error("Error update product", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (method === "DELETE") {
    try {
      const id = req.query?.id;
      if (id) {
        await Product.deleteOne({ _id: id });
        res.json;
      }
      res.json(true);
    } catch (error) {
      console.error("Error delete product", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
