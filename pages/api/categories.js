import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/category';
import { Product } from '@/models/product';

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    res.json(await Category.find().populate('parent'));
  }

  if (method === 'POST') {
    const { name } = req.body;
    const categoryDoc = await Category.create({
      name
    });
    res.json(categoryDoc);
  }

  if (method === 'PUT') {
    const { title, description, price, images, category, _id } = req.body;
    await Product.updateOne({ _id: _id }, { title, description, price, images, category });
    res.json(true);
  }

  if (method === 'DELETE') {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json('ok');
  }
}
