import React from 'react';
import Products from './../../components/products/Products';
import { cleanup, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import products from './../../products.json';
import { ProductContext } from './../../hooks/useProduct';
import ProductDetails from './../../components/products/productDetails';

describe('product.test', () => {
  afterEach(cleanup);
  test('should render products page', () => {
    const div = document.createElement('div');
    render(<Products />, div);
  });

  test('should render products on unchanged', () => {
    const tree = renderer.create(<Products />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render list of products', () => {
    const { getAllByTestId } = render(<Products />);
    const testProductListIds = getAllByTestId('product-title').map((product) => product.id);
    const productDataIds = products.map((product) => product.id);
    const [{ title }] = products.map((product) => ({ title: product.title }));
    expect(testProductListIds).toEqual(productDataIds);
    expect(screen.queryByText(title)).toBeInTheDocument();
    productDataIds.forEach((id) => {
      expect(testProductListIds.find((productId) => productId === id)).toBeTruthy();
    });
  });

  test('should test the product context', () => {
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
      reviews: [],
    };

    render(
        <ProductContext.Provider value={product}>
          <ProductDetails />
        </ProductContext.Provider>,
    );
    expect(screen.getByText('F8 Smart watch')).toBeInTheDocument();
  });
});
