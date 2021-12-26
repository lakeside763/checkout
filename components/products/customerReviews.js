import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { FiMessageSquare, FiStar } from 'react-icons/fi';
import { useProduct } from '../../hooks/useProduct';

const CustomerReviews = () => {
  const { reviews } = useProduct();

  return (
    <Box borderWidth="1px" borderRadius="10" mt="5" p="5">
      <Heading as="h4" fontSize="medium">
        Customer Reviews
      </Heading>
      {reviews.length ? (
        reviews.map(({ name, slug, comment, createdAt, rating }) => (
          <Flex key={slug} mt="6" wrap={{ base: 'wrap', md: 'nowrap' }} mb="10">
            <Flex>
              <Text w="100px" max="auto" width="16" height="16" fontSize="4xl" rounded="full" bg="#f2f2" align="center">
                O
              </Text>
              <Box ml="5" mt="3">
                <Heading fontSize="medium" mb="1" fontWeight="bold">
                  {name}
                </Heading>
                <Text>{createdAt}</Text>
              </Box>
            </Flex>

            <Box ml="20" mt="3">
              <Flex>
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <FiStar fontSize="16" key={i} fill={i < rating ? '#f59e0c' : '#fff'} color={i < rating ? '#f59e0c' : '#000'} />
                  ))}
              </Flex>
              <Text mt="2">{comment}.</Text>
            </Box>
          </Flex>
        ))
      ) : (
        <Box p="10">
          <Flex justifyContent="center">
            <Box mt="1" mr="3" fontSize="2xl">
              <FiMessageSquare />
            </Box>
            <Text fontSize="large"> No product review yet. Be the first to review this product.</Text>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default CustomerReviews;
