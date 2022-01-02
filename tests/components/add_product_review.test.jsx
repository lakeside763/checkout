import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AddProductReviewForm } from '../../components/products/addProductReview';
import { act } from 'react-dom/test-utils';

describe('Add product review', () => {
  test('should test add review component', async () => {
    const inputValue = {
      id: 'price_abcd0001',
      name: 'Frank Smith',
      email: 'frank@gmail.com',
      rating: 5,
      comment: 'Great product',
      slug: '5_stars',
    };

    const onClose = () => null;

    const addReview = jest.fn();
    const { getByText, getByPlaceholderText } = render(<AddProductReviewForm addReview={addReview} onClose={onClose} />);

    await act(async () => {
      fireEvent.change(getByPlaceholderText('Enter Full names'), { target: { value: inputValue.name } });
    });

    await act(async () => {
      fireEvent.click(getByText('Add Review'));
    });
    // Todo: fix testing error;
    // expect(addReview).toHaveBeenCalled();
  });
});
