import type {NextPage} from 'next';
import Head from 'next/head';
import React from 'react';
import {Box, Stack} from '@chakra-ui/react';
import AppNav from '../components/common/AppNav';
import Products from '../components/products/products';
import AppFooter from '../components/common/AppFooter';

const Home: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>Checkout.com</title>
        <meta name="description" content="No 1 online shopping store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack as="main" align="flex-start">
        <AppNav />
        <Products />
        <AppFooter />
      </Stack>
    </Box>
  );
};

export default Home;
