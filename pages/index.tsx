import Head from 'next/head';
import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import AppNav from '../components/common/AppNav';
import ProductList from '../components/products/productList';
import AppFooter from '../components/common/AppFooter';
import { PrismaClient } from '@prisma/client';
import { ProductsProps } from '../hooks/useProduct';


const Home = ({ products }: ProductsProps) => {
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


export const getServerSideProps = async () => {
  const prisma = new PrismaClient();
  const products = await prisma.products.findMany({});
  return {
    props: {
      products,
    },
  };
};
