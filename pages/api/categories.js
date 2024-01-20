import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/category';
import { Product } from '@/models/product';

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    res.json(await Category.find());
  }

  if (method === 'POST') {
    const { name, parentCategory } = req.body;
    const categoryDoc = await Category.create({
      name: name
    });

    res.json(categoryDoc);
  }

  if (method === 'PUT') {
    const { name, _id } = req.body;
    const categoryDoc = await Category.updateOne(
      { _id: _id },
      {
        name
      }
    );
    res.json(categoryDoc);
  }

  if (method === 'DELETE') {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json('ok');
  }
}
