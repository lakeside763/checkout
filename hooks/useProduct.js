import {createContext, useContext, useEffect, useState} from 'react';
import Sugar from 'sugar-date';

const defaultRatings = {
  '5_stars': 0,
  '4_stars': 0,
  '3_stars': 0,
  '2_stars': 0,
  '1_star': 0,
};

/**
 * ProductContext for product component
 */
export const ProductContext = createContext();


/**
 * repsent state for managing product props
 * @param {*} data
 * @return {product} product props generated from getStaticProps and getStaticPath by product Id
 * @return {addReview}
 */
const useProductState = (data) => {
  const [product, setProduct] = useState(data);

  const ratingPercentage = (count, totalReviews) => parseInt(((count * 100) / totalReviews).toFixed(0));

  useEffect(() => {
    const processProductReviews = () => {
      const {ratings, averageRating, totalReviews} = calculateRatings(product);

      setProduct({
        ...product,
        ratings,
        averageRating: parseFloat(averageRating.toFixed(1)),
        totalReviews,
      });
    };

    processProductReviews();
  }, []);

  const calculateRatings = (product) => {
    const totalReviews = product.reviews.length;
    let totalRatings = 0;

    const ratingCount = product.reviews.reduce((total, {slug, rating}) => {
      totalRatings = totalRatings + rating;
      return {...total, [slug]: total[slug] + 1};
    }, defaultRatings);

    const ratings = [];
    for (const [key, value] of Object.entries(ratingCount)) {
      ratings.push({
        slug: key,
        count: value,
        percentage: totalReviews > 0 ? ratingPercentage(value, totalReviews) : 0,
      });
    }

    const averageRating = totalReviews > 0 ? totalRatings / totalReviews : 0;

    return {
      ratings,
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalReviews,
    };
  };

  const addReviewRequest = async (data) => {
    try {
      const addReview = await fetch('http://localhost:3000/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return addReview.json();
    } catch (error) {
      return error.message;
    }
  };

  const addReview = async ({id, ...rest}) => {
    rest.createdAt = Sugar.Date.medium(new Date());
    const {ratings, averageRating, totalReviews} = calculateRatings({
      ...product,
      reviews: [rest, ...product.reviews],
    });
    const addReview = await addReviewRequest({
      ...rest,
      id,
      averageRating,
      totalReviews,
    });
    if (addReview) {
      setProduct({
        ...product,
        reviews: [rest, ...product.reviews],
        ratings,
        averageRating,
        totalReviews,
      });
    }
  };

  return {
    product,
    addReview,
  };
};

export default useProductState;

/**
 * Represent a product
 * @return {product} for ProductContext Provider.
 */
export function useProduct() {
  const product = useContext(ProductContext);
  return product;
}
