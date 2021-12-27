/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Button, Heading, Text, useDisclosure, Modal } from '@chakra-ui/react';
import AddProductReview from './addProductReview';
import { AddReview } from '../../hooks/useProduct';

interface ProductReviewProps {
  addReview: (review: AddReview) => Promise<void>,
}

const ProductReviews = ({ addReview }: ProductReviewProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box borderWidth="1px" borderRadius="10" p="5">
        <Heading as="h4" fontSize="medium">
          Review this product
        </Heading>
        <Box textAlign="center" py="auto" mt={{ base: '8', md: '16' }}>
          <Text fontSize="large">Share your thoughts with other customers</Text>
          <Button mt="5" onClick={onOpen} borderWidth="2px">
            Write a customer review
          </Button>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <AddProductReview addReview={addReview} onClose={onClose} />
      </Modal>
    </>
  );
};

export default ProductReviews;
