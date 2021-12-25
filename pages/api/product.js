import fs, {writeFileSync} from 'fs';
import path from 'path';
import products from '../../products';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {id, averageRating, totalReviews, ...rest} = req.body;
    const product = products.find((product) => product.id === id);
    const updatedProduct = {
      ...product,
      averageRating,
      totalReviews,
      reviews: [rest, ...product.reviews],
    };
    const updatedProducts = products.map((product) => (product.id === id ? updatedProduct : product));

    fs.writeFileSync(path.resolve('./products.json'), JSON.stringify(updatedProducts), 'utf-8');
    res.status(200).json(updatedProduct);
  }

  if (req.method === 'GET') {
    const product = [{id: '12345'}];

    fs.writeFileSync(path.resolve('./example.json'), JSON.stringify(product), 'utf-8');
    return res.status(200).json({});
  }
}
