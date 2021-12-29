import React from 'react';
import { Container, Box, Flex, Heading, SimpleGrid, Text, Button } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { FiStar } from 'react-icons/fi';
import { ProductsProps } from '../../hooks/useProduct';


const ProductList = ({ products }: ProductsProps) => {
  return (
    <Container maxW="container" px={{ base: '8', xl: '40' }}>
      <Box mt="20">
        <SimpleGrid columns={[1, null, 2, null, 4]} spacing={10}>
          {products.map(({ id, image, price, title, averageRating, totalReviews }) => (
            <Box key={id} w={{ base: '100%' }} borderWidth="1px" borderRadius="md" data-testid="product-title" id={id}>
              <Link href={`/${id}`}>
                <a>
                  <Image src={`${image}`} width="400px" height="400px" alt="Product image" />
                  <Box pt="2" px="6" pb="8">
                    <Heading fontSize="large" fontWeight="10px">
                      {title}
                    </Heading>
                    <Heading fontSize="large" mt="4">
                      ${price}
                    </Heading>
                    <Flex fontSize="12px" mt="1">
                      <Text>Sold by </Text>
                      <Text fontWeight="bold" color="#033574">
                        &nbsp;Checkout
                      </Text>
                    </Flex>
                    <Flex mt="3">
                      {Array(5)
                          .fill('')
                          .map((_, i) => (
                            <FiStar
                              fontSize="12"
                              key={i}
                              fill={i < Math.round(averageRating) ? '#f59e0c' : '#cfdde4'}
                              color={i < Math.round(averageRating) ? '#f59e0c' : '#cfdde4'}
                            />
                          ))}
                      <Text fontSize="12px" mt="-1" ml="1">
                        {totalReviews < 1 ? 'No review yet' : `${totalReviews} review${totalReviews > 1 ? 's' : ''}`}
                      </Text>
                    </Flex>
                    <Button mt="5" variant="primary">
                      Add to Cart
                    </Button>
                  </Box>
                </a>
              </Link>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default ProductList;
