const { getProducts, addReviewRequest } = require('./../../hooks/useProduct');
const products = require('./../../defaultProducts.json');

const getProductsMock = jest.fn(async () => {
  const response = products.map((product) => product);
  return Promise.resolve(response);
});

const addReviewRequestMock = jest.fn(async () => {
  const response = {
    id: 'price_abcd0001_1',
    name: 'Frank Smith',
    email: 'frank@gmail.com',
    rating: 5,
    comment: 'Great product',
    slug: '5_stars',
    createdAt: 'December 27, 2021',
    productId: null,
  };
  return Promise.resolve(response);
});

describe('product integration testing', () => {
  test('should fetch list of product', async () => {
    const products = await getProductsMock(getProducts);
    expect(products).toHaveLength(8);
    expect(products[0]).toHaveProperty('id');
    expect(products).toHaveProperty('0.title', 'Space Jelly Tshirt');
  });

  test('should add new review to the product reviews', async () => {
    const addReview = await addReviewRequestMock(addReviewRequest);
    expect(addReview).toHaveProperty('name');
    expect(addReview).toHaveProperty('rating');
  });
});
