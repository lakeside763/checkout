import React from 'react';
import { cleanup, render } from '@testing-library/react';
import CustomerReviews from './../../components/products/customerReviews';
import { ProductContext, useProduct } from '../../hooks/useProduct';

const product = {
  id: 'price_abcd0007',
  title: 'F8 Smart watch',
  description: 'CUSTOMIZABLE Photo Display, Bluetooth Smart Watch V8 With Camera Smar Twatch',
  image: '/images/smart-watch.jpg',
  price: 50.0,
  productCode: 'MI12345',
  brand: 'Xiaomi',
  averageRating: 0,
  totalReviews: 0,
  reviews: [
    {
      name: 'Olalekan Idowu',
      email: 'mosesidowu24@yahoo.com',
      rating: 3,
      comment: 'Very gumming and attractive sticker',
      slug: '3_stars',
      createdAt: 'December 25, 2021',
    },
    {
      name: 'Easyflex Technology',
      email: 'mosesidowu24@yahoo.com',
      rating: 2,
      comment: 'Great Product',
      slug: '2_stars',
      createdAt: 'December 25, 2021',
    },
  ],
};

describe('customer reviews component', () => {
  afterEach(cleanup);
  test('should check customer reviews heading exists in the component', () => {
    const { getByText } = render(
        <ProductContext.Provider value={product}>
          <CustomerReviews />
        </ProductContext.Provider>,
    );
    expect(getByText('Customer Reviews')).toBeInTheDocument();
  });

  test('should render customer reviews component', () => {
    const TestCustomerReviews = () => {
      const { reviews } = useProduct();

      return (
        <>
          <h1>Customer Reviews</h1>
          {reviews.length ? (
            reviews.map(({ slug, comment, name }) => (
              <div key={`${slug}-${Date.now()}`} id={`${slug}-${name}`} data-testid="reviews">
                <div>{name}</div>
                <div>{comment}</div>
              </div>
            ))
          ) : (
            <div>No comment yet</div>
          )}
        </>
      );
    };
    const { getByText, getAllByTestId } = render(
        <ProductContext.Provider value={product}>
          <TestCustomerReviews />
        </ProductContext.Provider>,
    );
    getAllByTestId('reviews').map((review) => review.slug);
    expect(getByText('Customer Reviews')).toBeInTheDocument();
  });
});
