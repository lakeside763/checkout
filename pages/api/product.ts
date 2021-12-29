import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';


/**
 * Accept add process add review request on the server.
 * @param {*} req
 * @param {*} res
 * @return {product} accept add review request and return updated product details.
 */
async function productHandler(req: NextApiRequest, res: NextApiResponse<any>) {
  const prisma = new PrismaClient();
  if (req.method === 'POST') {
    const { id, averageRating, totalReviews, ...rest } = req.body;

    await prisma.products.update({
      where: { id },
      data: {
        averageRating,
        totalReviews,
      },
    });

    const addReview = await prisma.reviews.create({
      data: {
        id: `${id}_${totalReviews}`,
        ...rest,
        products: { connect: { id } },
      },
    });

    res.status(200).json(addReview);
  }
};

export default productHandler;

// eslint-disable-next-line require-jsdoc
// export async function productHandlerTest(req: NextApiRequest, res: NextApiResponse<Product>) {
//   if (req.method === 'POST') {
//     const { id, averageRating, totalReviews, ratings, ...rest } = req.body;
//     const product = products.find((product: { id: string }) => product.id === id);
//     if (product?.reviews) {
//       const updatedProduct = {
//         ...product,
//         ratings,
//         averageRating,
//         totalReviews,
//         reviews: [rest, ...product.reviews],
//       };

//       const updatedProducts = products.map((product: { id: string }) => (product.id === id ? updatedProduct : product));

//       fs.writeFileSync(path.resolve('./productsTest.json'), JSON.stringify(updatedProducts), 'utf-8');
//       res.status(200).json(updatedProduct);
//     }
//   }
// }
