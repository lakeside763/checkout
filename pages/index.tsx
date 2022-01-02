import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Stack } from '@chakra-ui/react';
import AppNav from '../components/common/AppNav';
import ProductList from '../components/products/productList';
import AppFooter from '../components/common/AppFooter';
import { useProductList } from '../hooks/useProduct';

const Home: NextPage = () => {
  const { products } = useProductList();

  return (
    <Box>
      <Head>
        <title>Checkout.com</title>
        <meta name="description" content="No 1 online shopping store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack as="main" align="flex-start">
        <AppNav />
        <ProductList products={products} />
        <AppFooter />
      </Stack>
    </Box>
  );
};

export default Home;
