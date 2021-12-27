import { createServer } from 'http';
import { apiResolver } from 'next/dist/server/api-utils';
import request from 'supertest';
import { productHandlerTest } from './../../pages/api/product.ts';

const requestHandler = (req, res) => apiResolver(req, res, undefined, productHandlerTest);

let server;

const product = {
  id: 'price_abcd0001',
  averageRating: 4,
  totalReviews: 2,
  ratings: [
    {slug: '5_stars', count: 4, percentage: 80},
    {slug: '4_stars', count: 0, percentage: 0},
    {slug: '3_stars', count: 1, percentage: 20},
    {slug: '2_stars', count: 0, percentage: 0},
    {slug: '1_star', count: 0, percentage: 0},
  ],
  name: 'James Fletcher',
  email: 'frank@gmail.com',
  rating: 5,
  comment: 'Great product',
  slug: '5_stars',
  createdAt: 'December 27, 2021',
};

describe('product integration', () => {
  beforeEach(async () => {
    server = createServer(requestHandler);
  });

  afterEach(async () => {
    server.close();
  });
  test('should test product', async () => {
    const { statusCode, body } = await request(server)
        .post('/api/product')
        .set('Accept', 'application/json')
        .send(product)
        .expect(200);
    const { reviews: [{ name }] } = body;
    expect(statusCode).toBe(200);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('reviews');
    expect(name).toEqual(product.name);
  });
});
