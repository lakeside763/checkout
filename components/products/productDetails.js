import React, {useContext} from 'react';
import {Box, Flex, Heading, Text, Button} from '@chakra-ui/react';
import Image from 'next/image';
import {useProduct} from '../../hooks/useProduct';

const ProductDetails = () => {
  const {title, image, description, price, productCode} = useProduct();
  return (
    <Flex justifyContent="flex-start" wrap={{base: 'wrap', md: 'nowrap'}}>
      <Box maxW="500px">
        <Image src={`${image}`} alt={title} width="500px" height="500px" />
      </Box>
      <Box p="20">
        <Box maxW="500px">
          <Heading as="h4" fontSize="3xl" fontWeight="1px">
            {title}
          </Heading>
          <Flex fontSize="12px" mt="3">
            <Text>Product Code </Text>
            <Text fontWeight="bold" color="#033574">
              &nbsp;{productCode}
            </Text>
          </Flex>
          <Text mt="10" fontSize="large" fontWeight="normal">
            {description}
          </Text>
          <Heading mt="5" fontSize="5xl">
            ${price.toFixed(2)}
          </Heading>
          <Button size="lg" mt="10" variant="primary">
            Add To Cart
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default ProductDetails;
