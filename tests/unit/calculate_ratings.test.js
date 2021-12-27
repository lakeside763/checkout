import { calculateRatings } from './../../hooks/useProduct';

const product = {
  id: 'price_abcd0001',
  title: 'Space Jelly Tshirt',
  description: 'Bring Cosmo the space Jellyfish to your wardrobe with this high quality tshirt.',
  image: '/images/spacejelly-tshirt.jpg',
  price: 20,
  productCode: 'SP12345',
  averageRating: 4,
  totalReviews: 2,
  reviews: [
    {
      name: 'Frank Smith',
      email: 'frank@gmail.com',
      rating: 5,
      comment: 'Great product',
      slug: '5_stars',
      createdAt: 'December 27, 2021',
    },
    {
      name: 'Moses Idowu',
      email: 'mosesidowu24@yahoo.com',
      rating: 3,
      comment: 'I like the product',
      slug: '3_stars',
      createdAt: 'December 27, 2021',
    },
  ],
};

describe('unit testing product reviews', () => {
  test('should calculate product reviews ratings', () => {
    const { averageRating, ratings, totalReviews } = calculateRatings(product);
    const [{ slug, count, percentage }] = ratings;
    expect(averageRating).toEqual(4.0);
    expect(totalReviews).toEqual(2);
    expect(ratings.length).toEqual(5);
    expect(slug).toEqual('5_stars');
    expect(count).toEqual(1);
    expect(percentage).toEqual(50);
  });
});
