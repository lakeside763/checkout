import React from 'react';
import { Container, Box, SimpleGrid } from '@chakra-ui/react';
import AppNav from '../components/common/AppNav';
import ProductDetails from '../components/products/productDetails';
import ProductRatings from '../components/products/productRatings';
import CustomerReviews from '../components/products/customerReviews';
import ProductReviews from '../components/products/productReviews';
import useProductState, { getProducts, ProductContext, ProductProps } from '../hooks/useProduct';
import AppFooter from '../components/common/AppFooter';

const ProductId = ({ product: data }: ProductProps) => {
  const { product, addReview } = useProductState(data);

  return (
    <Box>
      <AppNav />
      <Container maxW="container" px={{ base: '8', xl: '40' }} pt="14">
        <ProductContext.Provider value={product}>
          <ProductDetails />

          <SimpleGrid columns={[1, null, null, null, 2]} spacing="5">
            <ProductRatings />
            <ProductReviews addReview={addReview} />
          </SimpleGrid>

          <CustomerReviews />
        </ProductContext.Provider>
      </Container>
      <AppFooter />
    </Box>
  );
};

export default ProductId;

export const getStaticProps = async ({ params }: any) => {
  const products = await getProducts();
  const product = products.find(({ id }: any) => id === params.productId);
  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths = async () => {
  const products = await getProducts();
  const paths = products.map((product: any) => {
    return {
      params: {
        productId: product.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
