/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Input,
  Textarea,
  FormLabel,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { useProduct } from '../../hooks/useProduct';

const AddProductReview = ({ addReview, onClose }) => {
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Product Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddProductReviewSummary />
          <AddProductReviewForm addReview={addReview} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </>
  );
};

export default AddProductReview;

const AddProductReviewSummary = () => {
  const { title, image, averageRating, totalReviews } = useProduct();
  return (
    <Flex>
      <Box width="100px">
        <Image src={image} alt={title} width="80px" height="80px" />
      </Box>
      <Box width="calc(100% - 120px)">
        <Heading fontSize="xl" fontWeight="bold" mt="5">
          {title}
        </Heading>
        <Flex mt="2">
          <Flex mr="3" mt="1">
            {Array(5)
                .fill('')
                .map((_, i) => (
                  <FiStar
                    fontSize="16"
                    key={i}
                    fill={i < Math.round(averageRating) ? '#f59e0c' : '#fff'}
                    color={i < Math.round(averageRating) ? '#f59e0c' : '#000'}
                  />
                ))}
          </Flex>
          <Text mr="3">
            {totalReviews} Review{`${totalReviews > 1 ? 's' : ''}`}
          </Text>
          <Text>1285 orders</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

const AddProductReviewForm = ({ addReview, onClose }) => {
  const { id } = useProduct();
  const defaultReview = {
    id,
    name: '',
    email: '',
    rating: 0,
    comment: '',
    slug: '',
  };

  const [review, setReview] = useState(defaultReview);

  const handleChange = useCallback(
      (e) => {
        setReview({ ...review, [e.target.name]: e.target.value });
      },
      [review],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!review.name || !review.email || !review.comment) return true;
    const slug = `${review.rating}_star${review.rating === 1 ? '' : 's'}`;
    addReview({ ...review, slug });
    setReview(review);
    setTimeout(() => onClose(), 500);
  };

  const handleRating = useCallback(
      (i) => {
        setReview({ ...review, rating: i + 1 });
      },
      [review],
  );

  return (
    <Box mt="10" p="2" mb="10" onSubmit={handleSubmit}>
      <Text fontSize="xl">Share your thoughts with other customers</Text>
      <Box as="form" mt="3">
        <Input placeholder="Enter Full names" mb="3" name="name" value={review.name} onChange={handleChange} />
        <Input placeholder="Enter Email" mb="3" name="email" value={review.email} onChange={handleChange} />
        <Flex mt="2">
          <FormLabel>Add Rating:</FormLabel>
          <Flex mr="3" mt="1">
            {Array(5)
                .fill('')
                .map((_, i) => (
                  <FiStar
                    fontSize="20"
                    cursor="pointer"
                    onMouseOver={() => handleRating(i)}
                    onClick={() => handleRating(i)}
                    key={i}
                    fill={i < review.rating ? '#f59e0c' : '#fff'}
                    color={i < review.rating ? '#f59e0c' : '#000'}
                  />
                ))}
          </Flex>
        </Flex>
        <Textarea placeholder="Enter Comments" mt="3" name="comment" value={review.comment} onChange={handleChange} />
        <Button type="submit" mt="5">
          Add Review
        </Button>
      </Box>
    </Box>
  );
};
