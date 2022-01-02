import { createContext, useContext, useEffect, useState } from 'react';
import Sugar from 'sugar-date';

export interface Review {
  name: string;
  email: string;
  rating: number;
  slug: string;
  comment: string;
  createdAt?: Date;
}

interface Rating {
  slug: string;
  count: number;
  percentage: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  productCode: string;
  reviews: Review[];
  ratings: Rating[];
  averageRating: number;
  totalReviews: number;
}

export interface AddReview extends Review {
  id?: string;
  averageRating?: number;
  totalReviews?: number;
}

export interface ProductProps {
  product: Product;
}

export interface ProductsProps {
  products: Product[];
}

// the list of stars and it default value used for ploting ratings graph
const defaultRatings = {
  '5_stars': 0,
  '4_stars': 0,
  '3_stars': 0,
  '2_stars': 0,
  '1_star': 0,
};

const defaultProduct = {
  id: '',
  title: '',
  description: '',
  image: '',
  price: 0,
  productCode: '',
  averageRating: 0,
  totalReviews: 6,
  reviews: [],
  ratings: [],
};

// function for calculating each rating percentage.
const ratingPercentage = (count: number, totalReviews: number) => parseInt(((count * 100) / totalReviews).toFixed(0));

// the function evaluate the ratings, total number of user reviews and average ratings.
export const calculateRatings = (product: Product) => {
  const totalReviews = product.reviews.length;
  let totalRatings = 0;

  const ratingCount = product.reviews.reduce<any>((total, { slug, rating }) => {
    totalRatings = totalRatings + rating;
    return { ...total, [slug]: total[slug] + 1 };
  }, defaultRatings);

  const ratings = [];
  for (const [key, value] of Object.entries(ratingCount)) {
    ratings.push({
      slug: key,
      count: value as number,
      percentage: totalReviews > 0 ? ratingPercentage(value as number, totalReviews) : 0,
    });
  }

  const averageRating = totalReviews > 0 ? totalRatings / totalReviews : 0;

  return {
    ratings,
    averageRating: parseFloat(averageRating.toFixed(1)),
    totalReviews,
  };
};

// the function send a server request for adding review to product reviews
export const addReviewRequest = async (data: AddReview) => {
  try {
    const addReview = await fetch('https://checkout-dev-api.herokuapp.com/product/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return addReview.json();
  } catch (error: any) {
    return error.message;
  }
};

/**
 * represent state for managing product props
 * @param {*} data
 * @return {product} product props generated from getStaticProps and getStaticPath by product Id.
 * @return {addReview} send add review request to the server.
 */
const useProductState = (data: Product) => {
  const [product, setProduct] = useState(data);

  useEffect(() => {
    const processProductReviews = () => {
      const { ratings, averageRating, totalReviews } = calculateRatings(product);

      setProduct({
        ...product,
        ratings,
        averageRating: parseFloat(averageRating.toFixed(1)),
        totalReviews,
      });
    };

    processProductReviews();
  }, []);


  // the function process and review request and update new values for the product
  const addReview = async ({ id, ...rest }: AddReview) => {
    rest.createdAt = Sugar.Date.medium(new Date());
    const { ratings, averageRating, totalReviews } = calculateRatings({
      ...product,
      reviews: [rest, ...product.reviews],
    });
    const addReview = await addReviewRequest({ ...rest, id, averageRating, totalReviews });
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

// ProductContext for product component
export const ProductContext = createContext<Product>(defaultProduct);
/**
 * Represent a product
 * @return {product} for ProductContext Provider.
 */
export function useProduct() {
  const product = useContext(ProductContext);
  return product;
}

// Fetch products from external api
export const getProducts = async () => {
  try {
    const products = await fetch('https://checkout-dev-api.herokuapp.com/product');
    return products.json();
  } catch (error: any) {
    return error.message;
  }
};

/**
 * Represet state management for the list of products
 * @return {products}
 */
export function useProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products as any);
    };

    fetchProducts();
  }, []);

  return {
    products,
    setProducts,
  };
}
