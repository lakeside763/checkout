import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { Product } from '../../hooks/useProduct';
import products from '../../products.json';

/**
 * Accept add process add review request on the server.
 * @param {*} req
 * @param {*} res
 * @return {product} accept add review request and return updated product details.
 */
export default async function productHandler(req: NextApiRequest, res: NextApiResponse<Product>) {
  if (req.method === 'POST') {
    const { id, averageRating, totalReviews, ratings, ...rest } = req.body;
    const product = products.find((product: { id: string; }) => product.id === id);
    if (product?.reviews) {
      const updatedProduct = {
        ...product,
        ratings,
        averageRating,
        totalReviews,
        reviews: [rest, ...product.reviews],
      };

      const updatedProducts = products.map((product: { id: string }) => (product.id === id ? updatedProduct : product));

      fs.writeFileSync(path.resolve('./products.json'), JSON.stringify(updatedProducts), 'utf-8');
      res.status(200).json(updatedProduct);
    }
  }
}

// eslint-disable-next-line require-jsdoc
export async function productHandlerTest(req: NextApiRequest, res: NextApiResponse<Product>) {
  if (req.method === 'POST') {
    const { id, averageRating, totalReviews, ratings, ...rest } = req.body;
    const product = products.find((product: { id: string }) => product.id === id);
    if (product?.reviews) {
      const updatedProduct = {
        ...product,
        ratings,
        averageRating,
        totalReviews,
        reviews: [rest, ...product.reviews],
      };

      const updatedProducts = products.map((product: { id: string }) => (product.id === id ? updatedProduct : product));

      fs.writeFileSync(path.resolve('./productsTest.json'), JSON.stringify(updatedProducts), 'utf-8');
      res.status(200).json(updatedProduct);
    }
  }
}
